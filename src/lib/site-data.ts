import { getPayload } from 'payload'

import type {
  Home,
  Navigation,
  PortfolioProject,
  Service,
  SiteSetting,
  Testimonial,
} from '@/payload-types'
import config from '@/payload.config'

export type ShellData = {
  navigation: Navigation | null
  siteSettings: SiteSetting | null
}

export type HomePageData = {
  home: Home | null
  projects: PortfolioProject[]
  services: Service[]
  testimonial: Testimonial | null
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object'

export const isResolvedRelationship = <T extends { id: number }>(
  value: number | T | null | undefined,
): value is T => isRecord(value) && typeof value.id === 'number'

export async function getShellData(): Promise<ShellData> {
  try {
    const payload = await getPayload({ config })

    const [siteSettings, navigation] = await Promise.all([
      payload.findGlobal({
        slug: 'site-settings',
        depth: 1,
        overrideAccess: false,
      }),
      payload.findGlobal({
        slug: 'navigation',
        depth: 1,
        overrideAccess: false,
      }),
    ])

    return { navigation, siteSettings }
  } catch {
    return {
      navigation: null,
      siteSettings: null,
    }
  }
}

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const payload = await getPayload({ config })

    const home = await payload.findGlobal({
      slug: 'home',
      depth: 2,
      overrideAccess: false,
    })

    const selectedProjects = (home.featuredProjects ?? []).filter(
      (project): project is PortfolioProject => isResolvedRelationship(project),
    )

    const selectedServices = (home.featuredServices ?? []).filter(
      (service): service is Service => isResolvedRelationship(service),
    )

    const selectedTestimonial = isResolvedRelationship(home.featuredTestimonial)
      ? home.featuredTestimonial
      : null

    const [projectResult, serviceResult, testimonialResult] = await Promise.all([
      selectedProjects.length
        ? null
        : payload.find({
            collection: 'portfolio-projects',
            depth: 2,
            limit: 3,
            overrideAccess: false,
            sort: 'sortOrder',
            where: {
              featured: {
                equals: true,
              },
            },
          }),
      selectedServices.length
        ? null
        : payload.find({
            collection: 'services',
            depth: 1,
            limit: 3,
            overrideAccess: false,
            sort: 'sortOrder',
            where: {
              featured: {
                equals: true,
              },
            },
          }),
      selectedTestimonial
        ? null
        : payload.find({
            collection: 'testimonials',
            depth: 1,
            limit: 1,
            overrideAccess: false,
            sort: 'sortOrder',
            where: {
              featured: {
                equals: true,
              },
            },
          }),
    ])

    return {
      home,
      projects: selectedProjects.length ? selectedProjects.slice(0, 3) : (projectResult?.docs ?? []),
      services: selectedServices.length ? selectedServices.slice(0, 3) : (serviceResult?.docs ?? []),
      testimonial: selectedTestimonial ?? testimonialResult?.docs[0] ?? null,
    }
  } catch {
    return {
      home: null,
      projects: [],
      services: [],
      testimonial: null,
    }
  }
}
