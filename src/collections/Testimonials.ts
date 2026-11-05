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
    group: 'Content',
    defaultColumns: ['clientName', 'service', 'featured', '_status', 'updatedAt'],
    listSearchableFields: ['clientName', 'quote', 'location'],
    description: 'Client reviews that can be featured throughout the website.',
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
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      maxLength: 1200,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
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
