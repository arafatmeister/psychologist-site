export const COOKIE_CONSENT_KEY = 'cookie_consent_v1';

export function getConsent() {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.analytics !== 'boolean') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(consent) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent('consent:changed', { detail: consent }));
}

export function hasAnalyticsConsent() {
  return Boolean(getConsent()?.analytics);
}
