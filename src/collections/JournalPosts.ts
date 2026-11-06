import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { seoGroup } from '../fields/seo'
import { slugField } from '../fields/slug'
import { journalPreviewURL } from '../lib/admin-preview'

const setFirstPublishedAt: CollectionBeforeChangeHook = ({ data, operation, originalDoc }) => {
  if (
    (operation === 'create' || operation === 'update') &&
    data._status === 'published' &&
    !data.publishedAt &&
    !originalDoc?.publishedAt
  ) {
    data.publishedAt = new Date().toISOString()
  }

  return data
}

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
    description:
      'Write beauty guidance, artist stories, and search-friendly articles. Save drafts freely and use Preview before publishing.',
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
  hooks: {
    beforeChange: [setFirstPublishedAt],
  },
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
      admin: {
        description: 'The article headline shown on the Journal page and article page.',
      },
    },
    slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 360,
      admin: {
        description:
          'A short summary used on Journal cards and as the default search description when no SEO override is provided.',
      },
    },
    {
      name: 'featuredImage',
      label: 'Featured image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'The main editorial image used on the Journal listing, article hero, and social sharing fallback.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description:
          'Write the complete article here. Use headings to create a clear reading structure for visitors and search engines.',
      },
    },
    {
      name: 'publishedAt',
      label: 'Published date',
      type: 'date',
      admin: {
        position: 'sidebar',
        description:
          'Filled automatically the first time the post is published. Change it only when the editorial date should be different.',
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
        description:
          'Featured stories receive the lead position on the public Journal page. Keep this selective.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      maxRows: 8,
      admin: {
        description:
          'Optional reader-facing topics such as Bridal, Skin, Editorial, Preparation, or Behind the Scenes.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          maxLength: 50,
          admin: {
            description: 'Short topic label.',
          },
        },
      ],
    },
    seoGroup({
      description:
        'Optional search/social overrides for this article. Leave blank to use the title, excerpt, featured image, and site defaults.',
    }),
  ],
}
