// cms/collections/Videos/index.ts
//
// Canonical store for videos attached to CMS pages. Holds YouTube uploads
// and Instagram posts/reels, kept in one collection so a single video can
// be attached to multiple pages via Payload's relationship field.
//
// The VideoBlock (cms/blocks/VideoBlock) is the only consumer on the public
// side. The beforeChange hook (./hooks/syncFromSource.ts) auto-fetches
// metadata from the appropriate API when an editor adds a new video by
// externalId. The /cms-api/videos/sync-{youtube,instagram} routes bulk-import
// everything from a channel/account.

import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { syncFromSource } from './hooks/syncFromSource'
import { defaultSlug } from './hooks/defaultSlug'
import { revalidateDelete, revalidateVideo } from './hooks/revalidateVideo'

export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    create: authenticated,
    delete: authenticated,
    // Public read is fine — these are embed URLs the public will see anyway.
    // authenticatedOrPublished still applies the draft filter (videos attached
    // to a draft Page shouldn't leak before publish).
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'provider', 'externalId', 'publishedAt', 'syncedAt'],
    group: 'Content',
  },
  fields: [
    {
      name: 'provider',
      type: 'select',
      required: true,
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Instagram', value: 'instagram' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Where this video is hosted.',
      },
      index: true,
    },
    {
      name: 'externalId',
      type: 'text',
      required: true,
      admin: {
        description:
          'YouTube video id (the part after ?v=) or Instagram media id. The sync hook uses this to fetch title, description, thumbnail, and date.',
      },
      index: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'Canonical share URL (https://www.youtube.com/watch?v=... or https://www.instagram.com/reel/...).',
      },
    },
    {
      // URL slug for the public /watch/[slug] page. The beforeChange hook
      // slugifies the title when blank; editors can override by typing a
      // value before saving. Indexed + unique so the sitemap can resolve
      // each video to exactly one on-domain URL.
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'URL-safe identifier used in /watch/{slug}. Auto-generated from the title on save if left blank. Lowercase letters, digits, and dashes only.',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Auto-filled from the API on save. You can override.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Auto-filled from the API on save. Used as the VideoObject description in JSON-LD.',
      },
    },
    {
      name: 'thumbnailUrl',
      type: 'text',
      admin: {
        description: 'Auto-filled from the API. Used as the VideoObject thumbnail (maxres for YouTube).',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'durationSeconds',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'YouTube only. Surfaced in the VideoObject schema as ISO 8601 duration.',
        readOnly: true,
      },
    },
    {
      name: 'syncedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Last time the sync hook refreshed metadata from the source API.',
      },
    },
  ],
  hooks: {
    // Re-sync from the source API on every save so the metadata stays current
    // (e.g. title edits on YouTube get picked up next time the editor opens
    // the doc and hits Save).
    // Order matters: syncFromSource populates `title` from the
    // YouTube/IG API; defaultSlug then derives a URL slug from that
    // title. Skip either hook for bulk-import writes by setting
    // data.skipSync (syncFromSource already respects it).
    beforeChange: [syncFromSource, defaultSlug],
    // Bust the videos sitemap cache the moment a video changes status, is
    // deleted, or has its provider/url edited. Without this the
    // sitemap-videos.xml route is only as fresh as its revalidate window
    // (1h by default), so a freshly-published IG post can sit unindexed for
    // up to an hour even though the row is in Mongo.
    afterChange: [revalidateVideo],
    afterDelete: [revalidateDelete],
  },
}
