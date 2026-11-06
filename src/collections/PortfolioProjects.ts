import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { seoGroup } from '../fields/seo'
import { slugField } from '../fields/slug'
import { portfolioPreviewURL } from '../lib/admin-preview'

export const PortfolioProjects: CollectionConfig = {
  slug: 'portfolio-projects',
  labels: {
    singular: 'Portfolio Project',
    plural: 'Portfolio Projects',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Portfolio',
    defaultColumns: ['title', 'category', 'featured', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'clientName', 'location'],
    description: 'Curated makeup work, weddings, editorials, events, and individual looks.',
    hideAPIURL: true,
    preview: (doc) => portfolioPreviewURL(doc),
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
      admin: {
        description: 'Public project title used on portfolio cards and the project page.',
      },
    },
    slugField(),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'portfolio-categories',
      required: true,
      index: true,
      admin: {
        description: 'Controls which public portfolio filter this project appears under.',
      },
    },
    {
      name: 'clientName',
      label: 'Client / project name',
      type: 'text',
      maxLength: 120,
      admin: {
        description: 'Optional client, wedding, campaign, or project name shown in project details.',
      },
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
      admin: {
        description: 'Primary image used on portfolio cards and the project-page hero.',
      },
    },
    {
      name: 'story',
      type: 'richText',
      admin: {
        description: 'Optional story behind the look, occasion, brief, or creative direction.',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      minRows: 1,
      admin: {
        description: 'Ordered gallery shown on the project page. Use presentation hints to shape the editorial layout.',
      },
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
        description: 'Featured projects can be selected or prioritized in prominent site sections.',
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
