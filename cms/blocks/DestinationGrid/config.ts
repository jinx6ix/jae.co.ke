import type { Block } from 'payload'

export const DestinationGrid: Block = {
  slug: 'destinationGrid',
  interfaceName: 'DestinationGridBlock',
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
      defaultValue: 6,
    },
  ],
  labels: {
    plural: 'Destination Grids',
    singular: 'Destination Grid',
  },
}
