import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import { getSiteURL } from '@/lib/seo'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSiteURL()

  const staticEntries: MetadataRoute.Sitemap = [
    ['', 'weekly', 1],
    ['/portfolio', 'weekly', 0.9],
    ['/services', 'monthly', 0.85],
    ['/about', 'monthly', 0.8],
    ['/journal', 'weekly', 0.85],
    ['/contact', 'monthly', 0.7],
  ].map(([path, changeFrequency, priority]) => ({
    changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: priority as number,
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
        sort: '-updatedAt',
      }),
      payload.find({
        collection: 'journal-posts',
        depth: 0,
        limit: 1000,
        overrideAccess: false,
        sort: '-publishedAt',
      }),
    ])

    const projectEntries: MetadataRoute.Sitemap = projects.docs
      .filter((project) => !project.seo?.noIndex)
      .map((project) => ({
        changeFrequency: 'monthly',
        lastModified: new Date(project.updatedAt),
        priority: project.featured ? 0.8 : 0.7,
        url: site + '/portfolio/' + project.slug,
      }))

    const journalEntries: MetadataRoute.Sitemap = posts.docs
      .filter((post) => !post.seo?.noIndex)
      .map((post) => ({
        changeFrequency: 'monthly',
        lastModified: new Date(post.updatedAt),
        priority: post.featured ? 0.75 : 0.65,
        url: site + '/journal/' + post.slug,
      }))

    return [...staticEntries, ...projectEntries, ...journalEntries]
  } catch {
    return staticEntries
  }
}
