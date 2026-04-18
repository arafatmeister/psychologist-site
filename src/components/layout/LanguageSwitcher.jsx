import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE } from '../../config/site';
import { classNames } from '../../lib/classNames';

export function LanguageSwitcher({ compact = false }) {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || SITE.defaultLocale;
  }, [i18n.resolvedLanguage]);

  function switchTo(language) {
    i18n.changeLanguage(language);
  }

  return (
    <div
      className={classNames(
        'inline-flex rounded-lg border border-zinc-300 bg-white p-1',
        compact && 'text-xs',
      )}
    >
      {SITE.supportedLocales.map((language) => {
        const isActive = i18n.resolvedLanguage === language;
        return (
          <button
            key={language}
            type="button"
            className={classNames(
              'cursor-pointer rounded-md px-2.5 py-1.5 font-medium uppercase motion-safe:transition-colors',
              isActive ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100',
            )}
            aria-label={t('a11y.switchLanguage')}
            aria-pressed={isActive}
            onClick={() => switchTo(language)}
          >
            {language}
          </button>
        );
      })}
    </div>
  );
}
