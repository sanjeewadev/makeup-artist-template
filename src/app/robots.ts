import type { MetadataRoute } from 'next'

const site = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

export default function robots(): MetadataRoute.Robots {
  const base = site()

  return {
    rules: {
      allow: '/',
      disallow: ['/admin/', '/api/', '/preview'],
      userAgent: '*',
    },
    sitemap: base + '/sitemap.xml',
  }
}
