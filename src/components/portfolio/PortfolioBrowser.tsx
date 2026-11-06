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

      <div
        aria-live="polite"
        className={styles.grid}
        key={activeCategory}
      >
        {visibleProjects.map((project, index) => (
          <Link
            className={styles.card}
            href={'/portfolio/' + project.slug}
            key={project.id}
          >
            <div className={styles.imageFrame}>
              {project.image?.url ? (
                <Image
                  alt={project.image.alt}
                  className={styles.image}
                  fill
                  priority={activeCategory === 'all' && index < 2}
                  sizes={
                    index % 5 === 0
                      ? '(max-width: 720px) 100vw, 58vw'
                      : '(max-width: 720px) 100vw, 34vw'
                  }
                  src={project.image.url}
                />
              ) : (
                <div aria-hidden="true" className={styles.placeholder} />
              )}

              <div className={styles.overlay}>
                <span>View project</span>
                <span aria-hidden="true">↗</span>
              </div>
            </div>

            <div className={styles.meta}>
              <div>
                <p>{project.categoryTitle}</p>
                <h2>{project.title}</h2>
              </div>
              <div className={styles.metaSide}>
                {project.location && <span>{project.location}</span>}
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
