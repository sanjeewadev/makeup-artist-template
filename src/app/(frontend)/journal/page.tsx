import type { Metadata } from 'next'
import Link from 'next/link'

import { JournalArchive } from '@/components/journal/JournalArchive'
import { CmsImage } from '@/components/media/CmsImage'
import { getJournalIndexData, getJournalMedia } from '@/lib/journal-data'
import { getReadingTime } from '@/lib/reading-time'

import styles from './journal.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: {
    canonical: '/journal',
  },
  description:
    'Beauty notes, artist perspectives, wedding guidance, preparation advice, and editorial stories from the studio.',
  openGraph: {
    description:
      'Beauty notes, artist perspectives, wedding guidance, preparation advice, and editorial stories from the studio.',
    title: 'Journal',
    type: 'website',
  },
  title: 'Journal',
  twitter: {
    card: 'summary',
    description:
      'Beauty notes, artist perspectives, wedding guidance, preparation advice, and editorial stories from the studio.',
    title: 'Journal',
  },
}

const formatDate = (value: string | null | undefined) => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default async function JournalPage() {
  const { featured, posts, topics } = await getJournalIndexData()

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.index}>Journal / Notes & stories</p>
        <div>
          <p className={styles.eyebrow}>From the studio</p>
          <h1>Beauty, beyond the finished look.</h1>
          <div className={styles.heroFooter}>
            <p className={styles.lead}>
              Practical guidance, thoughtful observations, and stories from weddings, editorials,
              preparation, and the work behind the work.
            </p>
            <div className={styles.heroMeta}>
              <span>{String(posts.length + (featured ? 1 : 0)).padStart(2, '0')} stories</span>
              <span>{String(topics.length).padStart(2, '0')} topics</span>
            </div>
          </div>
        </div>
      </header>

      {featured ? (
        <section className={styles.featured}>
          <Link className={styles.featuredLink} href={'/journal/' + featured.slug}>
            <div className={styles.featuredImage}>
              {getJournalMedia(featured.featuredImage) ? (
                <CmsImage
                  image={getJournalMedia(featured.featuredImage)}
                  priority
                  sizes="(max-width: 760px) 100vw, 58vw"
                />
              ) : (
                <div className={styles.placeholder} />
              )}
            </div>

            <div className={styles.featuredCopy}>
              <p className={styles.eyebrow}>Featured story</p>
              <h2>{featured.title}</h2>
              <p className={styles.excerpt}>{featured.excerpt}</p>
              <div className={styles.meta}>
                {formatDate(featured.publishedAt) && <span>{formatDate(featured.publishedAt)}</span>}
                <span>{getReadingTime(featured.content)} min read</span>
              </div>

              {featured.tags?.length ? (
                <div className={styles.featuredTags}>
                  {featured.tags.slice(0, 4).map((tag) => (
                    <span key={tag.id || tag.label}>{tag.label}</span>
                  ))}
                </div>
              ) : null}

              <span className={styles.readLink}>Read the story ↗</span>
            </div>
          </Link>
        </section>
      ) : (
        <section className={styles.empty}>
          <p className={styles.eyebrow}>Journal awaiting stories</p>
          <h2>The editorial space is ready.</h2>
          <p>
            Publish Journal posts in Payload and they will appear here automatically with
            photography, topics, metadata, and article pages.
          </p>
        </section>
      )}

      {posts.length ? (
        <section className={styles.archive}>
          <div className={styles.archiveHeading}>
            <p className={styles.index}>Editorial desk / 02</p>
            <div>
              <h2>Read by topic, not by noise.</h2>
              <p>
                Browse the complete Journal or narrow the edit to the subject that matters to you
                right now.
              </p>
            </div>
          </div>

          <JournalArchive posts={posts} topics={topics} />
        </section>
      ) : null}
    </div>
  )
}
