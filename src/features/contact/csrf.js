const CSRF_STORAGE_KEY = 'csrf_token';

export function generateCsrfToken() {
  if (typeof window === 'undefined') return '';

  const existing = window.sessionStorage.getItem(CSRF_STORAGE_KEY);
  if (existing) return existing;

  const token =
    window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.sessionStorage.setItem(CSRF_STORAGE_KEY, token);
  return token;
}

export function getCsrfToken() {
  if (typeof window === 'undefined') return '';

  const existing = window.sessionStorage.getItem(CSRF_STORAGE_KEY);
  if (existing) return existing;

  return generateCsrfToken();
}
