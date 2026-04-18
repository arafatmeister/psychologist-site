import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../config/routes';
import { SITE } from '../../config/site';
import { Container } from './Container';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer role="contentinfo" className="border-t border-zinc-200 bg-white py-10">
      <Container className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-3 text-sm text-zinc-600">
          <p>{t('footer.copyright', { year: new Date().getFullYear(), name: SITE.author })}</p>
          <nav aria-label={t('a11y.footerNav')} className="flex flex-wrap items-center gap-4">
            <Link className="underline-offset-2 hover:underline" to={ROUTES.privacy}>
              {t('footer.privacy')}
            </Link>
            <Link className="underline-offset-2 hover:underline" to={ROUTES.terms}>
              {t('footer.terms')}
            </Link>
            <a
              className="underline-offset-2 hover:underline"
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE.telegramHandle}
            </a>
          </nav>
        </div>
        <LanguageSwitcher />
      </Container>
    </footer>
  );
}
