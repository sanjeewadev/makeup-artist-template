import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CmsImage } from '@/components/media/CmsImage'
import { RichText } from '@/components/rich-text/RichText'
import { LinkButton } from '@/components/ui/LinkButton'
import { getJournalMedia, getJournalPostData } from '@/lib/journal-data'
import { getReadingTime } from '@/lib/reading-time'
import { getShellData } from '@/lib/site-data'

import styles from './article.module.css'

export const dynamic = 'force-dynamic'

type ArticlePageProps = {
  params: Promise<{
    slug: string
  }>
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

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const { post } = await getJournalPostData(slug)

  if (!post) return { title: 'Journal article' }

  const seoImage = getJournalMedia(post.seo?.image) || getJournalMedia(post.featuredImage)

  return {
    description: post.seo?.description || post.excerpt,
    openGraph: {
      description: post.seo?.description || post.excerpt,
      images: seoImage?.url ? [{ alt: seoImage.alt, url: seoImage.url }] : undefined,
      title: post.seo?.title || post.title,
      type: 'article',
    },
    robots: post.seo?.noIndex ? { follow: false, index: false } : undefined,
    title: post.seo?.title || post.title,
  }
}

export default async function JournalArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const [{ nextPost, post }, { siteSettings }] = await Promise.all([
    getJournalPostData(slug),
    getShellData(),
  ])

  if (!post) notFound()

  const featuredImage = getJournalMedia(post.featuredImage)
  const nextImage = nextPost ? getJournalMedia(nextPost.featuredImage) : null
  const published = formatDate(post.publishedAt)
  const artistName = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const readingTime = getReadingTime(post.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    author: {
      '@type': 'Person',
      name: artistName,
    },
    dateModified: post.updatedAt,
    datePublished: post.publishedAt || post.createdAt,
    description: post.seo?.description || post.excerpt,
    headline: post.seo?.title || post.title,
    image: featuredImage?.url ? [featuredImage.url] : undefined,
  }

  return (
    <article className={styles.page}>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
        type="application/ld+json"
      />

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <Link className={styles.back} href="/journal">
            ← Journal
          </Link>
          <p className={styles.eyebrow}>Journal / Story</p>
          <h1>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.meta}>
            {published && <span>{published}</span>}
            <span>{readingTime} min read</span>
            {post._status === 'draft' && <span>Draft preview</span>}
          </div>

          {post.tags?.length ? (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag.id || tag.label}>{tag.label}</span>
              ))}
            </div>
          ) : null}
        </div>

        <div className={styles.heroImage}>
          {featuredImage ? (
            <CmsImage
              image={featuredImage}
              priority
              sizes="(max-width: 760px) 100vw, 54vw"
            />
          ) : (
            <div className={styles.placeholder} />
          )}
        </div>
      </header>

      <section className={styles.article}>
        <aside>
          <p>Written by</p>
          <strong>{artistName}</strong>
          {published && <span>{published}</span>}
        </aside>

        <div className={styles.body}>
          <RichText data={post.content} />
        </div>
      </section>

      <section className={styles.cta}>
        <p className={styles.eyebrow}>Planning an occasion?</p>
        <div>
          <h2>Turn the inspiration into something personal.</h2>
          <p>
            If you are planning a wedding, event, portrait, or editorial project, share the
            details and start with availability.
          </p>
          <LinkButton href="/contact">Start an enquiry</LinkButton>
        </div>
      </section>

      {nextPost && (
        <section className={styles.next}>
          <Link href={'/journal/' + nextPost.slug}>
            <div className={styles.nextCopy}>
              <p>Continue reading</p>
              <h2>{nextPost.title}</h2>
              <span>Next story ↗</span>
            </div>
            <div className={styles.nextImage}>
              {nextImage ? (
                <CmsImage image={nextImage} sizes="(max-width: 760px) 100vw, 42vw" />
              ) : (
                <div className={styles.placeholder} />
              )}
            </div>
          </Link>
        </section>
      )}
    </article>
  )
}
