import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CmsImage } from '@/components/media/CmsImage'
import { ProjectGallery } from '@/components/portfolio/ProjectGallery'
import { RichText } from '@/components/rich-text/RichText'
import { LinkButton } from '@/components/ui/LinkButton'
import { getPortfolioProjectPageData } from '@/lib/portfolio-data'
import { absoluteURL } from '@/lib/seo'
import type { Media, PortfolioCategory, PortfolioProject } from '@/payload-types'

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

const ProjectNavCard = ({
  direction,
  project,
}: {
  direction: 'Previous' | 'Next'
  project: PortfolioProject
}) => {
  const image = getMedia(project.heroImage)
  const category = getCategory(project.category)

  return (
    <Link className={styles.navCard} href={'/portfolio/' + project.slug}>
      <div className={styles.navImage}>
        {image ? <CmsImage image={image} sizes="(max-width: 760px) 100vw, 50vw" /> : null}
      </div>
      <div className={styles.navOverlay} />
      <div className={styles.navCopy}>
        <span>{direction} story</span>
        <small>{category?.title || 'Portfolio'}</small>
        <h3>{project.title}</h3>
        <strong>{direction === 'Previous' ? '←' : '↗'}</strong>
      </div>
    </Link>
  )
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const { project } = await getPortfolioProjectPageData(slug)

  if (!project) {
    return {
      title: 'Portfolio project',
    }
  }

  const canonicalPath = '/portfolio/' + project.slug
  const seoImage = getMedia(project.seo?.image) || getMedia(project.heroImage)
  const imageURL = absoluteURL(seoImage?.url)
  const title = project.seo?.title || project.title
  const description =
    project.seo?.description ||
    project.excerpt ||
    'A makeup artistry project from the portfolio.'

  return {
    alternates: {
      canonical: canonicalPath,
    },
    description,
    openGraph: {
      description,
      images: imageURL ? [{ alt: seoImage?.alt || project.title, url: imageURL }] : undefined,
      title,
      type: 'website',
      url: canonicalPath,
    },
    robots: project.seo?.noIndex ? { follow: false, index: false } : undefined,
    title,
    twitter: {
      card: imageURL ? 'summary_large_image' : 'summary',
      description,
      images: imageURL ? [imageURL] : undefined,
      title,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const { nextProject, position, previousProject, project, totalProjects } =
    await getPortfolioProjectPageData(slug)

  if (!project) notFound()

  const heroImage = getMedia(project.heroImage)
  const category = getCategory(project.category)
  const date = formatDate(project.eventDate)
  const galleryCount = project.gallery?.length || 0
  const projectPosition = position > 0 ? String(position).padStart(2, '0') : '01'
  const projectTotal = String(Math.max(totalProjects, 1)).padStart(2, '0')

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.heroNav}>
            <Link className={styles.backLink} href="/portfolio">
              ← Portfolio
            </Link>
            <span>
              Story {projectPosition} / {projectTotal}
            </span>
          </div>

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
            <div>
              <dt>Story</dt>
              <dd>{String(galleryCount + 1).padStart(2, '0')} frames</dd>
            </div>
          </dl>
        </div>

        <div className={styles.heroImage}>
          {heroImage ? (
            <CmsImage image={heroImage} priority sizes="(max-width: 760px) 100vw, 58vw" />
          ) : (
            <div className={styles.placeholder} />
          )}
          <div className={styles.heroImageMeta}>
            <span>{category?.title || 'Portfolio'}</span>
            <span>{project.location || 'Selected work'}</span>
          </div>
        </div>
      </header>

      {project.story && (
        <section className={styles.story}>
          <p className={styles.sectionIndex}>01 / Direction</p>
          <div className={styles.storyStage}>
            <div className={styles.storyContent}>
              <RichText data={project.story} />
            </div>

            <aside className={styles.storyRail}>
              <span>Project notes</span>
              <dl>
                <div>
                  <dt>Category</dt>
                  <dd>{category?.title || 'Portfolio'}</dd>
                </div>
                {project.location && (
                  <div>
                    <dt>Setting</dt>
                    <dd>{project.location}</dd>
                  </div>
                )}
                <div>
                  <dt>Image story</dt>
                  <dd>{String(galleryCount + 1).padStart(2, '0')} frames</dd>
                </div>
              </dl>
              {category?.description && <p>{category.description}</p>}
            </aside>
          </div>
        </section>
      )}

      {project.gallery?.length ? (
        <section className={styles.gallerySection}>
          <div className={styles.galleryHeading}>
            <p className={styles.sectionIndex}>02 / Visual study</p>
            <div>
              <p>
                A closer study of texture, skin, finish, preparation, and the small decisions that
                shape the complete look.
              </p>
              <span>
                {String(project.gallery.length).padStart(2, '0')} gallery frame
                {project.gallery.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>
          <ProjectGallery gallery={project.gallery} />
        </section>
      ) : null}

      <section className={styles.enquiry}>
        <p className={styles.sectionIndex}>03 / Your occasion</p>
        <div>
          <p className={styles.eyebrow}>Availability</p>
          <h2>Drawn to this kind of finish?</h2>
          <p>
            Share the date, location, and what you liked about this project. The enquiry can start
            from the feeling, texture, or level of polish you are drawn to.
          </p>
          <div className={styles.enquiryActions}>
            <LinkButton href="/contact">Start an enquiry</LinkButton>
            <LinkButton href="/services" variant="text">
              Explore services
            </LinkButton>
          </div>
        </div>
      </section>

      {(previousProject || nextProject) && (
        <section className={styles.projectNavigation}>
          <div className={styles.navigationHeading}>
            <span>04 / Continue the portfolio</span>
            <p>Move through the work as a sequence of complete beauty stories.</p>
          </div>

          <div className={styles.navigationGrid}>
            {previousProject && <ProjectNavCard direction="Previous" project={previousProject} />}
            {nextProject && <ProjectNavCard direction="Next" project={nextProject} />}
          </div>
        </section>
      )}
    </article>
  )
}
