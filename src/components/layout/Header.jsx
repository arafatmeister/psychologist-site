import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../config/routes';
import { SITE } from '../../config/site';
import { Button } from '../ui/Button';
import { Container } from './Container';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header
      role="banner"
      className={`sticky top-0 z-40 border-b border-zinc-200 backdrop-blur ${
        isMenuOpen ? 'bg-white' : 'bg-white/90'
      }`}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link className="min-w-0" to={ROUTES.home}>
          <p className="truncate text-lg font-semibold text-zinc-900">{SITE.name}</p>
          <p className="truncate text-xs text-zinc-500">{t('header.role')}</p>
        </Link>

        <nav
          aria-label={t('a11y.mainNav')}
          className="hidden items-center gap-4 text-sm text-zinc-700 md:flex"
        >
          <a className="cursor-pointer rounded-md px-2 py-1 hover:bg-zinc-100" href="/#services">
            {t('header.nav.services')}
          </a>
          <a className="cursor-pointer rounded-md px-2 py-1 hover:bg-zinc-100" href="/#faq">
            {t('header.nav.faq')}
          </a>
          <a className="cursor-pointer rounded-md px-2 py-1 hover:bg-zinc-100" href="/#contact">
            {t('header.nav.contact')}
          </a>
          <Link className="cursor-pointer rounded-md px-2 py-1 hover:bg-zinc-100" to={ROUTES.blog}>
            {t('header.nav.blog')}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher compact />
          <Button as="a" href="/#contact" variant="secondary">
            {t('header.cta.book')}
          </Button>
          <a
            className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-3 text-sm hover:bg-zinc-100"
            href={SITE.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE.telegramHandle}
          </a>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-zinc-300 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-zinc-700">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </Container>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerRef={triggerRef}
      />
    </header>
  );
}
