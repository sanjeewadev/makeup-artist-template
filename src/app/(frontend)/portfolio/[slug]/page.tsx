import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CmsImage } from '@/components/media/CmsImage'
import { ProjectGallery } from '@/components/portfolio/ProjectGallery'
import { RichText } from '@/components/rich-text/RichText'
import { LinkButton } from '@/components/ui/LinkButton'
import { getPortfolioProjectPageData } from '@/lib/portfolio-data'
import type { Media, PortfolioCategory } from '@/payload-types'

import styles from './project.module.css'

export const dynamic = 'force-dynamic'

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

const getMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

const getCategory = (
  value: number | PortfolioCategory | null | undefined,
): PortfolioCategory | null =>
  value && typeof value === 'object' && 'title' in value ? value : null

const formatDate = (value: string | null | undefined) => {
  if (!value) return null

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const { project } = await getPortfolioProjectPageData(slug)

  if (!project) {
    return {
      title: 'Portfolio project',
    }
  }

  return {
    description:
      project.seo?.description ||
      project.excerpt ||
      'A makeup artistry project from the portfolio.',
    robots: project.seo?.noIndex ? { follow: false, index: false } : undefined,
    title: project.seo?.title || project.title,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const { nextProject, project } = await getPortfolioProjectPageData(slug)

  if (!project) notFound()

  const heroImage = getMedia(project.heroImage)
  const category = getCategory(project.category)
  const date = formatDate(project.eventDate)
  const nextImage = nextProject ? getMedia(nextProject.heroImage) : null
  const nextCategory = nextProject ? getCategory(nextProject.category) : null

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <Link className={styles.backLink} href="/portfolio">
            ← Portfolio
          </Link>
          <p className={styles.eyebrow}>{category?.title || 'Portfolio project'}</p>
          <h1>{project.title}</h1>
          {project.excerpt && <p className={styles.excerpt}>{project.excerpt}</p>}

          <dl className={styles.details}>
            {project.clientName && (
              <div>
                <dt>Project</dt>
                <dd>{project.clientName}</dd>
              </div>
            )}
            {project.location && (
              <div>
                <dt>Location</dt>
                <dd>{project.location}</dd>
              </div>
            )}
            {date && (
              <div>
                <dt>Date</dt>
                <dd>{date}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className={styles.heroImage}>
          {heroImage ? (
            <CmsImage image={heroImage} priority sizes="(max-width: 760px) 100vw, 58vw" />
          ) : (
            <div className={styles.placeholder} />
          )}
        </div>
      </header>

      {project.story && (
        <section className={styles.story}>
          <p className={styles.sectionIndex}>01 / The story</p>
          <div className={styles.storyContent}>
            <RichText data={project.story} />
          </div>
        </section>
      )}

      {project.gallery?.length ? (
        <section className={styles.gallerySection}>
          <div className={styles.galleryHeading}>
            <p className={styles.sectionIndex}>02 / Details</p>
            <p>
              A closer study of texture, skin, finish, and the small decisions that shape the
              complete look.
            </p>
          </div>
          <ProjectGallery gallery={project.gallery} />
        </section>
      ) : null}

      <section className={styles.enquiry}>
        <p className={styles.sectionIndex}>03 / Your occasion</p>
        <div>
          <p className={styles.eyebrow}>Availability</p>
          <h2>Planning a look of your own?</h2>
          <p>
            Share the date, location, and the kind of makeup experience you are looking for.
          </p>
          <LinkButton href="/contact">Start an enquiry</LinkButton>
        </div>
      </section>

      {nextProject && (
        <section className={styles.nextProject}>
          <Link href={'/portfolio/' + nextProject.slug}>
            <div className={styles.nextCopy}>
              <p>Next project</p>
              <span>{nextCategory?.title || 'Portfolio'}</span>
              <h2>{nextProject.title}</h2>
              <strong>View project ↗</strong>
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
