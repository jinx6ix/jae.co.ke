import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const SocialIndexingAssets: CollectionConfig = {
  slug: 'social-indexing-assets',
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'socialUrl',
    defaultColumns: ['platform', 'socialUrl', 'discoveryStatus', 'publishedAt'],
    group: 'Content',
  },
  fields: [
    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        { label: 'Instagram', value: 'instagram' },
        { label: 'YouTube', value: 'youtube' },
      ],
      index: true,
    },
    {
      name: 'socialUrl',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'discoveryStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Checking', value: 'checking' },
        { label: 'Discovered', value: 'discovered' },
        { label: 'Not Discovered', value: 'not_discovered' },
        { label: 'Unavailable', value: 'unavailable' },
        { label: 'Error', value: 'error' },
      ],
      index: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    // ... add other fields as defined in the schema
    { name: 'accountUrl', type: 'text' },
    { name: 'contentId', type: 'text' },
    { name: 'contentType', type: 'text' },
    { name: 'externalId', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'caption', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    { name: 'targetKeyword', type: 'text' },
    { name: 'targetUrl', type: 'text' },
    { name: 'firstDiscoveredAt', type: 'date' },
    { name: 'lastCheckedAt', type: 'date' },
    { name: 'lastError', type: 'text' },
  ],
}
