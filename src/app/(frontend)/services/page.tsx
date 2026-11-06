import type { Metadata } from 'next'
import Link from 'next/link'

import { EditorialCTA } from '@/components/content/EditorialCTA'
import { Testimonials } from '@/components/content/Testimonials'
import { CmsImage } from '@/components/media/CmsImage'
import { RichText } from '@/components/rich-text/RichText'
import { LinkButton } from '@/components/ui/LinkButton'
import { getServicesPageData } from '@/lib/business-data'
import type { Media } from '@/payload-types'

import styles from './services.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description:
    'Bridal, engagement, editorial, occasion, and bespoke makeup services with a refined consultation-led approach.',
  title: 'Services',
}

const getMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

const faqs = [
  {
    question: 'How do I know which service is right for me?',
    answer:
      'Start with the occasion rather than the package name. Share the date, location, number of people, and the kind of finish you are drawn to. The artist can then confirm which service fits the brief.',
  },
  {
    question: 'Does sending an enquiry confirm my booking?',
    answer:
      'No. An enquiry checks availability and opens the conversation. Timing, scope, final pricing, and any booking steps are confirmed personally afterward.',
  },
  {
    question: 'When should I enquire?',
    answer:
      'As soon as the date and general location are known. Popular wedding and event dates can fill early, while editorial and portrait work may be arranged on a shorter lead time depending on availability.',
  },
  {
    question: 'What should I include in my first message?',
    answer:
      'The most useful details are your date, location or venue, approximate number of people, the service or occasion, and a short note about the look or feeling you want.',
  },
  {
    question: 'Are the prices shown final?',
    answer:
      'Price labels are a guide to the service format. The final scope is confirmed personally because travel, timing, group size, and the nature of the brief can change what is required.',
  },
]

export default async function ServicesPage() {
  const { services, siteSettings, testimonials } = await getServicesPageData()
  const serviceArea = siteSettings?.contact?.serviceArea || 'Available by enquiry'

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.index}>Services / The offering</p>
        <div>
          <p className={styles.eyebrow}>A considered approach</p>
          <h1>Beauty services shaped around the person, not a formula.</h1>
          <div className={styles.heroFooter}>
            <p className={styles.lead}>
              From wedding mornings to editorial sets, every service is designed around the
              occasion, the light, the skin, and how you want to feel.
            </p>
            <div className={styles.heroMeta}>
              <span>{String(services.length).padStart(2, '0')} services</span>
              <span>{serviceArea}</span>
            </div>
          </div>
        </div>
      </header>

      {services.length ? (
        <>
          <section className={styles.finder} id="service-finder">
            <div className={styles.finderHeading}>
              <div>
                <span>01 / Find your service</span>
                <h2>Begin with the occasion.</h2>
              </div>
              <p>
                You do not need to know the exact package before enquiring. Use this as a guide,
                then share the real details and the artist can confirm the best fit.
              </p>
            </div>

            <div className={styles.finderGrid}>
              {services.slice(0, 5).map((service, index) => {
                const image = getMedia(service.image)

                return (
                  <Link className={styles.finderCard} href={'#' + service.slug} key={service.id}>
                    <div className={styles.finderImage}>
                      {image ? (
                        <CmsImage image={image} sizes="(max-width: 760px) 48vw, 18vw" />
                      ) : (
                        <div className={styles.placeholder} />
                      )}
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <div className={styles.finderCopy}>
                      <h3>{service.title}</h3>
                      <p>{service.shortDescription}</p>
                      <div>
                        {service.durationLabel && <span>{service.durationLabel}</span>}
                        {service.priceLabel && <span>{service.priceLabel}</span>}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

          <section className={styles.process}>
            <div className={styles.processHeading}>
              <span>02 / What happens next</span>
              <h2>A clear process, without the hard sell.</h2>
            </div>

            <div className={styles.processGrid}>
              {[
                ['01', 'Share the brief', 'Send the date, location, people involved, and the kind of occasion or visual direction you have in mind.'],
                ['02', 'Check availability', 'The enquiry is reviewed against the diary and the practical details of the service you need.'],
                ['03', 'Confirm the details', 'If the date and scope align, timing, service format, pricing, and any next steps are confirmed personally.'],
                ['04', 'Prepare with confidence', 'Once confirmed, you know what to expect and can arrive with the right timing, references, and preparation in place.'],
              ].map(([number, title, body]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.list}>
            <div className={styles.listHeading}>
              <span>03 / Service stories</span>
              <p>Each service is presented in more detail below. Choose by context, not by pressure.</p>
            </div>

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
                    <div className={styles.imageLabel}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span>{service.title}</span>
                    </div>
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

                    <div className={styles.serviceAction}>
                      <p>
                        Ready to check this service against your date, location, and timing?
                      </p>
                      <LinkButton href={'/contact?service=' + encodeURIComponent(service.slug)}>
                        Enquire about this service
                      </LinkButton>
                    </div>
                  </div>
                </article>
              )
            })}
          </section>

          <section className={styles.preparation}>
            <div className={styles.preparationHeading}>
              <span>04 / A useful first message</span>
              <h2>The right details make the first reply much more useful.</h2>
            </div>

            <div className={styles.preparationGrid}>
              <article>
                <span>01</span>
                <h3>Date + location</h3>
                <p>Share the date and the venue, city, or approximate location if it is already known.</p>
              </article>
              <article>
                <span>02</span>
                <h3>People + timing</h3>
                <p>Tell us roughly how many people need makeup and any important ready-by time.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Look + feeling</h3>
                <p>References are welcome, but describing how you want the finished look to feel is just as useful.</p>
              </article>
            </div>
          </section>

          <section className={styles.faq}>
            <div className={styles.faqHeading}>
              <span>05 / Before you enquire</span>
              <h2>Simple answers to the practical questions.</h2>
            </div>

            <div className={styles.faqList}>
              {faqs.map((item, index) => (
                <details key={item.question}>
                  <summary>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{item.question}</strong>
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </>
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
        body="Tell me the date, location, number of people, and the kind of occasion you are planning. If you are unsure which service fits, that is completely fine."
        eyebrow="Private consultation"
        href="/contact"
        label="Request availability"
        title="Begin with what you know."
      />
    </div>
  )
}
