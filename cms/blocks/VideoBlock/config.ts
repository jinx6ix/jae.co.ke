// cms/blocks/VideoBlock/config.ts
//
// Editor-facing block for attaching YouTube videos and Instagram Reels to
// any page that has a `layout: blocks` array (Pages, Posts, Tours,
// Destinations, Hotels, BudgetTours).
//
// The block holds a relationship to the canonical Videos collection, NOT a
// raw URL — that way a single video can be attached to multiple pages
// without duplicating metadata, and the editor can browse the library
// from the relationship picker.

import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'videoBlock',
  interfaceName: 'VideoBlock',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional H2 above the videos (e.g. "Watch our safaris in action").',
      },
    },
    {
      name: 'videos',
      type: 'relationship',
      relationTo: 'videos',
      hasMany: true,
      required: true,
      admin: {
        description: 'Pick videos from the library. Use a maximum of 6 per block for best layout.',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid (2-3 per row)', value: 'grid' },
        { label: 'Stacked (full width)', value: 'stack' },
        { label: 'Carousel', value: 'carousel' },
      ],
      admin: {
        description: 'How the videos should be laid out on the page.',
      },
    },
    {
      name: 'showCaptions',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Render the title and description below each video.',
      },
    },
  ],
}
