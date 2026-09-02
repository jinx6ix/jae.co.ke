// cms/collections/Products/index.ts
import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'details', type: 'richText' },
    { name: 'price', type: 'number' },
    { name: 'currency', type: 'text' },
    { name: 'duration', type: 'text' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'meta', label: 'SEO', type: 'group', fields: [
      OverviewField({ titlePath: 'meta.title', descriptionPath: 'meta.description', imagePath: 'meta.image' }),
      MetaTitleField({ hasGenerateFn: true }),
      MetaImageField({ relationTo: 'media' }),
      MetaDescriptionField({}),
    ]},
    slugField(),
  ],
  hooks: { beforeChange: [populatePublishedAt] },
}
