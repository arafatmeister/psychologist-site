export const LEGAL = {
  terms: {
    version: '1.0',
    updatedAt: '2026-04-19',
    pdf: {
      uk: '/docs/public-offer-uk-v1.0-2026-04.pdf',
      en: '/docs/public-offer-en-v1.0-2026-04.pdf',
    },
  },
  privacy: {
    version: '1.0',
    updatedAt: '2026-04-19',
    pdf: {
      uk: '/docs/privacy-ethics-uk-v1.0-2026-04.pdf',
      en: '/docs/privacy-ethics-en-v1.0-2026-04.pdf',
    },
  },
  parentalConsent: {
    version: '1.0',
    updatedAt: '2026-04-19',
    pdf: {
      uk: '/docs/parental-consent-uk-v1.0-2026-04.pdf',
    },
  },
};

export function getLegalPdf(doc, locale) {
  const pdfs = LEGAL[doc]?.pdf;
  if (!pdfs) return null;
  return pdfs[locale] ?? pdfs.uk ?? null;
}
