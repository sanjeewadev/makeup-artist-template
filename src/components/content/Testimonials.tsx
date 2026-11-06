import { CmsImage } from '@/components/media/CmsImage'
import type { Media, Service, Testimonial } from '@/payload-types'

import styles from './Testimonials.module.css'

type TestimonialsProps = {
  items: Testimonial[]
  title?: string
}

const getMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

const getService = (value: number | Service | null | undefined): Service | null =>
  value && typeof value === 'object' && 'title' in value ? value : null

export function Testimonials({ items, title = 'Kind words, quietly shared.' }: TestimonialsProps) {
  if (!items.length) return null

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p>Client notes</p>
        <div>
          <h2>{title}</h2>
          <span>{String(items.length).padStart(2, '0')} selected reflections</span>
        </div>
      </div>

      <div className={styles.list}>
        {items.map((testimonial, index) => {
          const portrait = getMedia(testimonial.portrait)
          const service = getService(testimonial.service)

          return (
            <article className={styles.item} key={testimonial.id}>
              <div className={styles.number}>{String(index + 1).padStart(2, '0')}</div>

              <div className={styles.quoteBlock}>
                <blockquote>“{testimonial.quote}”</blockquote>
                {(service || testimonial.location) && (
                  <div className={styles.context}>
                    {service && <span>{service.title}</span>}
                    {testimonial.location && <span>{testimonial.location}</span>}
                  </div>
                )}
              </div>

              <div className={styles.person}>
                {portrait && (
                  <div className={styles.portrait}>
                    <CmsImage image={portrait} sizes="4rem" />
                  </div>
                )}
                <div>
                  <strong>{testimonial.clientName}</strong>
                  <span>{service?.title || 'Client note'}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
