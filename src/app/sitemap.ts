import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import config from '@/payload.config'

export const dynamic = 'force-dynamic'

const baseURL = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = baseURL()

  const staticEntries: MetadataRoute.Sitemap = [
    '',
    '/portfolio',
    '/services',
    '/about',
    '/journal',
    '/contact',
  ].map((path) => ({
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
    url: site + path,
  }))

  try {
    const payload = await getPayload({ config })

    const [projects, posts] = await Promise.all([
      payload.find({
        collection: 'portfolio-projects',
        depth: 0,
        limit: 1000,
        overrideAccess: false,
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
      payload.find({
        collection: 'journal-posts',
        depth: 0,
        limit: 1000,
        overrideAccess: false,
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
    ])

    return [
      ...staticEntries,
      ...projects.docs.map((project) => ({
        changeFrequency: 'monthly' as const,
        lastModified: new Date(project.updatedAt),
        priority: 0.7,
        url: site + '/portfolio/' + project.slug,
      })),
      ...posts.docs.map((post) => ({
        changeFrequency: 'monthly' as const,
        lastModified: new Date(post.updatedAt),
        priority: 0.65,
        url: site + '/journal/' + post.slug,
      })),
    ]
  } catch {
    return staticEntries
  }
}
