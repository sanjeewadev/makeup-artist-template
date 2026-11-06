'use client'

import Image from 'next/image'
import Link from 'next/link'
import { startTransition, useMemo, useState } from 'react'

import type { PortfolioCardData, PortfolioFilterData } from '@/lib/portfolio-data'

import styles from './PortfolioBrowser.module.css'

type PortfolioBrowserProps = {
  categories: PortfolioFilterData[]
  projects: PortfolioCardData[]
}

export function PortfolioBrowser({ categories, projects }: PortfolioBrowserProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const visibleProjects = useMemo(
    () =>
      activeCategory === 'all'
        ? projects
        : projects.filter((project) => project.categorySlug === activeCategory),
    [activeCategory, projects],
  )

  const activeContext = useMemo(() => {
    if (activeCategory === 'all') {
      return {
        description:
          'A complete edit of bridal, editorial, engagement, and occasion work—each project treated as a full visual story rather than a single finished face.',
        title: 'All stories',
      }
    }

    const category = categories.find((item) => item.slug === activeCategory)

    return {
      description:
        category?.description ||
        'A focused edit from the portfolio, curated around the occasion and the visual language of the work.',
      title: category?.title || 'Selected work',
    }
  }, [activeCategory, categories])

  const setFilter = (slug: string) => {
    startTransition(() => {
      setActiveCategory(slug)
    })
  }

  if (!projects.length) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyEyebrow}>Portfolio awaiting work</p>
        <h2>The gallery is ready for the artist’s first collection.</h2>
        <p>
          Publish portfolio projects in Payload and they will appear here automatically with
          category filtering and editorial image treatment.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div aria-label="Filter portfolio projects" className={styles.filters} role="group">
        <button
          aria-pressed={activeCategory === 'all'}
          className={activeCategory === 'all' ? styles.activeFilter : undefined}
          onClick={() => setFilter('all')}
          type="button"
        >
          All
          <span>{String(projects.length).padStart(2, '0')}</span>
        </button>

        {categories.map((category) => {
          const count = projects.filter(
            (project) => project.categorySlug === category.slug,
          ).length

          if (!count) return null

          return (
            <button
              aria-pressed={activeCategory === category.slug}
              className={activeCategory === category.slug ? styles.activeFilter : undefined}
              key={category.slug}
              onClick={() => setFilter(category.slug)}
              type="button"
            >
              {category.title}
              <span>{String(count).padStart(2, '0')}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.activeContext} key={'context-' + activeCategory}>
        <div>
          <span>Current edit</span>
          <h2>{activeContext.title}</h2>
        </div>
        <p>{activeContext.description}</p>
        <strong>
          {String(visibleProjects.length).padStart(2, '0')} stor
          {visibleProjects.length === 1 ? 'y' : 'ies'}
        </strong>
      </div>

      <div aria-live="polite" className={styles.grid} key={activeCategory}>
        {visibleProjects.map((project, index) => (
          <Link className={styles.card} href={'/portfolio/' + project.slug} key={project.id}>
            <div className={styles.imageFrame}>
              {project.image?.url ? (
                <Image
                  alt={project.image.alt}
                  className={styles.image}
                  fill
                  priority={activeCategory === 'all' && index < 2}
                  sizes={
                    index % 6 === 0 || index % 6 === 4
                      ? '(max-width: 720px) 100vw, 58vw'
                      : '(max-width: 720px) 100vw, 34vw'
                  }
                  src={project.image.url}
                />
              ) : (
                <div aria-hidden="true" className={styles.placeholder} />
              )}

              <div className={styles.overlay}>
                <span>View story</span>
                <span aria-hidden="true">↗</span>
              </div>

              <div className={styles.imageIndex}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{String(project.galleryCount + 1).padStart(2, '0')} frames</span>
              </div>
            </div>

            <div className={styles.meta}>
              <div className={styles.metaMain}>
                <p>{project.categoryTitle}</p>
                <h3>{project.title}</h3>
                {project.excerpt && <span className={styles.excerpt}>{project.excerpt}</span>}
              </div>
              <div className={styles.metaSide}>
                {project.year && <span>{project.year}</span>}
                {project.location && <span>{project.location}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
