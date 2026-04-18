import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE } from '../../config/site';
import { classNames } from '../../lib/classNames';

export function LanguageSwitcher({ variant = 'light', className }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || SITE.defaultLocale;
  }, [i18n.resolvedLanguage]);

  const currentLang = i18n.resolvedLanguage || SITE.defaultLocale;
  const isDark = variant === 'dark';

  function switchTo(language) {
    i18n.changeLanguage(language);
  }

  return (
    <div className={classNames('inline-flex items-center gap-2 text-sm', className)} role="group">
      {SITE.supportedLocales.map((language, index) => {
        const isActive = currentLang === language;
        const label = language === 'en' ? 'English' : 'Українська';
        return (
          <span key={language} className="inline-flex items-center gap-2">
            <button
              type="button"
              className={classNames(
                'cursor-pointer uppercase',
                isActive
                  ? isDark
                    ? 'font-medium text-paper'
                    : 'font-medium text-ink-900'
                  : isDark
                    ? 'text-ink-300 hover:text-paper'
                    : 'text-ink-500 hover:text-ink-700',
              )}
              aria-pressed={isActive}
              aria-label={isActive ? undefined : `Switch to ${label}`}
              onClick={() => switchTo(language)}
            >
              {language}
            </button>
            {index < SITE.supportedLocales.length - 1 && (
              <span aria-hidden="true" className={isDark ? 'text-ink-500' : 'text-ink-300'}>
                /
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
