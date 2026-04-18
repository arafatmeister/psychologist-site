import { Helmet } from 'react-helmet-async';
import { SITE } from '../../config/site';

function toAbsoluteUrl(path) {
  if (!path) return SITE.url;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function StructuredData({ description, breadcrumbs = [], includeService = false }) {
  const scripts = [];

  if (includeService) {
    scripts.push({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: SITE.name,
      description,
      url: SITE.url,
      image: toAbsoluteUrl(SITE.ogImage),
      telephone: '',
      areaServed: 'Worldwide',
      priceRange: '$$',
      provider: {
        '@type': 'Person',
        name: SITE.author,
        jobTitle: SITE.role.en,
        knowsLanguage: ['uk', 'en'],
      },
      serviceType: [
        'Individual counseling',
        'Couples counseling',
        'Adolescent counseling',
        'Psychedelic integration',
      ],
    });
  }

  if (breadcrumbs.length > 0) {
    scripts.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: toAbsoluteUrl(item.path),
      })),
    });
  }

  return (
    <Helmet>
      {scripts.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
