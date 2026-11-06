import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CmsImage } from '@/components/media/CmsImage'
import { RichText } from '@/components/rich-text/RichText'
import { LinkButton } from '@/components/ui/LinkButton'
import { getJournalMedia, getJournalPostData } from '@/lib/journal-data'
import { getReadingTime } from '@/lib/reading-time'
import { absoluteURL, getSiteURL } from '@/lib/seo'
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
  const [{ post }, { siteSettings }] = await Promise.all([
    getJournalPostData(slug),
    getShellData(),
  ])

  if (!post) return { title: 'Journal article' }

  const seoImage = getJournalMedia(post.seo?.image) || getJournalMedia(post.featuredImage)
  const imageURL = absoluteURL(seoImage?.url)
  const canonicalPath = '/journal/' + post.slug
  const title = post.seo?.title || post.title
  const description = post.seo?.description || post.excerpt
  const artistName = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const tags = post.tags?.map((tag) => tag.label) || []

  return {
    alternates: {
      canonical: canonicalPath,
    },
    description,
    keywords: tags.length ? tags : undefined,
    openGraph: {
      authors: [artistName],
      description,
      images: imageURL ? [{ alt: seoImage?.alt || post.title, url: imageURL }] : undefined,
      modifiedTime: post.updatedAt,
      publishedTime: post.publishedAt || post.createdAt,
      tags: tags.length ? tags : undefined,
      title,
      type: 'article',
      url: canonicalPath,
    },
    robots: post.seo?.noIndex ? { follow: false, index: false } : undefined,
    title,
    twitter: {
      card: imageURL ? 'summary_large_image' : 'summary',
      description,
      images: imageURL ? [imageURL] : undefined,
      title,
    },
  }
}

export default async function JournalArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const [{ nextPost, post, relatedPosts }, { siteSettings }] = await Promise.all([
    getJournalPostData(slug),
    getShellData(),
  ])

  if (!post) notFound()

  const featuredImage = getJournalMedia(post.featuredImage)
  const nextImage = nextPost ? getJournalMedia(nextPost.featuredImage) : null
  const published = formatDate(post.publishedAt)
  const artistName = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const readingTime = getReadingTime(post.content)
  const canonicalURL = getSiteURL() + '/journal/' + post.slug
  const imageURL = absoluteURL(featuredImage?.url)
  const tags = post.tags?.map((tag) => tag.label) || []

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    author: {
      '@type': 'Person',
      name: artistName,
      url: getSiteURL() + '/about',
    },
    dateModified: post.updatedAt,
    datePublished: post.publishedAt || post.createdAt,
    description: post.seo?.description || post.excerpt,
    headline: post.seo?.title || post.title,
    image: imageURL ? [imageURL] : undefined,
    keywords: tags.length ? tags.join(', ') : undefined,
    mainEntityOfPage: canonicalURL,
    publisher: {
      '@type': 'Person',
      name: artistName,
      url: getSiteURL() + '/about',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        item: getSiteURL(),
        name: 'Home',
        position: 1,
      },
      {
        '@type': 'ListItem',
        item: getSiteURL() + '/journal',
        name: 'Journal',
        position: 2,
      },
      {
        '@type': 'ListItem',
        item: canonicalURL,
        name: post.title,
        position: 3,
      },
    ],
  }

  return (
    <article className={styles.page}>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]).replace(/</g, '\u003c'),
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
            <span>By {artistName}</span>
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
          <span>{readingTime} minute read</span>
          <Link href="/about">About the artist ↗</Link>
        </aside>

        <div className={styles.body}>
          <RichText data={post.content} />
        </div>
      </section>

      {relatedPosts.length ? (
        <section className={styles.related}>
          <div className={styles.relatedHeading}>
            <span>Related reading</span>
            <div>
              <h2>Continue with the same thread.</h2>
              <p>
                Stories connected by shared topics, practical questions, or the same part of the
                beauty experience.
              </p>
            </div>
          </div>

          <div className={styles.relatedGrid}>
            {relatedPosts.map((related, index) => {
              const image = getJournalMedia(related.featuredImage)

              return (
                <Link className={styles.relatedCard} href={'/journal/' + related.slug} key={related.id}>
                  <div className={styles.relatedImage}>
                    {image ? (
                      <CmsImage image={image} sizes="(max-width: 760px) 100vw, 33vw" />
                    ) : (
                      <div className={styles.placeholder} />
                    )}
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className={styles.relatedMeta}>
                    <span>{getReadingTime(related.content)} min read</span>
                    <h3>{related.title}</h3>
                    <p>{related.excerpt}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ) : null}

      <section className={styles.cta}>
        <p className={styles.eyebrow}>Planning an occasion?</p>
        <div>
          <h2>Turn the inspiration into something personal.</h2>
          <p>
            If you are planning a wedding, event, portrait, or editorial project, explore the
            service approach or share the details and start with availability.
          </p>
          <div className={styles.ctaActions}>
            <LinkButton href="/contact">Request availability</LinkButton>
            <LinkButton href="/services" variant="text">
              Explore services
            </LinkButton>
          </div>
        </div>
      </section>

      {nextPost && (
        <section className={styles.next}>
          <Link href={'/journal/' + nextPost.slug}>
            <div className={styles.nextCopy}>
              <p>Next in the Journal</p>
              <h2>{nextPost.title}</h2>
              <span>Continue reading ↗</span>
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
