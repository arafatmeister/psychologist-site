import { Trans, useTranslation } from 'react-i18next';
import { ROUTES } from '../../config/routes';
import { SITE } from '../../config/site';
import { LEGAL, getLegalPdf } from '../../config/legal';
import { SEO } from '../SEO/SEO';
import { StructuredData } from '../SEO/StructuredData';
import { Container } from '../layout/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { formatDate } from '../../lib/formatDate';
import { RICH_COMPONENTS, RICH_VALUES } from '../../lib/richText';

/**
 * Shared layout for read-only legal documents (Terms, Privacy).
 * Renders header + version/date/PDF bar + sections list.
 *
 * @param {{ type: 'terms' | 'privacy' }} props
 */
export function LegalDocumentPage({ type }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || SITE.defaultLocale;
  const meta = LEGAL[type];
  const pdfHref = getLegalPdf(type, locale);
  const route = ROUTES[type];
  const sections = t(`${type}.sections`, { returnObjects: true });

  return (
    <>
      <SEO
        path={route}
        title={t(`seo.${type}.title`, { name: SITE.name })}
        description={t(`seo.${type}.description`)}
      />
      <StructuredData
        breadcrumbs={[
          { name: SITE.name, path: ROUTES.home },
          { name: t(`${type}.title`), path: route },
        ]}
      />
      <Container className="pt-12 md:pt-20 pb-16 md:pb-24">
        <Eyebrow>{t(`${type}.eyebrow`)}</Eyebrow>
        <h1 className="mt-4 text-[1.75rem] leading-[1.15] text-balance md:text-3xl md:leading-[1.1] lg:text-4xl lg:leading-[1.05]">
          {t(`${type}.title`)}
        </h1>
        <p className="mt-6 max-w-[65ch] text-ink-500">{t(`${type}.intro`)}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500">
          <span>{t('legal.version', { version: meta.version })}</span>
          <span aria-hidden>·</span>
          <span>{t('legal.updatedAt', { date: formatDate(meta.updatedAt, locale) })}</span>
          {pdfHref ? (
            <>
              <span aria-hidden>·</span>
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('legal.openPdfAria')}
                className="inline-flex items-center gap-1 text-ink-900 underline decoration-ink-400 underline-offset-4 transition-colors hover:decoration-ink-900"
              >
                {t('legal.openPdf')}
                <span aria-hidden>↗</span>
              </a>
            </>
          ) : null}
        </div>

        <div className="mt-12 grid gap-10">
          {sections.map((section, index) => (
            <section key={section.title} className="border-t border-ink-200 pt-6">
              <h2 className="text-xl leading-snug text-ink-900 md:text-2xl">{section.title}</h2>
              <p className="mt-3 max-w-[65ch] whitespace-pre-line text-ink-700">
                <Trans
                  i18nKey={`${type}.sections.${index}.content`}
                  values={RICH_VALUES}
                  components={RICH_COMPONENTS}
                />
              </p>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
