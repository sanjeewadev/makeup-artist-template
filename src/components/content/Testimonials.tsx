import { CmsImage } from '@/components/media/CmsImage'
import type { Media, Testimonial } from '@/payload-types'

import styles from './Testimonials.module.css'

type TestimonialsProps = {
  items: Testimonial[]
  title?: string
}

const getMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

export function Testimonials({ items, title = 'Kind words, quietly shared.' }: TestimonialsProps) {
  if (!items.length) return null

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p>Client notes</p>
        <h2>{title}</h2>
      </div>

      <div className={styles.list}>
        {items.map((testimonial, index) => {
          const portrait = getMedia(testimonial.portrait)

          return (
            <article className={styles.item} key={testimonial.id}>
              <div className={styles.number}>{String(index + 1).padStart(2, '0')}</div>
              <blockquote>“{testimonial.quote}”</blockquote>
              <div className={styles.person}>
                {portrait && (
                  <div className={styles.portrait}>
                    <CmsImage image={portrait} sizes="4rem" />
                  </div>
                )}
                <div>
                  <strong>{testimonial.clientName}</strong>
                  {testimonial.location && <span>{testimonial.location}</span>}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
