import type { Metadata } from 'next'

import { PortfolioBrowser } from '@/components/portfolio/PortfolioBrowser'
import { getPortfolioIndexData } from '@/lib/portfolio-data'

import styles from './portfolio.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description:
    'A curated portfolio of bridal, editorial, occasion, and portrait makeup artistry.',
  title: 'Portfolio',
}

export default async function PortfolioPage() {
  const { categories, projects } = await getPortfolioIndexData()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.index}>Portfolio / Selected work</div>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Faces, light, detail</p>
          <h1>A study in beauty, in context.</h1>
          <div className={styles.leadRow}>
            <p>
              Bridal, editorial, and occasion work presented as complete stories rather than
              isolated looks.
            </p>
            <p className={styles.count}>
              {String(projects.length).padStart(2, '0')} published project
              {projects.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.browserSection}>
        <PortfolioBrowser categories={categories} projects={projects} />
      </section>

      <section className={styles.footerStatement}>
        <span>Every face is different.</span>
        <p>The work should feel personal before it feels polished.</p>
      </section>
    </div>
  )
}
