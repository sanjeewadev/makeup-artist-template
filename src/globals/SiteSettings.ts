import type { GlobalConfig } from 'payload'

import { seoGroup } from '../fields/seo'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    description: 'Brand identity, contact details, social profiles, and default search metadata.',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
    readVersions: ({ req }) => Boolean(req.user),
  },
  versions: {
    maxPerDoc: 25,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      maxLength: 120,
    },
    {
      name: 'artistName',
      type: 'text',
      maxLength: 120,
    },
    {
      name: 'tagline',
      type: 'text',
      maxLength: 180,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoMark',
      label: 'Logo mark / monogram',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
          maxLength: 50,
        },
        {
          name: 'whatsapp',
          label: 'WhatsApp number',
          type: 'text',
          maxLength: 50,
        },
        {
          name: 'serviceArea',
          label: 'Primary service area',
          type: 'text',
          maxLength: 180,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      maxRows: 10,
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          maxLength: 80,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          maxLength: 500,
        },
      ],
    },
    seoGroup({
      name: 'defaultSEO',
      label: 'Default SEO',
      description: 'Fallback metadata used when a page or project does not provide its own SEO values.',
    }),
  ],
}
