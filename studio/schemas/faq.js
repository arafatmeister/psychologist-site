export const faq = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Порядок',
      type: 'number',
    },
    {
      name: 'question',
      title: 'Питання',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Відповідь',
      type: 'object',
      fields: [
        { name: 'uk', title: 'Українська', type: 'text', rows: 4 },
        { name: 'en', title: 'English', type: 'text', rows: 4 },
      ],
    },
  ],
  preview: {
    select: { title: 'question.uk' },
  },
  orderings: [
    {
      title: 'Порядок',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};
