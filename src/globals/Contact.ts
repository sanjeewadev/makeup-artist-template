import type { GlobalConfig } from 'payload'

import { seoGroup } from '../fields/seo'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact',
  admin: {
    group: 'Pages',
    description: 'Copy surrounding the contact and availability enquiry experience.',
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
      name: 'intro',
      type: 'textarea',
      maxLength: 600,
    },
    {
      name: 'enquiryHeading',
      label: 'Enquiry form heading',
      type: 'text',
      maxLength: 140,
    },
    {
      name: 'availabilityNote',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'responseTime',
      label: 'Response-time note',
      type: 'text',
      maxLength: 180,
    },
    {
      name: 'successMessage',
      label: 'Successful submission message',
      type: 'textarea',
      maxLength: 500,
    },
    seoGroup(),
  ],
}
