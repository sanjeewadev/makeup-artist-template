'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import { CmsImage } from '@/components/media/CmsImage'
import type { JournalPost } from '@/payload-types'
import type { JournalTopic } from '@/lib/journal-data'
import { getJournalMedia } from '@/lib/journal-data'
import { getReadingTime } from '@/lib/reading-time'

import styles from './JournalArchive.module.css'

type JournalArchiveProps = {
  posts: JournalPost[]
  topics: JournalTopic[]
}

const topicSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const formatDate = (value: string | null | undefined) => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function JournalArchive({ posts, topics }: JournalArchiveProps) {
  const [activeTopic, setActiveTopic] = useState('all')

  const visiblePosts = useMemo(() => {
    if (activeTopic === 'all') return posts

    return posts.filter((post) =>
      post.tags?.some((tag) => topicSlug(tag.label) === activeTopic),
    )
  }, [activeTopic, posts])

  const activeLabel =
    activeTopic === 'all'
      ? 'All stories'
      : topics.find((topic) => topic.slug === activeTopic)?.label || 'Selected stories'

  return (
    <div className={styles.browser}>
      <div className={styles.topicBar} aria-label="Filter Journal stories by topic" role="group">
        <button
          aria-pressed={activeTopic === 'all'}
          onClick={() => setActiveTopic('all')}
          type="button"
        >
          All
          <span>{String(posts.length).padStart(2, '0')}</span>
        </button>

        {topics.map((topic) => (
          <button
            aria-pressed={activeTopic === topic.slug}
            key={topic.slug}
            onClick={() => setActiveTopic(topic.slug)}
            type="button"
          >
            {topic.label}
            <span>{String(topic.count).padStart(2, '0')}</span>
          </button>
        ))}
      </div>

      <div className={styles.context}>
        <span>Current desk</span>
        <h3>{activeLabel}</h3>
        <p>
          {activeTopic === 'all'
            ? 'Guidance, artist notes, preparation advice, and stories from the work behind the finished look.'
            : 'A focused edit of Journal stories connected by this topic.'}
        </p>
      </div>

      <div aria-live="polite" className={styles.grid} key={activeTopic}>
        {visiblePosts.map((post, index) => {
          const image = getJournalMedia(post.featuredImage)
          const published = formatDate(post.publishedAt)

          return (
            <article className={styles.card} key={post.id}>
              <Link href={'/journal/' + post.slug}>
                <div className={styles.image}>
                  {image ? (
                    <CmsImage
                      image={image}
                      sizes={
                        index % 5 === 0
                          ? '(max-width: 680px) 100vw, 50vw'
                          : '(max-width: 680px) 100vw, 32vw'
                      }
                    />
                  ) : (
                    <div className={styles.placeholder} />
                  )}
                  <span className={styles.readCue}>Read story ↗</span>
                </div>

                <div className={styles.meta}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {published && <span>{published}</span>}
                  <span>{getReadingTime(post.content)} min</span>
                </div>

                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>

                {post.tags?.length ? (
                  <div className={styles.tags}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag.id || tag.label}>{tag.label}</span>
                    ))}
                  </div>
                ) : null}
              </Link>
            </article>
          )
        })}
      </div>

      {!visiblePosts.length && (
        <div className={styles.empty}>
          <p>No published stories are currently assigned to this topic.</p>
        </div>
      )}
    </div>
  )
}
