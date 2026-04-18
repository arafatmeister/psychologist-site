import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../config/routes';
import { SITE } from '../config/site';
import { SEO } from '../components/SEO/SEO';
import { Container } from '../components/layout/Container';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        path={ROUTES.notFound}
        title={t('seo.notFound.title', { name: SITE.name })}
        description={t('seo.notFound.description')}
        noindex
      />
      <Container className="py-24 text-center">
        <h1 className="text-4xl font-semibold text-zinc-900">404</h1>
        <p className="mt-3 text-zinc-600">{t('common.notFound')}</p>
        <Link
          className="mt-6 inline-block rounded-lg bg-zinc-900 px-5 py-3 text-white"
          to={ROUTES.home}
        >
          {t('common.backHome')}
        </Link>
      </Container>
    </>
  );
}
