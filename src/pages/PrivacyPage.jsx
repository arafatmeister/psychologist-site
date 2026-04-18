import { useTranslation } from 'react-i18next';
import { ROUTES } from '../config/routes';
import { SITE } from '../config/site';
import { SEO } from '../components/SEO/SEO';
import { StructuredData } from '../components/SEO/StructuredData';
import { Container } from '../components/layout/Container';

export default function PrivacyPage() {
  const { t } = useTranslation();
  const sections = t('privacy.sections', {
    returnObjects: true,
    email: SITE.email,
    telegramHandle: SITE.telegramHandle,
  });

  return (
    <>
      <SEO
        path={ROUTES.privacy}
        title={t('seo.privacy.title', { name: SITE.name })}
        description={t('seo.privacy.description')}
      />
      <StructuredData
        breadcrumbs={[
          { name: SITE.name, path: ROUTES.home },
          { name: t('privacy.title'), path: ROUTES.privacy },
        ]}
      />
      <Container className="py-14">
        <h1 className="text-4xl font-semibold text-zinc-900">{t('privacy.title')}</h1>
        <p className="mt-3 text-zinc-600">{t('privacy.description')}</p>
        <p className="mt-2 text-sm text-zinc-500">{t('privacy.updatedAt')}</p>

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
