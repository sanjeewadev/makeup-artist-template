import type { Metadata } from 'next'
import Link from 'next/link'

import { CmsImage } from '@/components/media/CmsImage'
import { PortfolioBrowser } from '@/components/portfolio/PortfolioBrowser'
import { LinkButton } from '@/components/ui/LinkButton'
import { getPortfolioIndexData } from '@/lib/portfolio-data'

import styles from './portfolio.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description:
    'A curated portfolio of bridal, editorial, engagement, and occasion makeup artistry presented as complete visual stories.',
  title: 'Portfolio',
}

export default async function PortfolioPage() {
  const { categories, featuredProject, projects } = await getPortfolioIndexData()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.index}>Portfolio / Selected work</div>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Faces, light, detail</p>
          <h1>
            A study in beauty, <em>in context.</em>
          </h1>
          <div className={styles.leadRow}>
            <p>
              Bridal, editorial, engagement, and occasion work presented as complete stories—
              preparation, portrait, texture, atmosphere, and the decisions behind the finished
              look.
            </p>
            <p className={styles.count}>
              {String(projects.length).padStart(2, '0')} published project
              {projects.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>
      </section>

      {featuredProject?.image && (
        <section className={styles.coverStory}>
          <div className={styles.coverMain}>
            <CmsImage
              image={featuredProject.image}
              priority
              sizes="(max-width: 760px) 100vw, 68vw"
            />
          </div>

          <div className={styles.coverCopy}>
            <div className={styles.coverTopline}>
              <span>01 / Portfolio cover</span>
              <span>{featuredProject.categoryTitle}</span>
            </div>

            <div className={styles.coverTitle}>
              <p>Featured story</p>
              <h2>{featuredProject.title}</h2>
              {featuredProject.excerpt && <span>{featuredProject.excerpt}</span>}
            </div>

            <div className={styles.coverMeta}>
              <div>
                <span>Location</span>
                <strong>{featuredProject.location || 'Studio / on location'}</strong>
              </div>
              <div>
                <span>Year</span>
                <strong>{featuredProject.year || 'Selected work'}</strong>
              </div>
              <div>
                <span>Story</span>
                <strong>
                  {String(featuredProject.galleryCount + 1).padStart(2, '0')} frames
                </strong>
              </div>
            </div>

            <LinkButton href={'/portfolio/' + featuredProject.slug}>Enter the story</LinkButton>
          </div>

          {featuredProject.secondaryImage && (
            <Link
              aria-label={'Open ' + featuredProject.title}
              className={styles.coverInset}
              href={'/portfolio/' + featuredProject.slug}
            >
              <CmsImage image={featuredProject.secondaryImage} sizes="(max-width: 760px) 35vw, 18vw" />
              <span>Detail / 01</span>
            </Link>
          )}
        </section>
      )}

      <section className={styles.browserSection}>
        <div className={styles.browserIntro}>
          <span>02 / The archive</span>
          <p>Browse by occasion or move through the work as one continuous beauty edit.</p>
        </div>
        <PortfolioBrowser categories={categories} projects={projects} />
      </section>

      <section className={styles.footerStatement}>
        <span>Every face is different.</span>
        <div>
          <p>
            The work should feel <em>personal</em> before it feels polished.
          </p>
          <LinkButton href="/contact" variant="text">
            Discuss your occasion
          </LinkButton>
        </div>
      </section>
    </div>
  )
}
