import type { Block } from 'payload'

export const BlogArchive: Block = {
  slug: 'blogArchive',
  interfaceName: 'BlogArchiveBlock',
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
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Optional category slug to filter posts. Leave blank to show all posts.',
      },
    },
  ],
  labels: {
    plural: 'Blog Archives',
    singular: 'Blog Archive',
  },
}
