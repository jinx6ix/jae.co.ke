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

// Marketing content for a hotel — description, gallery, editorial copy.
// Pricing and availability live in jaedb (SRHotel/SRRoomType/SRRoomPrice)
// and are NOT duplicated here: `jaedbHotelId` is the join key the
// website's itinerary builder and any Tours/Hotels display pages use to
// pull live rates from jaedb's /api/public/hotels endpoint. Editing a
// hotel's price happens in jaedb, not here — this collection is content
// only, on purpose, so there's exactly one place prices can drift out
// of date.
export const Hotels: CollectionConfig<'hotels'> = {
  slug: 'hotels',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    jaedbHotelId: true,
  },
  admin: {
    defaultColumns: ['title', 'region', 'jaedbHotelId', '_status'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'jaedbHotelId',
      type: 'number',
      required: true,
      unique: true,
      admin: {
        description:
          'The numeric id of this hotel in jaedb\u2019s SRHotel table (visible in the jaedb dashboard or via GET /api/public/hotels). Pricing, seasons, and room types are fetched live from jaedb using this id \u2014 never entered here.',
      },
    },
    {
      name: 'region',
      type: 'text',
      admin: { description: 'e.g. Maasai Mara, Amboseli \u2014 should match the county name in jaedb for the pairing to be obvious.' },
    },
    {
      name: 'description',
      type: 'richText',
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
