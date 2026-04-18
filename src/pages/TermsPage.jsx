import { useTranslation } from 'react-i18next';
import { ROUTES } from '../config/routes';
import { SITE } from '../config/site';
import { SEO } from '../components/SEO/SEO';
import { StructuredData } from '../components/SEO/StructuredData';
import { Container } from '../components/layout/Container';

export default function TermsPage() {
  const { t } = useTranslation();
  const sections = t('terms.sections', {
    returnObjects: true,
    email: SITE.email,
    telegramHandle: SITE.telegramHandle,
  });

  return (
    <>
      <SEO
        path={ROUTES.terms}
        title={t('seo.terms.title', { name: SITE.name })}
        description={t('seo.terms.description')}
      />
      <StructuredData
        breadcrumbs={[
          { name: SITE.name, path: ROUTES.home },
          { name: t('terms.title'), path: ROUTES.terms },
        ]}
      />
      <Container className="py-14">
        <h1 className="text-4xl font-semibold text-zinc-900">{t('terms.title')}</h1>
        <p className="mt-3 text-zinc-600">{t('terms.description')}</p>
        <p className="mt-2 text-sm text-zinc-500">{t('terms.updatedAt')}</p>

        <div className="mt-8 grid gap-6">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-zinc-900">{section.title}</h2>
              <p className="mt-2 text-zinc-600">{section.content}</p>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
