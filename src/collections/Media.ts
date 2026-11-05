import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    group: 'Content',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
    description: 'Photography and other visual assets used across the website.',
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alternative text',
      type: 'text',
      required: true,
      maxLength: 240,
      admin: {
        description: 'Describe the image for accessibility and search engines.',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'credit',
      label: 'Photo credit',
      type: 'text',
      maxLength: 160,
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    // Sharp-based transforms are intentionally disabled because this project targets Cloudflare Workers.
    crop: false,
    focalPoint: false,
  },
}
