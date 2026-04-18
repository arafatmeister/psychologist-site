import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE } from '../config/site';
import { ROUTES } from '../config/routes';
import { SEO } from '../components/SEO/SEO';
import { StructuredData } from '../components/SEO/StructuredData';
import { Blog } from '../components/sections/Blog';
import { CTA } from '../components/sections/CTA';
import { FAQ } from '../components/sections/FAQ';
import { HelpWith } from '../components/sections/HelpWith';
import { Hero } from '../components/sections/Hero';
import { Services } from '../components/sections/Services';
import { WhyTrustMe } from '../components/sections/WhyTrustMe';
import { PageLoader } from '../components/ui/PageLoader';

const ContactForm = lazy(() =>
  import('../features/contact/ContactForm').then((module) => ({ default: module.ContactForm })),
);

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        path={ROUTES.home}
        title={t('seo.home.title', { name: SITE.name, role: t('header.role') })}
        description={t('seo.home.description')}
      />
      <StructuredData
        includeService
        description={t('seo.home.description')}
        breadcrumbs={[{ name: SITE.name, path: ROUTES.home }]}
      />

      <Hero />
      <HelpWith />
      <Services />
      <WhyTrustMe />
      <CTA />
      <Blog />
      <FAQ />
      <Suspense fallback={<PageLoader />}>
        <ContactForm />
      </Suspense>
    </>
  );
}
