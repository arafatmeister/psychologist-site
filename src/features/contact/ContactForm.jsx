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
import { Eyebrow } from '../../components/ui/Eyebrow';
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

function getTurnstileSiteKey() {
  const configured = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  if (configured) {
    return configured;
  }
  if (import.meta.env.PROD) {
    logger.error(
      '[contact] VITE_TURNSTILE_SITE_KEY is missing at build time — falling back to Cloudflare test key. Rebuild with the env variable present.',
    );
  }
  return TURNSTILE_TEST_SITE_KEY;
}

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
  const [submitted, setSubmitted] = useState(false);
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
      setSubmitted(true);
    } catch (error) {
      logger.error('[contact] submit failed', error);
      setError('root.submit', { message: t('form.status.error') });
      setStatus({ type: 'error', message: t('form.status.error') });
    }
  });

  return (
    <section id="contact" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-[640px] px-6 md:px-10">
        <Eyebrow>{t('form.eyebrow')}</Eyebrow>
        <h2 className="mt-4 text-[1.75rem] leading-[1.15] md:text-3xl md:leading-[1.1] lg:text-4xl lg:leading-[1.05]">
          {t('form.title')}
        </h2>
        <p className="italic-display mt-4 text-xl leading-relaxed text-ink-700">
          {t('form.subtitle')}
        </p>

        {submitted ? (
          <div role="status" className="py-16 text-center">
            <p className="italic-display text-3xl leading-[1.3] text-ink-800">
              {t('form.successTitle')}
            </p>
            <p className="mt-4 text-ink-500">{t('form.successHint')}</p>
          </div>
        ) : (
          <form className="mt-12 space-y-8" onSubmit={onSubmit} noValidate>
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink-700">
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
                <p id="name-error" role="alert" className="mt-1.5 text-sm text-danger">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-input"
                className="mb-1 block text-sm font-medium text-ink-700"
              >
                {t('form.contact')}
              </label>
              <Input
                id="contact-input"
                autoComplete="email"
                aria-invalid={Boolean(errors.contact)}
                aria-describedby={errors.contact ? 'contact-error' : 'contact-help'}
                {...register('contact')}
              />
              <p id="contact-help" className="mt-1.5 text-xs italic text-ink-500">
                {t('form.contactHelp')}
              </p>
              {errors.contact && (
                <p id="contact-error" role="alert" className="mt-1.5 text-sm text-danger">
                  {errors.contact.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink-700">
                {t('form.message')}
              </label>
              <Textarea
                id="message"
                rows={5}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                {...register('message')}
              />
              {errors.message && (
                <p id="message-error" role="alert" className="mt-1.5 text-sm text-danger">
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

            <div>
              <label htmlFor="consent" className="flex items-start gap-3 text-sm text-ink-700">
                <Checkbox
                  id="consent"
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                  {...register('consent')}
                />
                <span>
                  {t('form.consentBefore')}
                  <Link
                    to={ROUTES.privacy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-ink-400 underline-offset-2 hover:decoration-ink-900"
                  >
                    {t('form.consentLink')}
                  </Link>
                  {t('form.consentAfter')}
                </span>
              </label>
              {errors.consent && (
                <p id="consent-error" role="alert" className="mt-1.5 text-sm text-danger">
                  {errors.consent.message}
                </p>
              )}
            </div>

            {!turnstileBypass && (
              <div className="max-h-[72px] opacity-80">
                <Turnstile
                  siteKey={getTurnstileSiteKey()}
                  options={{ theme: 'light', size: 'compact' }}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => {
                    logger.warn('[contact] turnstile error');
                    setTurnstileToken('');
                  }}
                  onExpire={() => setTurnstileToken('')}
                />
              </div>
            )}

            {status.type === 'error' && status.message && (
              <p role="alert" className="text-sm text-danger">
                {status.message}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('form.status.pending') : t('form.submit')}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
