import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home',
  admin: {
    group: 'Pages',
    description: 'Editorial content and selections for the home page. Layout is controlled by the frontend.',
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
      name: 'hero',
      type: 'group',
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
          name: 'subheading',
          type: 'textarea',
          maxLength: 420,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'primaryCTA',
          type: 'group',
          fields: [
            {
              name: 'label',
              type: 'text',
              maxLength: 60,
            },
            {
              name: 'url',
              type: 'text',
              maxLength: 500,
            },
          ],
        },
      ],
    },
    {
      name: 'introduction',
      type: 'group',
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
          name: 'body',
          type: 'richText',
        },
      ],
    },
    {
      name: 'featuredProjects',
      type: 'relationship',
      relationTo: 'portfolio-projects',
      hasMany: true,
      admin: {
        description: 'Choose a small set of projects to art-direct on the home page.',
      },
    },
    {
      name: 'featuredServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'featuredTestimonial',
      type: 'relationship',
      relationTo: 'testimonials',
    },
    {
      name: 'closingCTA',
      label: 'Closing call to action',
      type: 'group',
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
          name: 'body',
          type: 'textarea',
          maxLength: 420,
        },
        {
          name: 'label',
          type: 'text',
          maxLength: 60,
        },
        {
          name: 'url',
          type: 'text',
          maxLength: 500,
        },
      ],
    },
  ],
}
