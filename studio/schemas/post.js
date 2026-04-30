const LANGUAGES = [
  { id: 'uk', title: 'Українська' },
  { id: 'en', title: 'English' },
];

export const post = {
  name: 'post',
  title: 'Пост блогу',
  type: 'document',
  fields: [
    {
      name: 'language',
      title: 'Мова',
      type: 'string',
      options: {
        list: LANGUAGES.map(({ id, title }) => ({ value: id, title })),
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required().max(140),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2026-04-01' });
          const id = document._id.replace(/^drafts\./, '');
          const params = { draft: `drafts.${id}`, published: id, slug, lang: document.language };
          const query = `!defined(*[_type == "post" && language == $lang && slug.current == $slug && !(_id in [$draft, $published])][0]._id)`;
          return client.fetch(query, params);
        },
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'teaser',
      title: 'Короткий опис (teaser)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    },
    {
      name: 'category',
      title: 'Категорія',
      type: 'string',
    },
    {
      name: 'readTime',
      title: 'Час читання',
      type: 'string',
      description: 'Наприклад: "7 хв" або "6 min"',
    },
    {
      name: 'publishedAt',
      title: 'Дата публікації',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cover',
      title: 'Обкладинка',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'coverAlt',
      title: 'Alt-текст обкладинки',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Текст посту',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
        },
      ],
    },
    {
      name: 'translationOf',
      title: 'Переклад посту',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'Посилання на відповідний пост іншою мовою (опційно).',
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'language', media: 'cover' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle?.toUpperCase(), media };
    },
  },
  orderings: [
    {
      title: 'Дата публікації (нові)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
};
