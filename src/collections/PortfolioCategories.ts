import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const PortfolioCategories: CollectionConfig = {
  slug: 'portfolio-categories',
  labels: {
    singular: 'Portfolio Category',
    plural: 'Portfolio Categories',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'sortOrder', 'updatedAt'],
    description: 'Curated categories used to organize portfolio projects.',
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: 'sortOrder',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 100,
      index: true,
    },
    slugField(),
    {
      name: 'description',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
  ],
}
