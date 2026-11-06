import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'clientName',
    group: 'Services & Reviews',
    defaultColumns: ['clientName', 'service', 'featured', '_status', 'updatedAt'],
    listSearchableFields: ['clientName', 'quote', 'location'],
    description: 'Client reviews that can be featured throughout the website.',
    hideAPIURL: true,
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
    readVersions: authenticated,
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 25,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      maxLength: 120,
      admin: {
        description: 'Client name shown with the testimonial.',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      maxLength: 1200,
      admin: {
        description: 'Use the client’s own words and keep the strongest part of the review.',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description: 'Optional service connected to this review.',
      },
    },
    {
      name: 'location',
      type: 'text',
      maxLength: 160,
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional client portrait. Only use with permission.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured reviews are preferred for high-visibility testimonial sections.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
