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

// Same split as Hotels: this is marketing content (copy, gallery, SEO).
// Pricing/duration/day-by-day structure is jaedb's TourPackage/TourDay
// data, joined here by `jaedbTourPackageId`. The itinerary builder on
// the public site reads live tour data from jaedb's
// /api/public/tours endpoint and uses this collection only for the
// marketing page around it (hero copy, gallery, blog-style content).
export const Tours: CollectionConfig<'tours'> = {
  slug: 'tours',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    jaedbTourPackageId: true,
  },
  admin: {
    defaultColumns: ['title', 'jaedbTourPackageId', '_status'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'jaedbTourPackageId',
      type: 'text',
      admin: {
        description:
          'The cuid of the matching TourPackage in jaedb (GET /api/public/tours). Leave blank for tours that only exist as marketing content, e.g. ones the itinerary builder will assemble custom instead of a fixed package.',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      admin: { description: 'Used on tour cards/listing pages.' },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
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
