import type { GlobalConfig } from 'payload'

import { seoGroup } from '../fields/seo'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact',
  admin: {
    group: 'Website Pages',
    description: 'Copy surrounding the contact and availability enquiry experience.',
    hideAPIURL: true,
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
      admin: {
        description: 'Simple expectation such as “Replies within 1–2 business days.”',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      maxLength: 600,
      admin: {
        description: 'Opening explanation shown before the contact options and enquiry form.',
      },
    },
    {
      name: 'enquiryHeading',
      label: 'Enquiry form heading',
      type: 'text',
      maxLength: 140,
      admin: {
        description: 'Heading displayed directly above the availability enquiry form.',
      },
    },
    {
      name: 'availabilityNote',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'Optional note about current availability, travel, or booking windows.',
      },
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
      admin: {
        description: 'Message shown after a successful enquiry submission.',
      },
    },
    seoGroup(),
  ],
}
