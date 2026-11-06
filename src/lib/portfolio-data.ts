import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import type { Media, PortfolioCategory, PortfolioProject } from '@/payload-types'
import config from '@/payload.config'

export type PortfolioCardData = {
  categorySlug: string
  categoryTitle: string
  excerpt: string | null
  id: number
  image: Media | null
  location: string | null
  slug: string
  title: string
}

export type PortfolioFilterData = {
  slug: string
  title: string
}

export type PortfolioIndexData = {
  categories: PortfolioFilterData[]
  projects: PortfolioCardData[]
}

export type PortfolioProjectPageData = {
  nextProject: PortfolioProject | null
  project: PortfolioProject | null
}

const resolvedCategory = (
  category: number | PortfolioCategory | null | undefined,
): PortfolioCategory | null =>
  category && typeof category === 'object' && 'slug' in category ? category : null

const resolvedMedia = (media: number | Media | null | undefined): Media | null =>
  media && typeof media === 'object' && 'url' in media ? media : null

export async function getPortfolioIndexData(): Promise<PortfolioIndexData> {
  const preview = (await draftMode()).isEnabled

  try {
    const payload = await getPayload({ config })

    const [categoryResult, projectResult] = await Promise.all([
      payload.find({
        collection: 'portfolio-categories',
        depth: 0,
        limit: 100,
        overrideAccess: false,
        sort: 'sortOrder',
      }),
      payload.find({
        collection: 'portfolio-projects',
        depth: 2,
        draft: preview,
        limit: 100,
        overrideAccess: preview,
        sort: 'sortOrder',
      }),
    ])

    return {
      categories: categoryResult.docs.map((category) => ({
        slug: category.slug,
        title: category.title,
      })),
      projects: projectResult.docs.map((project) => {
        const category = resolvedCategory(project.category)

        return {
          categorySlug: category?.slug || 'uncategorized',
          categoryTitle: category?.title || 'Portfolio',
          excerpt: project.excerpt || null,
          id: project.id,
          image: resolvedMedia(project.heroImage),
          location: project.location || null,
          slug: project.slug,
          title: project.title,
        }
      }),
    }
  } catch {
    return {
      categories: [],
      projects: [],
    }
  }
}

export const getPortfolioProjectPageData = cache(
  async (slug: string): Promise<PortfolioProjectPageData> => {
    const preview = (await draftMode()).isEnabled

    try {
      const payload = await getPayload({ config })

      const projectResult = await payload.find({
        collection: 'portfolio-projects',
        depth: 2,
        draft: preview,
        limit: 1,
        overrideAccess: preview,
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      const project = projectResult.docs[0] || null

      if (!project) {
        return {
          nextProject: null,
          project: null,
        }
      }

      const allProjects = await payload.find({
        collection: 'portfolio-projects',
        depth: 2,
        draft: preview,
        limit: 100,
        overrideAccess: preview,
        sort: 'sortOrder',
      })

      const currentIndex = allProjects.docs.findIndex((item) => item.id === project.id)
      const nextProject =
        allProjects.docs.length > 1
          ? allProjects.docs[(currentIndex + 1) % allProjects.docs.length] || null
          : null

      return {
        nextProject: nextProject?.id === project.id ? null : nextProject,
        project,
      }
    } catch {
      return {
        nextProject: null,
        project: null,
      }
    }
  },
)
