import { Resend } from 'resend';
import { z } from 'zod';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TELEGRAM_PATTERN = /^@?[a-zA-Z0-9_]{5,32}$/;

const payloadSchema = z.object({
  name: z.string().trim().min(2).max(60),
  contact: z
    .string()
    .trim()
    .refine((value) => z.string().email().safeParse(value).success || TELEGRAM_PATTERN.test(value)),
  message: z.string().trim().min(10).max(2000),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(''),
  cf_token: z.string().min(1),
  _csrf: z.string().min(1),
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('[contact] TURNSTILE_SECRET_KEY missing');
    return false;
  }

  const body = new URLSearchParams();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body });
    const data = await res.json();
    return Boolean(data?.success);
  } catch (error) {
    console.error('[contact] turnstile verify failed', error);
    return false;
  }
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.CONTACT_FROM_EMAIL;
  const toAddress = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromAddress || !toAddress) {
    console.error('[contact] env misconfigured', {
      hasApiKey: Boolean(apiKey),
      hasFrom: Boolean(fromAddress),
      hasTo: Boolean(toAddress),
    });
    return res.status(500).json({ ok: false, error: 'misconfigured' });
  }

  let payload;
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ ok: false, error: 'invalid_json' });
  }

  if (payload?.website && String(payload.website).trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  const parsed = payloadSchema.safeParse(payload);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'invalid_payload' });
  }

  const ip = getClientIp(req);
  const turnstileOk = await verifyTurnstile(parsed.data.cf_token, ip);
  if (!turnstileOk) {
    return res.status(403).json({ ok: false, error: 'turnstile_failed' });
  }

  const { name, contact, message } = parsed.data;
  const isEmail = z.string().email().safeParse(contact).success;
  const subject = `Нова заявка з сайту: ${name}`;

  const html = `
    <h2 style="margin:0 0 16px;font-family:system-ui,sans-serif;">Нова заявка з divineweed.club</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;border-collapse:collapse;">
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Ім'я</td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Контакт</td><td>${escapeHtml(contact)}</td></tr>
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;margin:16px 0 0;white-space:pre-wrap;">${escapeHtml(
      message,
    )}</p>
  `;

  const text = `Нова заявка з divineweed.club\n\nІм'я: ${name}\nКонтакт: ${contact}\n\n${message}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: isEmail ? contact : undefined,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('[contact] resend error', error);
      return res.status(502).json({ ok: false, error: 'send_failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[contact] handler error', error);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
}
