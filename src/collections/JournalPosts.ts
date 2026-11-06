import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { seoGroup } from '../fields/seo'
import { slugField } from '../fields/slug'
import { journalPreviewURL } from '../lib/admin-preview'

export const JournalPosts: CollectionConfig = {
  slug: 'journal-posts',
  labels: {
    singular: 'Journal Post',
    plural: 'Journal',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Journal',
    defaultColumns: ['title', 'publishedAt', 'featured', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'excerpt'],
    description: 'Editorial stories, beauty guidance, and search-focused articles.',
    hideAPIURL: true,
    preview: (doc) => journalPreviewURL(doc),
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
    readVersions: authenticated,
  },
  defaultSort: '-publishedAt',
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 40,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 160,
      index: true,
    },
    slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 360,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          maxLength: 50,
        },
      ],
    },
    seoGroup(),
  ],
}
