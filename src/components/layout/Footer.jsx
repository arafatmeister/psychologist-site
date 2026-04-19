import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../config/routes';
import { SITE } from '../../config/site';
import { Eyebrow } from '../ui/Eyebrow';
import { Container } from './Container';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer role="contentinfo" className="on-dark mt-0 bg-ink-900 py-20 text-ink-300">
      <Container className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-2xl text-paper">{t('personName')}</p>
          <Eyebrow className="mt-2" style={{ color: 'var(--color-ink-200)' }}>
            {t('header.role')}
          </Eyebrow>
          <p className="mt-8 max-w-[40ch] font-serif text-base italic leading-relaxed text-ink-200">
            {t('footer.about')}
          </p>
        </div>
        <nav aria-label={t('a11y.footerNav')} className="flex flex-col gap-3 text-sm md:items-end">
          <Link
            to={ROUTES.privacy}
            className="w-fit underline decoration-ink-500 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
          >
            {t('footer.privacy')}
          </Link>
          <Link
            to={ROUTES.terms}
            className="w-fit underline decoration-ink-500 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
          >
            {t('footer.terms')}
          </Link>
          <Link
            to={ROUTES.parentalConsent}
            className="w-fit underline decoration-ink-500 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
          >
            {t('footer.parentalConsent')}
          </Link>
          <a
            href={SITE.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit underline decoration-ink-500 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
          >
            Telegram {SITE.telegramHandle}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="w-fit underline decoration-ink-500 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
          >
            {SITE.email}
          </a>
        </nav>
      </Container>

      <Container className="mt-16 flex flex-col justify-between gap-4 border-t border-ink-700 pt-8 text-sm text-ink-300 md:flex-row md:items-center">
        <span>
          © {new Date().getFullYear()} {t('personName')} · {t('footer.confidential')}
        </span>
        <LanguageSwitcher variant="dark" />
      </Container>
    </footer>
  );
}
