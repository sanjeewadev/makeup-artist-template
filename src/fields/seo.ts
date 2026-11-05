import type { GroupField } from 'payload'

type SEOGroupOptions = {
  name?: string
  label?: string
  description?: string
}

export const seoGroup = ({
  name = 'seo',
  label = 'SEO',
  description = 'Search and social sharing overrides. Leave blank to use the site defaults.',
}: SEOGroupOptions = {}): GroupField => ({
  name,
  label,
  type: 'group',
  admin: {
    description,
  },
  fields: [
    {
      name: 'title',
      label: 'Meta title',
      type: 'text',
      maxLength: 70,
    },
    {
      name: 'description',
      label: 'Meta description',
      type: 'textarea',
      maxLength: 170,
    },
    {
      name: 'image',
      label: 'Social sharing image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'noIndex',
      label: 'Hide from search engines',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Use only for content that should not appear in search results.',
      },
    },
  ],
})
