const LOCALE_MAP = {
  uk: 'uk-UA',
  en: 'en-US',
};

export function formatDate(
  iso,
  locale = 'uk',
  options = { year: 'numeric', month: 'long', day: 'numeric' },
) {
  return new Intl.DateTimeFormat(LOCALE_MAP[locale] ?? LOCALE_MAP.uk, options).format(
    new Date(iso),
  );
}
