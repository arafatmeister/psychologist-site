import { SITE } from './site';

export const SEO_DEFAULTS = {
  uk: {
    title: `${SITE.name} | ${SITE.role.uk}`,
    description:
      'Онлайн консультації психолога українською та англійською. Тривога, кризи, стосунки, пошук сенсу та психоделічна інтеграція.',
    locale: 'uk_UA',
  },
  en: {
    title: `${SITE.name} | ${SITE.role.en}`,
    description:
      'Online psychology sessions in Ukrainian and English. Anxiety, relationships, life crises, meaning, and psychedelic integration.',
    locale: 'en_US',
  },
};
