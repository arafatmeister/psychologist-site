export const homePage = {
  name: 'homePage',
  title: 'Головна сторінка',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero' },
    { name: 'helpWith', title: 'Чим можу допомогти' },
    { name: 'services', title: 'Послуги (обгортка секції)' },
    { name: 'trust', title: 'Довіра' },
    { name: 'cta', title: 'CTA' },
    { name: 'blog', title: 'Блог (обгортка секції)' },
    { name: 'faq', title: 'FAQ (обгортка секції)' },
  ],
  fields: [
    {
      name: 'language',
      title: 'Мова',
      type: 'string',
      options: {
        list: [
          { value: 'uk', title: 'Українська' },
          { value: 'en', title: 'English' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },

    // HERO
    { name: 'heroEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'hero' },
    { name: 'heroTitleBefore', title: 'Заголовок — початок', type: 'string', fieldset: 'hero' },
    {
      name: 'heroTitleEm',
      title: 'Заголовок — виділений (italic)',
      type: 'string',
      fieldset: 'hero',
    },
    { name: 'heroTitleAfter', title: 'Заголовок — кінець', type: 'string', fieldset: 'hero' },
    { name: 'heroSubtitle', title: 'Підзаголовок', type: 'text', rows: 3, fieldset: 'hero' },
    { name: 'heroCtaBook', title: 'Кнопка: Записатись', type: 'string', fieldset: 'hero' },
    {
      name: 'heroCtaFree',
      title: 'Посилання: Безкоштовна розмова',
      type: 'string',
      fieldset: 'hero',
    },
    {
      name: 'heroNote',
      title: 'Примітка під CTA (HTML <br /> дозволено)',
      type: 'text',
      rows: 2,
      fieldset: 'hero',
    },
    { name: 'heroPhotoCaption', title: 'Підпис під фото', type: 'string', fieldset: 'hero' },
    { name: 'heroPhotoAlt', title: 'Alt фото', type: 'string', fieldset: 'hero' },

    // HELP WITH
    { name: 'helpWithEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'helpWith' },
    { name: 'helpWithTitle', title: 'Заголовок', type: 'string', fieldset: 'helpWith' },
    {
      name: 'helpWithItems',
      title: 'Пункти',
      type: 'array',
      fieldset: 'helpWith',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Заголовок', type: 'string' },
            { name: 'desc', title: 'Опис', type: 'text', rows: 2 },
          ],
        },
      ],
    },

    // SERVICES (wrapper only — items are in `service` docs)
    { name: 'servicesEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'services' },
    { name: 'servicesTitle', title: 'Заголовок', type: 'string', fieldset: 'services' },
    {
      name: 'servicesSubtitle',
      title: 'Підзаголовок',
      type: 'text',
      rows: 2,
      fieldset: 'services',
    },

    // TRUST
    { name: 'trustEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'trust' },
    { name: 'trustTitle', title: 'Заголовок', type: 'string', fieldset: 'trust' },
    { name: 'trustQuote', title: 'Цитата клієнта', type: 'text', rows: 2, fieldset: 'trust' },
    { name: 'trustQuoteAuthor', title: 'Автор цитати', type: 'string', fieldset: 'trust' },
    {
      name: 'trustFacts',
      title: 'Факти/цифри',
      type: 'array',
      fieldset: 'trust',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Значення', type: 'string' },
            { name: 'label', title: 'Підпис', type: 'string' },
          ],
        },
      ],
    },

    // CTA
    { name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'cta' },
    { name: 'ctaBody', title: 'Текст', type: 'text', rows: 2, fieldset: 'cta' },
    { name: 'ctaButton', title: 'Кнопка', type: 'string', fieldset: 'cta' },

    // BLOG WRAPPER
    { name: 'blogEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'blog' },
    { name: 'blogTitle', title: 'Заголовок', type: 'string', fieldset: 'blog' },
    { name: 'blogSubtitle', title: 'Підзаголовок', type: 'text', rows: 2, fieldset: 'blog' },
    { name: 'blogReadMore', title: 'Кнопка "Читати далі"', type: 'string', fieldset: 'blog' },

    // FAQ WRAPPER
    { name: 'faqEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'faq' },
    { name: 'faqTitle', title: 'Заголовок', type: 'string', fieldset: 'faq' },
  ],
  preview: {
    select: { title: 'language' },
    prepare({ title }) {
      return { title: `Головна (${title?.toUpperCase() || '—'})` };
    },
  },
};
