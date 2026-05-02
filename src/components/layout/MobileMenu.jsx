import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../config/routes';
import { SITE } from '../../config/site';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';

function getFocusable(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function MobileMenu({ isOpen, onClose, triggerRef }) {
  const panelRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen || !panelRef.current) return undefined;

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const focusable = getFocusable(panel);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && first && last) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
          return;
        }

        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    panel.addEventListener('keydown', onKeyDown);
    return () => {
      panel.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-ink-900/20 [animation:mobile-overlay-in_300ms_var(--ease-out)]"
        aria-label={t('a11y.closeMenu')}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        id="mobile-nav"
        className="relative h-full overflow-auto bg-paper px-6 pb-8 pt-5 [animation:mobile-panel-in_300ms_var(--ease-out)]"
      >
        <div className="mx-auto flex h-full w-full max-w-[1180px] flex-col">
          <div className="mb-10 flex items-center justify-between">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={onClose}
              aria-label={t('a11y.closeMenu')}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink-900"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            </button>
          </div>

          <nav aria-label={t('a11y.mobileNav')} className="grid gap-4">
            <a
              className="font-serif text-3xl leading-tight text-ink-900"
              href="/#services"
              onClick={onClose}
            >
              {t('header.nav.services')}
            </a>
            <a
              className="font-serif text-3xl leading-tight text-ink-900"
              href="/#faq"
              onClick={onClose}
            >
              {t('header.nav.faq')}
            </a>
            <a
              className="font-serif text-3xl leading-tight text-ink-900"
              href="/#contact"
              onClick={onClose}
            >
              {t('header.nav.contact')}
            </a>
            <Link
              className="font-serif text-3xl leading-tight text-ink-900"
              to={ROUTES.blog}
              onClick={onClose}
            >
              {t('header.nav.blog')}
            </Link>
          </nav>

          <div className="mt-auto pt-12">
            <Button
              as="a"
              href={SITE.booking.session}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              onClick={onClose}
            >
              {t('header.cta.book')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
