import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { seoGroup } from '../fields/seo'
import { slugField } from '../fields/slug'
import { servicePreviewURL } from '../lib/admin-preview'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Services & Reviews',
    defaultColumns: ['title', 'featured', 'sortOrder', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'shortDescription'],
    description: 'Client-facing makeup services and packages.',
    hideAPIURL: true,
    preview: (doc) => servicePreviewURL(doc),
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
    readVersions: authenticated,
  },
  defaultSort: 'sortOrder',
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 30,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 120,
      index: true,
      admin: {
        description: 'Public service name shown on the Services page and enquiry form.',
      },
    },
    slugField(),
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 320,
      admin: {
        description: 'Concise service summary used near the service heading and on featured sections.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Optional full service details, inclusions, preparation notes, or booking context.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Editorial image representing this service on the public Services page.',
      },
    },
    {
      name: 'priceLabel',
      label: 'Price / starting price label',
      type: 'text',
      maxLength: 80,
      admin: {
        description: 'Optional. Examples: “From $250” or “Custom quote”.',
      },
    },
    {
      name: 'durationLabel',
      label: 'Duration label',
      type: 'text',
      maxLength: 80,
      admin: {
        description: 'Optional display text such as “90 minutes” or “Half day”.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured services can appear in prominent homepage/service sections.',
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
    seoGroup(),
  ],
}
