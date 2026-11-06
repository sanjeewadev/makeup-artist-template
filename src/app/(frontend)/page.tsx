import Link from 'next/link'

import { CmsImage } from '@/components/media/CmsImage'
import { LinkButton } from '@/components/ui/LinkButton'
import { demoHeroImage } from '@/lib/demo-content'
import { getReadingTime } from '@/lib/reading-time'
import { richTextToPlainText } from '@/lib/rich-text'
import { getHomePageData, getShellData, isResolvedRelationship } from '@/lib/site-data'
import type { Media, Service } from '@/payload-types'

import styles from './home.module.css'

export const dynamic = 'force-dynamic'

const formatJournalDate = (value: string | null | undefined) => {
  if (!value) return null

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export default async function HomePage() {
  const [
    { about, home, journalPosts, projects, services, testimonial, testimonials },
    { siteSettings },
  ] = await Promise.all([getHomePageData(), getShellData()])

  const hero = home?.hero
  const heroImage = isResolvedRelationship<Media>(hero?.image) ? hero.image : demoHeroImage
  const siteName = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const serviceArea = siteSettings?.contact?.serviceArea || 'Sri Lanka'
  const introText = richTextToPlainText(home?.introduction?.body)
  const artistPortrait = isResolvedRelationship<Media>(about?.portrait) ? about.portrait : null

  const testimonialService = (value: number | Service | null | undefined) =>
    value && typeof value === 'object' && 'title' in value ? value : null

  const signatureProject = projects[0] || null
  const signatureHero =
    signatureProject && isResolvedRelationship<Media>(signatureProject.heroImage)
      ? signatureProject.heroImage
      : null
  const signatureDetail =
    signatureProject?.gallery?.find((item) => isResolvedRelationship<Media>(item.image))?.image || null
  const resolvedSignatureDetail = isResolvedRelationship<Media>(signatureDetail)
    ? signatureDetail
    : null

  const heroAccent =
    projects
      .slice(1)
      .flatMap((project) => project.gallery || [])
      .map((item) => (isResolvedRelationship<Media>(item.image) ? item.image : null))
      .find((image): image is Media => Boolean(image)) || signatureHero

  const essayImages = projects
    .slice(1, 5)
    .map((project, index) => {
      const galleryItem = project.gallery?.[index] || project.gallery?.[0]
      const galleryImage =
        galleryItem && isResolvedRelationship<Media>(galleryItem.image)
          ? galleryItem.image
          : null
      const heroFallback = isResolvedRelationship<Media>(project.heroImage)
        ? project.heroImage
        : null

      return galleryImage || heroFallback
    })
    .filter((image): image is Media => Boolean(image))
    .slice(0, 3)

  const selectedProjects = signatureProject ? projects.slice(1, 5) : projects.slice(0, 4)
  const leadService = services[0] || null
  const leadServiceImage =
    leadService && isResolvedRelationship<Media>(leadService.image) ? leadService.image : null

  const closingImage =
    projects
      .slice()
      .reverse()
      .map((project) =>
        isResolvedRelationship<Media>(project.heroImage) ? project.heroImage : null,
      )
      .find((image): image is Media => Boolean(image)) || heroImage

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroFrame}>
          <div className={styles.heroTopline}>
            <span>Independent makeup artistry</span>
            <span>{serviceArea}</span>
          </div>

          <div className={styles.heroVisual + ' editorial-fade'}>
            <CmsImage image={heroImage} priority sizes="(max-width: 760px) 100vw, 62vw" />
          </div>

          {heroAccent && (
            <div className={styles.heroAccent} aria-hidden="true">
              <CmsImage image={heroAccent} sizes="(max-width: 760px) 34vw, 16vw" />
            </div>
          )}

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
            <span>00 / Introduction</span>
            <span>{siteName}</span>
          </div>
        </div>
      </section>

      <section className={styles.manifesto}>
        <div className={styles.sectionIndex}>
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
            <span aria-hidden="true">Beauty / without excess</span>
          </div>
        </div>
      </section>

      {signatureProject && signatureHero && (
        <section className={styles.signatureStory}>
          <div className={styles.signatureBackdrop}>
            <CmsImage image={signatureHero} sizes="100vw" />
          </div>

          <div className={styles.signatureShade} />

          <div className={styles.signatureInner}>
            <div className={styles.signatureTop}>
              <span>02 / Signature story</span>
              <span>
                {typeof signatureProject.category === 'object'
                  ? signatureProject.category.title
                  : 'Portfolio'}
              </span>
            </div>

            <div className={styles.signatureCopy}>
              <p>Selected work</p>
              <h2>{signatureProject.title}</h2>
              <span>{signatureProject.excerpt}</span>
              <LinkButton href={'/portfolio/' + signatureProject.slug} variant="outline">
                Enter the story
              </LinkButton>
            </div>

            {resolvedSignatureDetail && (
              <figure className={styles.signatureInset}>
                <div>
                  <CmsImage
                    image={resolvedSignatureDetail}
                    sizes="(max-width: 760px) 44vw, 20vw"
                  />
                </div>
                <figcaption>
                  <span>Detail study</span>
                  <span>01</span>
                </figcaption>
              </figure>
            )}
          </div>
        </section>
      )}

      {essayImages.length >= 2 && (
        <section className={styles.imageEssay} aria-label="Beauty photography study">
          <div className={styles.imageEssayLead}>
            <div className={styles.sectionIndex}>
              <span>03</span>
              <span>In the details</span>
            </div>
            <p>
              Skin. Gesture. Preparation. The quiet details that make the finished portrait feel
              complete.
            </p>
          </div>

          <div className={styles.imageEssayGrid}>
            {essayImages.map((image, index) => (
              <figure className={styles.imageEssayFigure} key={image.id}>
                <div className={styles.imageEssayFrame}>
                  <CmsImage
                    image={image}
                    sizes={
                      index === 0
                        ? '(max-width: 760px) 100vw, 56vw'
                        : '(max-width: 760px) 100vw, 28vw'
                    }
                  />
                </div>
                <figcaption>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{index === 0 ? 'Preparation' : index === 1 ? 'Portrait' : 'Detail'}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className={styles.work}>
        <div className={styles.workHeading}>
          <div>
            <p className={styles.eyebrow}>Portfolio / 04</p>
            <h2>
              Selected
              <em> beauty stories.</em>
            </h2>
          </div>
          <div className={styles.workAside}>
            <p>
              Not isolated looks, but complete visual stories—preparation, skin, portrait, detail,
              and the atmosphere around the finished work.
            </p>
            <LinkButton href="/portfolio" variant="text">
              Explore all work
            </LinkButton>
          </div>
        </div>

        <div className={styles.projectGrid}>
          {selectedProjects.map((project, index) => {
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
                  {image && (
                    <CmsImage
                      image={image}
                      sizes={
                        index === 0 || index === 3
                          ? '(max-width: 760px) 100vw, 55vw'
                          : '(max-width: 760px) 100vw, 32vw'
                      }
                    />
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
      </section>

      <section className={styles.services}>
        <div className={styles.servicesInner}>
          <div className={styles.servicesIntro}>
            <div className={styles.sectionIndex}>
              <span>05</span>
              <span>The experience</span>
            </div>
            <div>
              <p className={styles.eyebrow}>The offering</p>
              <h2>
                Considered artistry,
                <em> tailored to the moment.</em>
              </h2>
            </div>
          </div>

          <div className={styles.servicesStage}>
            {leadServiceImage && (
              <div className={styles.serviceVisual}>
                <CmsImage image={leadServiceImage} sizes="(max-width: 760px) 100vw, 42vw" />
                <span>Preparation / presence / finish</span>
              </div>
            )}

            <div className={styles.serviceList}>
              {services.slice(0, 4).map((service, index) => (
                <Link className={styles.serviceRow} href={'/services#' + service.slug} key={service.id}>
                  <span className={styles.serviceNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.shortDescription}</p>
                  </div>
                  <span aria-hidden="true" className={styles.serviceArrow}>
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.serviceFooter}>
            <p>
              From a wedding morning to a close beauty frame, the process changes with the
              occasion. The standard does not.
            </p>
            <LinkButton href="/services" variant="outline">
              View services
            </LinkButton>
          </div>
        </div>
      </section>

      {about && artistPortrait && (
        <section className={styles.artist}>
          <div className={styles.artistFrame}>
            <div className={styles.artistImage}>
              <CmsImage image={artistPortrait} sizes="(max-width: 760px) 100vw, 48vw" />
            </div>

            <div className={styles.artistCopy}>
              <div className={styles.sectionIndex}>
                <span>06</span>
                <span>Behind the work</span>
              </div>
              <p className={styles.eyebrow}>{about.eyebrow || 'The artist'}</p>
              <h2>{about.heading || 'Beauty with a personal point of view.'}</h2>
              <p className={styles.artistLead}>
                {about.lead ||
                  'A calm, detail-led approach to makeup that begins with listening and ends with a look that still feels entirely like you.'}
              </p>

              {about.credentials?.length ? (
                <div className={styles.artistCredentials}>
                  {about.credentials.slice(0, 3).map((credential, index) => (
                    <div key={credential.id || credential.title}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{credential.title}</strong>
                    </div>
                  ))}
                </div>
              ) : null}

              <LinkButton href="/about" variant="text">
                Meet the artist
              </LinkButton>
            </div>
          </div>
        </section>
      )}

      <section className={styles.voices}>
        <div className={styles.voicesHeading}>
          <div className={styles.sectionIndex}>
            <span>07</span>
            <span>Client notes</span>
          </div>
          <h2>The experience should be remembered as much as the finished look.</h2>
        </div>

        <div className={styles.voiceGrid}>
          {(testimonials.length ? testimonials : testimonial ? [testimonial] : [])
            .slice(0, 3)
            .map((item, index) => {
              const portrait = isResolvedRelationship<Media>(item.portrait) ? item.portrait : null
              const service = testimonialService(item.service)

              return (
                <article className={styles.voice} key={item.id}>
                  <span className={styles.voiceNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <blockquote>“{item.quote}”</blockquote>
                  <div className={styles.voicePerson}>
                    {portrait && (
                      <div className={styles.voicePortrait}>
                        <CmsImage image={portrait} sizes="4rem" />
                      </div>
                    )}
                    <div>
                      <strong>{item.clientName}</strong>
                      <span>
                        {[service?.title, item.location].filter(Boolean).join(' / ') || 'Client note'}
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
        </div>
      </section>

      {journalPosts.length ? (
        <section className={styles.journal}>
          <div className={styles.journalHeading}>
            <div className={styles.sectionIndex}>
              <span>08</span>
              <span>From the journal</span>
            </div>
            <div>
              <h2>Beauty, beyond the finished look.</h2>
              <LinkButton href="/journal" variant="text">
                Read the journal
              </LinkButton>
            </div>
          </div>

          <div className={styles.journalGrid}>
            {journalPosts.slice(0, 3).map((post, index) => {
              const image = isResolvedRelationship<Media>(post.featuredImage)
                ? post.featuredImage
                : null

              return (
                <article className={styles.journalCard} key={post.id}>
                  <Link href={'/journal/' + post.slug}>
                    <div className={styles.journalImage}>
                      {image && (
                        <CmsImage
                          image={image}
                          sizes="(max-width: 760px) 100vw, 33vw"
                        />
                      )}
                    </div>
                    <div className={styles.journalMeta}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {formatJournalDate(post.publishedAt) && (
                        <span>{formatJournalDate(post.publishedAt)}</span>
                      )}
                      <span>{getReadingTime(post.content)} min</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </Link>
                </article>
              )
            })}
          </div>
        </section>
      ) : null}

      <section className={styles.closing}>
        <div className={styles.closingVisual}>
          <CmsImage image={closingImage} sizes="100vw" />
        </div>
        <div className={styles.closingShade} />

        <div className={styles.closingInner}>
          <div className={styles.closingTopline}>
            <span>09 / Availability</span>
            <span>{serviceArea}</span>
          </div>

          <div className={styles.closingContent}>
            <p>{home?.closingCTA?.eyebrow || 'Now booking'}</p>
            <h2>{home?.closingCTA?.heading || 'Planning something beautiful?'}</h2>
            <span>
              {home?.closingCTA?.body ||
                'Share the date, location, and kind of occasion you are planning. We’ll take it from there.'}
            </span>
            <LinkButton href={home?.closingCTA?.url || '/contact'} variant="outline">
              {home?.closingCTA?.label || 'Start an enquiry'}
            </LinkButton>
          </div>

          <div className={styles.closingFoot}>
            <span>{siteName}</span>
            <span>Bridal / Editorial / Occasion</span>
          </div>
        </div>
      </section>
    </div>
  )
}
