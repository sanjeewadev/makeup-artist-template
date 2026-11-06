import Link from 'next/link'

import { CmsImage } from '@/components/media/CmsImage'
import { LinkButton } from '@/components/ui/LinkButton'
import { richTextToPlainText } from '@/lib/rich-text'
import { getHomePageData, getShellData, isResolvedRelationship } from '@/lib/site-data'
import type { Media } from '@/payload-types'

import styles from './home.module.css'

export const dynamic = 'force-dynamic'

const fallbackProjects = [
  { category: 'Bridal', title: 'Softly sculpted' },
  { category: 'Editorial', title: 'Modern restraint' },
  { category: 'Occasion', title: 'Polished light' },
]

const fallbackServices = [
  {
    title: 'Bridal makeup',
    description:
      'A calm, considered beauty experience designed around skin, light, and the way you want to feel.',
  },
  {
    title: 'Editorial & campaign',
    description:
      'Camera-ready makeup with a clear point of view for portraits, fashion, brand, and creative work.',
  },
  {
    title: 'Events & occasion',
    description:
      'Refined, lasting makeup for celebrations, evenings, and moments worth remembering.',
  },
]

export default async function HomePage() {
  const [{ home, projects, services, testimonial }, { siteSettings }] = await Promise.all([
    getHomePageData(),
    getShellData(),
  ])

  const hero = home?.hero
  const heroImage = isResolvedRelationship<Media>(hero?.image) ? hero.image : null
  const siteName = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const introText = richTextToPlainText(home?.introduction?.body)

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroFrame}>
          <div className={styles.heroTopline}>
            <span>Independent makeup artistry</span>
            <span>Bridal / Editorial / Occasion</span>
          </div>

          <div className={styles.heroVisual + ' editorial-fade'}>
            {heroImage ? (
              <CmsImage image={heroImage} priority sizes="(max-width: 760px) 100vw, 62vw" />
            ) : (
              <div aria-label="Hero photography placeholder" className={styles.photoPlaceholder}>
                <span>Portrait / bridal photography</span>
              </div>
            )}
          </div>

          <div className={styles.heroCopy + ' editorial-rise'}>
            <p className={styles.eyebrow}>{hero?.eyebrow || 'Beauty / Artistry / Presence'}</p>
            <h1>{hero?.heading || 'Beauty, shaped with intention.'}</h1>
            <div className={styles.heroLower}>
              <p className={styles.heroLead}>
                {hero?.subheading ||
                  'Refined makeup for weddings, editorials, portraits, and modern celebrations—created to feel like you, only elevated.'}
              </p>

              <div className={styles.heroActions}>
                <LinkButton href={hero?.primaryCTA?.url || '/portfolio'}>
                  {hero?.primaryCTA?.label || 'View selected work'}
                </LinkButton>
                <LinkButton href="/contact" variant="text">
                  Check availability
                </LinkButton>
              </div>
            </div>
          </div>

          <div className={styles.heroSignature} aria-hidden="true">
            <span>Makeup</span>
            <span>Artistry</span>
          </div>

          <div className={styles.heroCaption}>
            <span>01 / Introduction</span>
            <span>{siteName}</span>
          </div>
        </div>
      </section>

      <section className={styles.manifesto}>
        <div className={styles.manifestoLabel}>
          <span>01</span>
          <span>{home?.introduction?.eyebrow || 'A quieter kind of luxury'}</span>
        </div>

        <div className={styles.manifestoCopy}>
          <h2>
            {home?.introduction?.heading ||
              'Makeup that reads beautifully in person and in photographs.'}
          </h2>
          <div className={styles.manifestoBody}>
            <p>
              {introText ||
                'The approach is skin-led, detail-conscious, and never overworked. Every look is shaped around the person, the setting, and the light—so the result feels timeless rather than trend-led.'}
            </p>
            <span aria-hidden="true">—</span>
          </div>
        </div>
      </section>

      <section className={styles.work}>
        <div className={styles.workHeading}>
          <div>
            <p className={styles.eyebrow}>Selected work / 02</p>
            <h2>
              Beauty
              <em> in context.</em>
            </h2>
          </div>
          <div className={styles.workAside}>
            <p>
              Complete looks, real light, and the small details that make a face still feel like
              itself.
            </p>
            <LinkButton href="/portfolio" variant="text">
              Explore the portfolio
            </LinkButton>
          </div>
        </div>

        {projects.length ? (
          <div className={styles.projectGrid}>
            {projects.slice(0, 3).map((project, index) => {
              const image = isResolvedRelationship<Media>(project.heroImage)
                ? project.heroImage
                : null
              const category =
                typeof project.category === 'object' && project.category
                  ? project.category.title
                  : 'Portfolio'

              return (
                <Link
                  className={styles.projectCard}
                  href={'/portfolio/' + project.slug}
                  key={project.id}
                >
                  <div className={styles.projectImage}>
                    {image ? (
                      <CmsImage
                        image={image}
                        sizes={
                          index === 0
                            ? '(max-width: 760px) 100vw, 58vw'
                            : '(max-width: 760px) 100vw, 32vw'
                        }
                      />
                    ) : (
                      <div className={styles.photoPlaceholder} />
                    )}
                  </div>
                  <div className={styles.projectMeta}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <p>{category}</p>
                      <h3>{project.title}</h3>
                    </div>
                    <strong aria-hidden="true">↗</strong>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className={styles.projectGrid}>
            {fallbackProjects.map((project, index) => (
              <div className={styles.projectCard} key={project.title}>
                <div
                  className={
                    styles.projectImage + ' ' + styles['placeholderTone' + String(index + 1)]
                  }
                >
                  <div className={styles.photoPlaceholder}>
                    <span>Add featured project photography in Payload</span>
                  </div>
                </div>
                <div className={styles.projectMeta}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p>{project.category}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <strong aria-hidden="true">↗</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.services}>
        <div className={styles.servicesInner}>
          <div className={styles.servicesIntro}>
            <div>
              <p className={styles.eyebrow}>The offering / 03</p>
              <h2>
                Considered artistry,
                <em> tailored to the moment.</em>
              </h2>
            </div>
          </div>

          <div className={styles.serviceList}>
            {(services.length ? services : fallbackServices).slice(0, 3).map((service, index) => {
              const isCMSService = 'id' in service
              const description = isCMSService ? service.shortDescription : service.description
              const title = service.title
              const href = isCMSService ? '/services#' + service.slug : '/services'
              const key = isCMSService ? String(service.id) : title

              return (
                <Link className={styles.serviceRow} href={href} key={key}>
                  <span className={styles.serviceNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span aria-hidden="true" className={styles.serviceArrow}>
                    ↗
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className={styles.statement}>
        <div className={styles.statementInner}>
          <p className={styles.eyebrow}>{testimonial ? 'Client note / 04' : 'The experience / 04'}</p>
          <blockquote>
            {testimonial
              ? '“' + testimonial.quote + '”'
              : '“Calm preparation. Thoughtful detail. Makeup that still feels like you.”'}
          </blockquote>
          <div className={styles.statementFoot}>
            <span>
              {testimonial
                ? testimonial.clientName + (testimonial.location ? ' — ' + testimonial.location : '')
                : 'From first conversation to final look'}
            </span>
            <span aria-hidden="true">Beauty / Presence / Detail</span>
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={styles.closingIndex}>
          <span>05</span>
          <span>{home?.closingCTA?.eyebrow || 'Now booking'}</span>
        </div>

        <div className={styles.closingContent}>
          <h2>{home?.closingCTA?.heading || 'Planning something beautiful?'}</h2>
          <div className={styles.closingBottom}>
            <p>
              {home?.closingCTA?.body ||
                'Share the date, location, and kind of occasion you are planning. We’ll take it from there.'}
            </p>
            <LinkButton href={home?.closingCTA?.url || '/contact'}>
              {home?.closingCTA?.label || 'Start an enquiry'}
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  )
}
