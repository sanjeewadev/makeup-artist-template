import { cache } from 'react'
import { getPayload } from 'payload'

import type { About, Contact, Service, SiteSetting, Testimonial } from '@/payload-types'
import config from '@/payload.config'

export type ServicesPageData = {
  services: Service[]
  testimonials: Testimonial[]
}

export type AboutPageData = {
  about: About | null
  siteSettings: SiteSetting | null
  testimonials: Testimonial[]
}

export type ContactPageData = {
  contact: Contact | null
  services: Service[]
  siteSettings: SiteSetting | null
}

export const getServicesPageData = cache(async (): Promise<ServicesPageData> => {
  try {
    const payload = await getPayload({ config })

    const [services, testimonials] = await Promise.all([
      payload.find({
        collection: 'services',
        depth: 2,
        limit: 100,
        overrideAccess: false,
        sort: 'sortOrder',
      }),
      payload.find({
        collection: 'testimonials',
        depth: 2,
        limit: 6,
        overrideAccess: false,
        sort: 'sortOrder',
      }),
    ])

    return {
      services: services.docs,
      testimonials: testimonials.docs,
    }
  } catch {
    return {
      services: [],
      testimonials: [],
    }
  }
})

export const getAboutPageData = cache(async (): Promise<AboutPageData> => {
  try {
    const payload = await getPayload({ config })

    const [about, siteSettings, testimonials] = await Promise.all([
      payload.findGlobal({
        slug: 'about',
        depth: 2,
        overrideAccess: false,
      }),
      payload.findGlobal({
        slug: 'site-settings',
        depth: 1,
        overrideAccess: false,
      }),
      payload.find({
        collection: 'testimonials',
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
    ])

    return {
      about,
      siteSettings,
      testimonials: testimonials.docs,
    }
  } catch {
    return {
      about: null,
      siteSettings: null,
      testimonials: [],
    }
  }
})

export const getContactPageData = cache(async (): Promise<ContactPageData> => {
  try {
    const payload = await getPayload({ config })

    const [contact, services, siteSettings] = await Promise.all([
      payload.findGlobal({
        slug: 'contact',
        depth: 1,
        overrideAccess: false,
      }),
      payload.find({
        collection: 'services',
        depth: 0,
        limit: 100,
        overrideAccess: false,
        sort: 'sortOrder',
      }),
      payload.findGlobal({
        slug: 'site-settings',
        depth: 1,
        overrideAccess: false,
      }),
    ])

    return {
      contact,
      services: services.docs,
      siteSettings,
    }
  } catch {
    return {
      contact: null,
      services: [],
      siteSettings: null,
    }
  }
})
