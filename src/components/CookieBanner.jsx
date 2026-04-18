import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getConsent, saveConsent } from '../lib/consent';

export function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(() => !getConsent());

  if (!visible) return null;

  function acceptNecessary() {
    saveConsent({ necessary: true, analytics: false, updatedAt: new Date().toISOString() });
    setVisible(false);
  }

  function acceptAll() {
    saveConsent({ necessary: true, analytics: true, updatedAt: new Date().toISOString() });
    setVisible(false);
  }

  return (
    <section
      aria-label={t('cookies.ariaLabel')}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-200 bg-paper-2 p-4"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-2 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[70ch] text-sm text-ink-700">{t('cookies.message')}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="min-h-11 rounded-full border border-ink-300 px-4 text-sm text-ink-900 hover:border-ink-900"
            onClick={acceptNecessary}
          >
            {t('cookies.necessary')}
          </button>
          <button
            type="button"
            className="min-h-11 rounded-full bg-ink-900 px-4 text-sm text-paper hover:bg-ink-700"
            onClick={acceptAll}
          >
            {t('cookies.all')}
          </button>
        </div>
      </div>
    </section>
  );
}
