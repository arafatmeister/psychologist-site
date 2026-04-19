import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { ROUTES } from '../config/routes';
import { SITE } from '../config/site';
import { LEGAL, getLegalPdf } from '../config/legal';
import { SEO } from '../components/SEO/SEO';
import { StructuredData } from '../components/SEO/StructuredData';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Eyebrow } from '../components/ui/Eyebrow';
import { formatDate } from '../lib/formatDate';
import { RICH_COMPONENTS, RICH_VALUES } from '../lib/richText';

export default function ParentalConsentPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || SITE.defaultLocale;
  const steps = t('parentalConsent.processSteps', { returnObjects: true });
  const items = t('parentalConsent.containsItems', { returnObjects: true });
  const pdfHref = getLegalPdf('parentalConsent', locale);

  return (
    <>
      <SEO
        path={ROUTES.parentalConsent}
        title={t('seo.parentalConsent.title', { name: SITE.name })}
        description={t('seo.parentalConsent.description')}
      />
      <StructuredData
        breadcrumbs={[
          { name: SITE.name, path: ROUTES.home },
          { name: t('parentalConsent.title'), path: ROUTES.parentalConsent },
        ]}
      />
      <Container className="pt-12 md:pt-20 pb-16 md:pb-24">
        <Eyebrow>{t('parentalConsent.eyebrow')}</Eyebrow>
        <h1 className="mt-4 text-[1.75rem] leading-[1.15] text-balance md:text-3xl md:leading-[1.1] lg:text-4xl lg:leading-[1.05]">
          <Trans i18nKey="parentalConsent.title" components={RICH_COMPONENTS} />
        </h1>
        <p className="mt-4 max-w-[65ch] text-ink-500 italic-display text-lg">
          {t('parentalConsent.subtitle')}
        </p>
        <p className="mt-6 max-w-[65ch] text-ink-700">{t('parentalConsent.intro')}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500">
          <span>{t('legal.version', { version: LEGAL.parentalConsent.version })}</span>
          <span aria-hidden>·</span>
          <span>
            {t('legal.updatedAt', { date: formatDate(LEGAL.parentalConsent.updatedAt, locale) })}
          </span>
        </div>

        <section className="mt-16 border-t border-ink-200 pt-8">
          <h2 className="text-xl leading-snug text-ink-900 md:text-2xl">
            {t('parentalConsent.processTitle')}
          </h2>
          <ol className="mt-6 grid gap-5">
            {steps.map((_, index) => (
              <li key={index} className="flex gap-5">
                <span
                  aria-hidden
                  className='shrink-0 font-serif italic text-ink-400 text-lg [font-feature-settings:"tnum","lnum"]'
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="max-w-[65ch] text-ink-700">
                  <Trans
                    i18nKey={`parentalConsent.processSteps.${index}`}
                    values={RICH_VALUES}
                    components={RICH_COMPONENTS}
                  />
                </span>
              </li>
            ))}
          </ol>

          {pdfHref ? (
            <div className="mt-10">
              <Button
                as="a"
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                {t('parentalConsent.ctaOpen')}
                <span aria-hidden className="ml-2">
                  ↗
                </span>
              </Button>
            </div>
          ) : null}
        </section>

        <section className="mt-16 border-t border-ink-200 pt-8">
          <h2 className="text-xl leading-snug text-ink-900 md:text-2xl">
            {t('parentalConsent.containsTitle')}
          </h2>
          <ul className="mt-6 grid max-w-[65ch] gap-3 text-ink-700">
            {items.map((_, index) => (
              <li
                key={index}
                className="relative pl-5 before:absolute before:left-0 before:top-3 before:h-px before:w-3 before:bg-ink-400"
              >
                <Trans
                  i18nKey={`parentalConsent.containsItems.${index}`}
                  values={RICH_VALUES}
                  components={RICH_COMPONENTS}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 border-t border-ink-200 pt-8">
          <h2 className="text-xl leading-snug text-ink-900 md:text-2xl">
            {t('parentalConsent.referencesTitle')}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <Link
                to={ROUTES.privacy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-900 underline decoration-ink-400 underline-offset-4 hover:decoration-ink-900"
              >
                {t('parentalConsent.privacyLink')}
                <span aria-hidden className="ml-1">
                  ↗
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.terms}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-900 underline decoration-ink-400 underline-offset-4 hover:decoration-ink-900"
              >
                {t('parentalConsent.termsLink')}
                <span aria-hidden className="ml-1">
                  ↗
                </span>
              </Link>
            </li>
          </ul>

          <p className="mt-8 max-w-[65ch] text-sm text-ink-500">
            <Trans
              i18nKey="parentalConsent.questions"
              values={RICH_VALUES}
              components={RICH_COMPONENTS}
            />
          </p>
        </section>
      </Container>
    </>
  );
}
