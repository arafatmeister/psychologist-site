import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../config/routes';
import { SITE } from '../../config/site';
import { useScrollTrigger } from '../../lib/useScrollTrigger';
import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/Eyebrow';
import { Container } from './Container';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const triggerRef = useRef(null);
  const isSticky = useScrollTrigger(80);

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
      className={`sticky top-0 z-50 border-b border-ink-200 transition-colors duration-300 ${
        isSticky ? 'bg-paper/95 backdrop-blur-sm' : 'bg-paper'
      }`}
    >
      <Container className={`transition-[padding] duration-300 ${isSticky ? 'py-4' : 'py-6'}`}>
        <div className="flex items-center justify-between gap-6">
          <Link to={ROUTES.home} className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-[18px] font-medium tracking-tight text-ink-900">
              {SITE.name}
            </span>
            <Eyebrow className="mt-1 text-[11px] tracking-[0.1em]">{t('header.role')}</Eyebrow>
          </Link>

          <nav
            aria-label={t('a11y.mainNav')}
            className="hidden items-center gap-6 text-[15px] font-normal text-ink-700 md:flex"
          >
            <a className="hover:text-ink-900" href="/#services">
              {t('header.nav.services')}
            </a>
            <a className="hover:text-ink-900" href="/#faq">
              {t('header.nav.faq')}
            </a>
            <a className="hover:text-ink-900" href="/#contact">
              {t('header.nav.contact')}
            </a>
            <Link className="hover:text-ink-900" to={ROUTES.blog}>
              {t('header.nav.blog')}
            </Link>
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <LanguageSwitcher />
            <Button as="a" href="/#contact" variant="primary">
              {t('header.cta.book')}
            </Button>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span
              aria-hidden="true"
              className={`absolute h-px w-6 bg-ink-900 transition-all duration-300 ${
                isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5 rotate-0'
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-px w-6 bg-ink-900 transition-all duration-300 ${
                isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5 rotate-0'
              }`}
            />
          </button>
        </div>
      </Container>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerRef={triggerRef}
      />
    </header>
  );
}
