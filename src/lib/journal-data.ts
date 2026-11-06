import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import type { JournalPost, Media } from '@/payload-types'
import config from '@/payload.config'

export type JournalIndexData = {
  featured: JournalPost | null
  posts: JournalPost[]
  preview: boolean
}

export type JournalPostData = {
  nextPost: JournalPost | null
  post: JournalPost | null
  preview: boolean
}

export const getJournalMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

const previewState = async () => {
  const draft = await draftMode()
  return draft.isEnabled
}

export const getJournalIndexData = cache(async (): Promise<JournalIndexData> => {
  const preview = await previewState()

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'journal-posts',
      depth: 2,
      draft: preview,
      limit: 100,
      overrideAccess: preview,
      sort: '-publishedAt',
    })

    const featured = result.docs.find((post) => post.featured) || result.docs[0] || null
    const posts = featured
      ? result.docs.filter((post) => post.id !== featured.id)
      : result.docs

    return { featured, posts, preview }
  } catch {
    return { featured: null, posts: [], preview }
  }
})

export const getJournalPostData = cache(async (slug: string): Promise<JournalPostData> => {
  const preview = await previewState()

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'journal-posts',
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

    const post = result.docs[0] || null

    if (!post) {
      return { nextPost: null, post: null, preview }
    }

    const all = await payload.find({
      collection: 'journal-posts',
      depth: 1,
      draft: preview,
      limit: 100,
      overrideAccess: preview,
      sort: '-publishedAt',
    })

    const currentIndex = all.docs.findIndex((item) => item.id === post.id)
    const nextPost =
      all.docs.length > 1
        ? all.docs[(currentIndex + 1) % all.docs.length] || null
        : null

    return {
      nextPost: nextPost?.id === post.id ? null : nextPost,
      post,
      preview,
    }
  } catch {
    return { nextPost: null, post: null, preview }
  }
})
