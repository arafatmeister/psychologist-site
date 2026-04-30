export const service = {
  name: 'service',
  title: 'Послуга',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Порядок',
      type: 'number',
      description: 'Менше число = вище у списку',
    },
    {
      name: 'format',
      title: 'Формат (бейдж)',
      type: 'localeString',
      description: 'Напр.: "Індивідуально", "Для пари"',
    },
    {
      name: 'title',
      title: 'Назва',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'desc',
      title: 'Опис',
      type: 'object',
      fields: [
        { name: 'uk', title: 'Українська', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
      ],
    },
    {
      name: 'duration',
      title: 'Тривалість',
      type: 'localeString',
    },
    {
      name: 'mode',
      title: 'Режим',
      type: 'localeString',
      description: 'Напр.: "онлайн · UA/EN"',
    },
  ],
  preview: {
    select: { title: 'title.uk', subtitle: 'format.uk' },
  },
  orderings: [
    {
      title: 'Порядок',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};
