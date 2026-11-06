import type { GlobalConfig } from 'payload'

import { seoGroup } from '../fields/seo'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Site Settings',
    description: 'Brand identity, contact details, social profiles, and default search metadata.',
    hideAPIURL: true,
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
    readVersions: ({ req }) => Boolean(req.user),
  },
  versions: {
    max: 25,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      maxLength: 120,
      admin: {
        description: 'Main website/business name used in browser titles and fallback branding.',
      },
    },
    {
      name: 'artistName',
      type: 'text',
      maxLength: 120,
      admin: {
        description: 'Artist name shown in public-facing brand areas when provided.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      maxLength: 180,
      admin: {
        description: 'Short brand line used as supporting identity copy.',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'Concise description of the artist/business used as a site-wide fallback.',
      },
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
      admin: {
        description: 'Primary contact details used on the Contact page and footer.',
      },
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
          maxLength: 50,
          admin: {
            description: 'Use international format for the WhatsApp number, for example +94771234567.',
          },
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
      admin: {
        description: 'Social profiles shown in the footer and other contact areas.',
      },
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
