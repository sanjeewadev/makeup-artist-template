import type { GlobalConfig } from 'payload'

import { seoGroup } from '../fields/seo'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About',
  admin: {
    group: 'Pages',
    description: 'The artist story, portrait, credentials, and page metadata.',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
    readVersions: ({ req }) => Boolean(req.user),
  },
  versions: {
    max: 30,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      maxLength: 100,
    },
    {
      name: 'heading',
      type: 'text',
      maxLength: 180,
    },
    {
      name: 'lead',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'story',
      type: 'richText',
    },
    {
      name: 'credentials',
      type: 'array',
      maxRows: 12,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          maxLength: 120,
        },
        {
          name: 'detail',
          type: 'text',
          maxLength: 240,
        },
      ],
    },
    {
      name: 'cta',
      label: 'Call to action',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          maxLength: 60,
        },
        {
          name: 'url',
          type: 'text',
          maxLength: 500,
        },
      ],
    },
    seoGroup(),
  ],
}
