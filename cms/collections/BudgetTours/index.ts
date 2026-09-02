// cms/collections/BudgetTours/index.ts
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

export const BudgetTours: CollectionConfig<'budgetTours'> = {
  slug: 'budget-tours',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'shortDescription', type: 'textarea' },
    { name: 'longDescription', type: 'richText' },
    { name: 'price', type: 'number' },
    { name: 'originalPrice', type: 'number' },
    { name: 'duration', type: 'text' },
    { name: 'groupSize', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'rating', type: 'number' },
    { name: 'reviewCount', type: 'number' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'highlights', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    { name: 'included', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    { name: 'excluded', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    { name: 'itinerary', type: 'array', fields: [
      { name: 'day', type: 'number' },
      { name: 'title', type: 'text' },
      { name: 'content', type: 'textarea' },
    ]},
    { name: 'faqs', type: 'array', fields: [
      { name: 'question', type: 'text' },
      { name: 'answer', type: 'textarea' },
    ]},
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
