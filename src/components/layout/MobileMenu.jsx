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
    <div className="fixed inset-x-0 bottom-0 top-20 z-30 md:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 cursor-pointer bg-zinc-950/20 backdrop-blur-[1px]"
        aria-label={t('a11y.closeMenu')}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        id="mobile-nav"
        className="absolute inset-x-2 top-2 rounded-xl border border-zinc-200 bg-white p-5 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
            {t('common.menu')}
          </p>
          <button
            type="button"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-zinc-300"
            aria-label={t('a11y.closeMenu')}
            onClick={onClose}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-zinc-700">
              <path
                d="M6 6l12 12M18 6l-12 12"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        <nav aria-label={t('a11y.mobileNav')} className="grid gap-2">
          <a
            className="cursor-pointer rounded-lg px-3 py-3 text-base text-zinc-800 hover:bg-zinc-100"
            href="/#services"
            onClick={onClose}
          >
            {t('header.nav.services')}
          </a>
          <a
            className="cursor-pointer rounded-lg px-3 py-3 text-base text-zinc-800 hover:bg-zinc-100"
            href="/#faq"
            onClick={onClose}
          >
            {t('header.nav.faq')}
          </a>
          <a
            className="cursor-pointer rounded-lg px-3 py-3 text-base text-zinc-800 hover:bg-zinc-100"
            href="/#contact"
            onClick={onClose}
          >
            {t('header.nav.contact')}
          </a>
          <Link
            className="cursor-pointer rounded-lg px-3 py-3 text-base text-zinc-800 hover:bg-zinc-100"
            to={ROUTES.blog}
            onClick={onClose}
          >
            {t('header.nav.blog')}
          </Link>
        </nav>

        <div className="mt-5 border-t border-zinc-200 pt-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide text-zinc-500">{t('common.language')}</p>
            <LanguageSwitcher compact />
          </div>

          <div className="grid gap-2">
            <Button as={Link} to="/#contact" onClick={onClose}>
              {t('header.cta.book')}
            </Button>
            <a
              className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-3 text-center text-sm hover:bg-zinc-100"
              href={SITE.telegramUrl}
              rel="noopener noreferrer"
              target="_blank"
              onClick={onClose}
            >
              {SITE.telegramHandle}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
