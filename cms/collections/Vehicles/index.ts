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

// Marketing content for vehicle-hire pages. jaedb's own Vehicle model
// (name/type/seats/ratePerDay/currency) is the operational record used
// for actual hire bookings \u2014 `jaedbVehicleId` joins to it so rate/
// availability edits happen in one place (jaedb) while descriptive
// copy and photography live here.
export const Vehicles: CollectionConfig<'vehicles'> = {
  slug: 'vehicles',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'vehicleType', 'jaedbVehicleId', '_status'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'jaedbVehicleId',
      type: 'text',
      admin: { description: 'The cuid of the matching Vehicle record in jaedb, if this vehicle is bookable there.' },
    },
    {
      name: 'vehicleType',
      type: 'select',
      options: ['SUV', 'Van', 'Luxury', 'Overland', 'Accessible', 'Photography', 'Minivan'],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'specifications',
      type: 'group',
      fields: [
        { name: 'engine', type: 'text' },
        { name: 'transmission', type: 'text' },
        { name: 'fuelType', type: 'text' },
        { name: 'luggage', type: 'text' },
        { name: 'seats', type: 'number' },
        { name: 'doors', type: 'number' },
        { name: 'groundClearance', type: 'text' },
      ],
    },
    {
      name: 'features',
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
