import { useTranslation } from 'react-i18next';
import { ROUTES } from '../config/routes';
import { SITE } from '../config/site';
import { SEO } from '../components/SEO/SEO';
import { StructuredData } from '../components/SEO/StructuredData';
import { Container } from '../components/layout/Container';
import { Eyebrow } from '../components/ui/Eyebrow';

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
      <Container className="py-20 md:py-28">
        <Eyebrow>{t('footer.terms')}</Eyebrow>
        <h1 className="mt-4 text-[1.75rem] leading-[1.15] md:text-3xl md:leading-[1.1] lg:text-4xl lg:leading-[1.05]">
          {t('terms.title')}
        </h1>
        <p className="mt-6 max-w-[60ch] text-ink-500">{t('terms.description')}</p>
        <p className="mt-2 text-sm text-ink-400">{t('terms.updatedAt')}</p>

        <div className="mt-12 grid gap-8">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-ink-200 pt-6">
              <h2 className="text-2xl">{section.title}</h2>
              <p className="mt-3 text-ink-500">{section.content}</p>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
