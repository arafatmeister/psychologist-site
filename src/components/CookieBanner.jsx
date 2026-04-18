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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-300 bg-white p-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-zinc-700">{t('cookies.message')}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2 text-sm"
            onClick={acceptNecessary}
          >
            {t('cookies.necessary')}
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white"
            onClick={acceptAll}
          >
            {t('cookies.all')}
          </button>
        </div>
      </div>
    </section>
  );
}
