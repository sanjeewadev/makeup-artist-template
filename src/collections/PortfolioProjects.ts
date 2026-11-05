import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { seoGroup } from '../fields/seo'
import { slugField } from '../fields/slug'

export const PortfolioProjects: CollectionConfig = {
  slug: 'portfolio-projects',
  labels: {
    singular: 'Portfolio Project',
    plural: 'Portfolio Projects',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'featured', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'clientName', 'location'],
    description: 'Curated makeup work, weddings, editorials, events, and individual looks.',
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
    readVersions: authenticated,
  },
  defaultSort: '-eventDate',
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
      maxLength: 140,
      index: true,
    },
    slugField(),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'portfolio-categories',
      required: true,
      index: true,
    },
    {
      name: 'clientName',
      label: 'Client / project name',
      type: 'text',
      maxLength: 120,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 320,
      admin: {
        description: 'Short summary used in portfolio listings and featured sections.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'story',
      type: 'richText',
    },
    {
      name: 'gallery',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          maxLength: 240,
        },
        {
          name: 'presentation',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: 'Automatic', value: 'auto' },
            { label: 'Portrait emphasis', value: 'portrait' },
            { label: 'Landscape emphasis', value: 'landscape' },
            { label: 'Wide feature', value: 'wide' },
          ],
          admin: {
            description: 'Optional art-direction hint for the portfolio layout.',
          },
        },
      ],
    },
    {
      name: 'eventDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      maxLength: 160,
      admin: {
        position: 'sidebar',
      },
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
    seoGroup(),
  ],
}
