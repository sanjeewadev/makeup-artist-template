import Link from 'next/link'

import styles from './project.module.css'

export default function ProjectNotFound() {
  return (
    <section className={styles.story}>
      <p className={styles.sectionIndex}>Portfolio / 404</p>
      <div className={styles.storyContent}>
        <h1>That project is no longer available.</h1>
        <p>The portfolio may have been updated or this link may be out of date.</p>
        <Link href="/portfolio">Return to the portfolio →</Link>
      </div>
    </section>
  )
}
