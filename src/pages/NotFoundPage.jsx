import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../config/routes';
import { SITE } from '../config/site';
import { SEO } from '../components/SEO/SEO';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';

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
        <h1 className="text-[1.75rem] leading-[1.15] md:text-3xl md:leading-[1.1] lg:text-4xl lg:leading-[1.05]">
          404
        </h1>
        <p className="mt-4 text-ink-500">{t('common.notFound')}</p>
        <Button as={Link} to={ROUTES.home} className="mt-8">
          {t('common.backHome')}
        </Button>
      </Container>
    </>
  );
}
