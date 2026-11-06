import type { Metadata } from 'next'

import { CmsImage } from '@/components/media/CmsImage'
import { EditorialCTA } from '@/components/content/EditorialCTA'
import { Testimonials } from '@/components/content/Testimonials'
import { RichText } from '@/components/rich-text/RichText'
import { LinkButton } from '@/components/ui/LinkButton'
import { getServicesPageData } from '@/lib/business-data'
import type { Media } from '@/payload-types'

import styles from './services.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description:
    'Bridal, editorial, occasion, and bespoke makeup services presented with a refined, personal approach.',
  title: 'Services',
}

const getMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

export default async function ServicesPage() {
  const { services, testimonials } = await getServicesPageData()

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.index}>Services / The offering</p>
        <div>
          <p className={styles.eyebrow}>A considered approach</p>
          <h1>Beauty services shaped around the person, not a formula.</h1>
          <p className={styles.lead}>
            From wedding mornings to editorial sets, every service is designed around the
            occasion, the light, the skin, and how you want to feel.
          </p>
        </div>
      </header>

      {services.length ? (
        <section className={styles.list}>
          {services.map((service, index) => {
            const image = getMedia(service.image)

            return (
              <article className={styles.service} id={service.slug} key={service.id}>
                <div className={styles.imageWrap}>
                  {image ? (
                    <CmsImage
                      image={image}
                      sizes="(max-width: 760px) 100vw, 46vw"
                    />
                  ) : (
                    <div className={styles.placeholder} />
                  )}
                </div>

                <div className={styles.copy}>
                  <div className={styles.serviceMeta}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {service.durationLabel && <span>{service.durationLabel}</span>}
                    {service.priceLabel && <span>{service.priceLabel}</span>}
                  </div>
                  <h2>{service.title}</h2>
                  <p className={styles.shortDescription}>{service.shortDescription}</p>
                  {service.description && <RichText data={service.description} />}
                  <LinkButton href={'/contact?service=' + encodeURIComponent(service.slug)}>
                    Enquire about this service
                  </LinkButton>
                </div>
              </article>
            )
          })}
        </section>
      ) : (
        <section className={styles.empty}>
          <p>Services awaiting publication</p>
          <h2>The page is ready for the artist’s service offering.</h2>
          <span>
            Publish Services in Payload and each one will appear here automatically with
            photography, pricing notes, duration, and enquiry links.
          </span>
        </section>
      )}

      <Testimonials items={testimonials} />

      <EditorialCTA
        body="Tell me the date, location, and kind of occasion you are planning. I’ll help you choose the right service from there."
        eyebrow="Not sure what to book?"
        href="/contact"
        label="Start an enquiry"
        title="Begin with the occasion."
      />
    </div>
  )
}
