import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { logger } from '../../lib/logger';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { getCsrfToken } from './csrf';
import { createContactSchema } from './schema';
import { submitContact } from './submit';

const LAST_SUBMIT_KEY = 'last_submit_at';
const SUBMIT_HISTORY_KEY = 'submit_count';
const THIRTY_SECONDS_MS = 30_000;
const ONE_HOUR_MS = 3_600_000;
const MAX_SUBMITS_PER_HOUR = 5;
const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';

function isTurnstileBypassed() {
  if (import.meta.env.VITE_TURNSTILE_BYPASS === 'true') return true;
  if (typeof window === 'undefined') return false;

  return new URLSearchParams(window.location.search).get('e2e') === '1';
}

function parseSubmitHistory() {
  if (typeof window === 'undefined') return [];

  const raw = window.sessionStorage.getItem(SUBMIT_HISTORY_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item === 'number');
  } catch {
    return [];
  }
}

function persistSubmitHistory(history) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(SUBMIT_HISTORY_KEY, JSON.stringify(history));
}

function isRateLimited() {
  if (typeof window === 'undefined') return false;

  const now = Date.now();
  const lastSubmitAt = Number(window.sessionStorage.getItem(LAST_SUBMIT_KEY) || 0);
  if (now - lastSubmitAt < THIRTY_SECONDS_MS) {
    return true;
  }

  const recent = parseSubmitHistory().filter((ts) => now - ts <= ONE_HOUR_MS);
  persistSubmitHistory(recent);
  return recent.length >= MAX_SUBMITS_PER_HOUR;
}

function registerSuccessfulSubmit() {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  const history = parseSubmitHistory().filter((ts) => now - ts <= ONE_HOUR_MS);
  history.push(now);

  window.sessionStorage.setItem(LAST_SUBMIT_KEY, String(now));
  persistSubmitHistory(history);
}

export function ContactForm() {
  const { t } = useTranslation();
  const turnstileBypass = useMemo(() => isTurnstileBypassed(), []);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [turnstileToken, setTurnstileToken] = useState(turnstileBypass ? 'bypass-token' : '');
  const schema = useMemo(() => createContactSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      contact: '',
      message: '',
      consent: false,
      website: '',
      _csrf: getCsrfToken(),
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ type: null, message: '' });

    if (isRateLimited()) {
      setStatus({ type: 'error', message: t('form.errors.rateLimited') });
      return;
    }

    if (values.website?.trim()) {
      setStatus({ type: 'error', message: t('form.errors.honeypot') });
      return;
    }

    if (!turnstileToken) {
      setStatus({ type: 'error', message: t('form.errors.turnstileRequired') });
      return;
    }

    const payload = {
      ...values,
      honeypot: values.website,
      cf_token: turnstileToken,
      submitted_at: new Date().toISOString(),
    };

    try {
      const response = await submitContact(payload);
      if (!response?.ok) {
        throw new Error('submit_failed');
      }

      registerSuccessfulSubmit();
      reset({
        name: '',
        contact: '',
        message: '',
        consent: false,
        website: '',
        _csrf: getCsrfToken(),
      });
      setTurnstileToken(turnstileBypass ? 'bypass-token' : '');
      setStatus({ type: 'success', message: t('form.status.success') });
    } catch (error) {
      logger.error('[contact] submit failed', error);
      setError('root.submit', { message: t('form.status.error') });
      setStatus({ type: 'error', message: t('form.status.error') });
    }
  });

  return (
    <form
      className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-6"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-zinc-800">
          {t('form.name')}
        </label>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-sm text-red-700">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact" className="text-sm font-medium text-zinc-800">
          {t('form.contact')}
        </label>
        <Input
          id="contact"
          autoComplete="email"
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={errors.contact ? 'contact-error' : undefined}
          {...register('contact')}
        />
        {errors.contact && (
          <p id="contact-error" role="alert" className="text-sm text-red-700">
            {errors.contact.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium text-zinc-800">
          {t('form.message')}
        </label>
        <Textarea
          id="message"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-sm text-red-700">
            {errors.message.message}
          </p>
        )}
      </div>

      <input
        type="text"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        style={{ display: 'none' }}
        {...register('website')}
      />

      <input type="hidden" {...register('_csrf')} />

      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
          {...register('consent')}
        />
        <label htmlFor="consent" className="text-sm text-zinc-700">
          {t('form.consent')}{' '}
          <Link className="underline" to={ROUTES.privacy}>
            {t('form.privacyLink')}
          </Link>
        </label>
      </div>
      {errors.consent && (
        <p id="consent-error" role="alert" className="text-sm text-red-700">
          {errors.consent.message}
        </p>
      )}

      {!turnstileBypass && (
        <Turnstile
          siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || TURNSTILE_TEST_SITE_KEY}
          options={{ theme: 'light', size: 'normal' }}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => {
            logger.warn('[contact] turnstile error');
            setTurnstileToken('');
          }}
          onExpire={() => setTurnstileToken('')}
        />
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t('form.status.pending') : t('form.submit')}
      </Button>

      {status.message && (
        <p
          role={status.type === 'error' ? 'alert' : 'status'}
          className={status.type === 'error' ? 'text-sm text-red-700' : 'text-sm text-emerald-700'}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
