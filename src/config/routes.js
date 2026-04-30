export const ROUTES = {
  home: '/',
  blog: '/blog',
  blogPost: '/blog/:slug',
  privacy: '/privacy',
  terms: '/terms',
  parentalConsent: '/parental-consent',
  notFound: '/404',
};

export const PUBLIC_ROUTES = [
  ROUTES.home,
  ROUTES.blog,
  ROUTES.privacy,
  ROUTES.terms,
  ROUTES.parentalConsent,
];
