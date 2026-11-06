import type { Metadata } from 'next'
import Link from 'next/link'

import { CmsImage } from '@/components/media/CmsImage'
import { getJournalIndexData, getJournalMedia } from '@/lib/journal-data'
import { getReadingTime } from '@/lib/reading-time'

import styles from './journal.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description:
    'Beauty notes, artist perspectives, wedding guidance, and editorial stories from the studio.',
  title: 'Journal',
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
  const { featured, posts } = await getJournalIndexData()

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.index}>Journal / Notes & stories</p>
        <div>
          <p className={styles.eyebrow}>From the studio</p>
          <h1>Beauty, beyond the finished look.</h1>
          <p className={styles.lead}>
            Practical guidance, thoughtful observations, and stories from weddings, editorials,
            and the work behind the work.
          </p>
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
            photography, tags, metadata, and article pages.
          </p>
        </section>
      )}

      {posts.length ? (
        <section className={styles.archive}>
          <div className={styles.archiveHeading}>
            <p className={styles.index}>Archive</p>
            <h2>More from the journal.</h2>
          </div>

          <div className={styles.grid}>
            {posts.map((post, index) => {
              const image = getJournalMedia(post.featuredImage)

              return (
                <article className={styles.card} key={post.id}>
                  <Link href={'/journal/' + post.slug}>
                    <div className={styles.cardImage}>
                      {image ? (
                        <CmsImage
                          image={image}
                          sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw"
                        />
                      ) : (
                        <div className={styles.placeholder} />
                      )}
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        {formatDate(post.publishedAt) && <span>{formatDate(post.publishedAt)}</span>}
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
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        </section>
      ) : null}
    </div>
  )
}
