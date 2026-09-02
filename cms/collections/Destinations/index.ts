// cms/collections/Destinations/index.ts
//
// Marketing content for country-level destination pages (e.g. /destinations/kenya).
// Pricing, accommodation, and per-country live tour counts continue to
// come from jaedb. This collection owns: hero, copy, highlights, best
// time to visit, gallery, and SEO meta.
//
// Mirrors the `Destination` interface in `lib/destinations-data.ts` so
// existing callers can swap to `payload.find({ collection: 'destinations' })`
// with minimal change.

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

export const Destinations: CollectionConfig<'destinations'> = {
  slug: 'destinations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    country: true,
  },
  admin: {
    defaultColumns: ['title', 'country', 'popularTours', '_status'],
    useAsTitle: 'title',
    description: 'Country-level destination pages (e.g. Kenya, Tanzania).',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Display name, e.g. "Kenya".' },
    },
    {
      name: 'country',
      type: 'text',
      admin: { description: 'Country name. Usually same as title.' },
    },
    {
      name: 'wildlifeHighlights',
      type: 'textarea',
      admin: { description: 'One-paragraph wildlife-focused highlight.' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Short summary used on cards.' },
    },
    {
      name: 'longDescription',
      type: 'richText',
      admin: { description: 'Full destination story on the country page.' },
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
    },
    {
      name: 'bestTimeToVisit',
      type: 'textarea',
    },
    {
      name: 'bestFor',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
      admin: { description: 'Traveller types this destination is best for.' },
    },
    {
      name: 'popularTours',
      type: 'number',
      admin: { description: 'Cached count of published tours tagged for this country.' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
      fields: [
        OverviewField({
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
          imagePath: 'meta.image',
        }),
        MetaTitleField({ hasGenerateFn: true }),
        MetaImageField({ relationTo: 'media' }),
        MetaDescriptionField({}),
        PreviewField({
          hasGenerateFn: true,
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
        }),
      ],
    },
    {
      name: 'keywords',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: { autosave: { interval: 375 } },
    maxPerDoc: 25,
  },
}
