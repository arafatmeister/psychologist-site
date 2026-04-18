import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SITE } from '../../config/site';
import { SEO_DEFAULTS } from '../../config/seo';

function toAbsoluteUrl(path) {
  if (!path) return SITE.url;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function SEO({ title, description, path = '/', image = SITE.ogImage, noindex = false }) {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'en' ? 'en' : 'uk';
  const defaults = SEO_DEFAULTS[language];
  const canonical = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(image);
  const locale = defaults.locale;
  const finalTitle = title || defaults.title;
  const finalDescription = description || defaults.description;

  return (
    <Helmet>
      <html lang={language} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={imageUrl} />

      <link rel="alternate" hrefLang="uk" href={`${canonical}?lang=uk`} />
      <link rel="alternate" hrefLang="en" href={`${canonical}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
    </Helmet>
  );
}
