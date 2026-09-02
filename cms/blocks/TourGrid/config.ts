import type { Block } from 'payload'

export const TourGrid: Block = {
  slug: 'tourGrid',
  interfaceName: 'TourGridBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 12,
      admin: {
        description: 'How many tour cards to show. Leave blank for all tours.',
      },
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description:
          'Optional filter — matches the tour title or shortDescription for a keyword (e.g. "Amboseli", "Gorilla"). Leave blank to show all tours.',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'View all tours',
      admin: {
        description: 'Label of the "see more" link shown when more tours exist than the limit.',
      },
    },
  ],
  labels: {
    plural: 'Tour Grids',
    singular: 'Tour Grid',
  },
}
