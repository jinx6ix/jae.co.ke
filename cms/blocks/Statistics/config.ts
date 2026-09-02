import type { Block } from 'payload'

export const Statistics: Block = {
  slug: 'statistics',
  interfaceName: 'StatisticsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'items',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'The big number / figure (e.g. "17+", "1,200", "98%").',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Short caption under the value (e.g. "Years guiding").',
          },
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Optional lucide icon name (e.g. "Award", "Heart").',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Statistics',
    singular: 'Statistic',
  },
}
