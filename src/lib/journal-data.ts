import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import type { JournalPost, Media } from '@/payload-types'
import config from '@/payload.config'
import { demoJournalPosts } from '@/lib/demo-content'

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

    const source = result.docs.length ? result.docs : demoJournalPosts
    const featured = source.find((post) => post.featured) || source[0] || null
    const posts = featured ? source.filter((post) => post.id !== featured.id) : source

    return { featured, posts, preview }
  } catch {
    const featured = demoJournalPosts.find((post) => post.featured) || demoJournalPosts[0] || null
    const posts = featured
      ? demoJournalPosts.filter((post) => post.id !== featured.id)
      : demoJournalPosts
    return { featured, posts, preview }
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

    const post = result.docs[0] || demoJournalPosts.find((item) => item.slug === slug) || null

    if (!post) {
      return { nextPost: null, post: null, preview }
    }

    if (post.id < 0) {
      const demoIndex = demoJournalPosts.findIndex((item) => item.id === post.id)
      const nextPost =
        demoJournalPosts.length > 1
          ? demoJournalPosts[(demoIndex + 1) % demoJournalPosts.length] || null
          : null

      return {
        nextPost: nextPost?.id === post.id ? null : nextPost,
        post,
        preview,
      }
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
    const demoIndex = demoJournalPosts.findIndex((item) => item.slug === slug)
    const post = demoIndex >= 0 ? demoJournalPosts[demoIndex] : null
    const nextPost =
      post && demoJournalPosts.length > 1
        ? demoJournalPosts[(demoIndex + 1) % demoJournalPosts.length] || null
        : null

    return {
      nextPost: nextPost?.id === post?.id ? null : nextPost,
      post,
      preview,
    }
  }
})
