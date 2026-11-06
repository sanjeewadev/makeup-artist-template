import type { Metadata } from 'next'
import Link from 'next/link'

import { EditorialCTA } from '@/components/content/EditorialCTA'
import { Testimonials } from '@/components/content/Testimonials'
import { CmsImage } from '@/components/media/CmsImage'
import { RichText } from '@/components/rich-text/RichText'
import { LinkButton } from '@/components/ui/LinkButton'
import { getAboutPageData } from '@/lib/business-data'
import { absoluteURL } from '@/lib/seo'
import type { Media } from '@/payload-types'

import styles from './about.module.css'

export const dynamic = 'force-dynamic'

const getMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

const isExternal = (url: string) => /^https?:\/\//i.test(url)

export async function generateMetadata(): Promise<Metadata> {
  const { about, siteSettings } = await getAboutPageData()
  const seoImage = getMedia(about?.seo?.image) || getMedia(about?.portrait)
  const imageURL = absoluteURL(seoImage?.url)
  const title = about?.seo?.title || 'About'
  const description =
    about?.seo?.description ||
    about?.lead ||
    siteSettings?.shortDescription ||
    'Meet the makeup artist and discover the philosophy behind the work.'

  return {
    alternates: {
      canonical: '/about',
    },
    description,
    openGraph: {
      description,
      images: imageURL ? [{ alt: seoImage?.alt || title, url: imageURL }] : undefined,
      title,
      type: 'profile',
      url: '/about',
    },
    robots: about?.seo?.noIndex ? { follow: false, index: false } : undefined,
    title,
    twitter: {
      card: imageURL ? 'summary_large_image' : 'summary',
      description,
      images: imageURL ? [imageURL] : undefined,
      title,
    },
  }
}

export default async function AboutPage() {
  const { about, projects, services, siteSettings, testimonials } = await getAboutPageData()
  const portrait = getMedia(about?.portrait)
  const artistName = siteSettings?.artistName || siteSettings?.siteName || 'The artist'
  const tagline = siteSettings?.tagline
  const shortDescription = siteSettings?.shortDescription
  const serviceArea = siteSettings?.contact?.serviceArea
  const email = siteSettings?.contact?.email
  const socialLinks = siteSettings?.socialLinks ?? []

  const visualProjects = projects
    .map((project) => ({
      ...project,
      resolvedImage: getMedia(project.heroImage),
    }))
    .filter((project) => Boolean(project.resolvedImage))
    .slice(0, 3)

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.copy}>
          <div className={styles.heroIndex}>
            <span>About / Artist profile</span>
            <span>{serviceArea || 'Available by enquiry'}</span>
          </div>

          <p className={styles.eyebrow}>{about?.eyebrow || 'Behind the work'}</p>
          <h1>{about?.heading || 'Beauty with a personal point of view.'}</h1>
          <p className={styles.lead}>
            {about?.lead ||
              'A calm, detail-led approach to makeup that begins with listening and ends with a look that still feels entirely like you.'}
          </p>

          <div className={styles.heroIdentity}>
            <span>{artistName}</span>
            <p>{tagline || 'Makeup artistry / bridal / editorial / occasion'}</p>
          </div>
        </div>

        <div className={styles.portrait}>
          {portrait ? (
            <CmsImage image={portrait} priority sizes="(max-width: 760px) 100vw, 46vw" />
          ) : (
            <div className={styles.placeholder}>
              <span>Artist portrait</span>
            </div>
          )}
          <p>
            <span>Makeup artist</span>
            <span>{artistName}</span>
          </p>
        </div>
      </header>

      <section className={styles.trustStrip}>
        <div>
          <span>01</span>
          <strong>Personal approach</strong>
          <p>{shortDescription || 'Beauty work shaped around the person, the setting, and the light.'}</p>
        </div>
        {serviceArea && (
          <div>
            <span>02</span>
            <strong>Working across</strong>
            <p>{serviceArea}</p>
          </div>
        )}
        {email && (
          <div>
            <span>03</span>
            <strong>Direct enquiry</strong>
            <p>{email}</p>
          </div>
        )}
        {socialLinks[0] && (
          <div>
            <span>04</span>
            <strong>Follow the work</strong>
            <a href={socialLinks[0].url} rel="noreferrer" target="_blank">
              {socialLinks[0].label || socialLinks[0].platform} ↗
            </a>
          </div>
        )}
      </section>

      <section className={styles.story}>
        <p className={styles.sectionIndex}>01 / Point of view</p>
        <div className={styles.storyStage}>
          <div className={styles.storyContent}>
            {about?.story ? (
              <RichText data={about.story} />
            ) : (
              <>
                <h2>Technique matters. So does the way the experience feels.</h2>
                <p>
                  The work is approached with care, restraint, and respect for the person in the
                  chair. The aim is not to cover or transform for the sake of it, but to make every
                  detail feel intentional.
                </p>
              </>
            )}
          </div>

          <aside className={styles.storyAside}>
            <span>Practice / notes</span>
            <p>
              The strongest beauty work is not only about the finished photograph. It is also about
              listening well, preparing carefully, and making the person in the chair feel
              understood.
            </p>
            <LinkButton href="/services" variant="text">
              Explore the approach
            </LinkButton>
          </aside>
        </div>
      </section>

      {visualProjects.length ? (
        <section className={styles.proof}>
          <div className={styles.proofHeading}>
            <span>02 / Work in context</span>
            <div>
              <h2>The point of view is visible in the work.</h2>
              <p>
                Portraits, preparation, texture, and atmosphere—selected projects that show how the
                approach changes with the person and the occasion.
              </p>
            </div>
          </div>

          <div className={styles.proofGrid}>
            {visualProjects.map((project, index) => (
              <Link className={styles.proofCard} href={'/portfolio/' + project.slug} key={project.id}>
                <div className={styles.proofImage}>
                  <CmsImage
                    image={project.resolvedImage as Media}
                    sizes={
                      index === 0
                        ? '(max-width: 760px) 100vw, 50vw'
                        : '(max-width: 760px) 100vw, 28vw'
                    }
                  />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className={styles.proofMeta}>
                  <p>
                    {typeof project.category === 'object' && project.category
                      ? project.category.title
                      : 'Portfolio'}
                  </p>
                  <h3>{project.title}</h3>
                  <span>View story ↗</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {about?.credentials?.length ? (
        <section className={styles.credentials}>
          <p className={styles.sectionIndex}>03 / Why this practice</p>
          <div>
            <div className={styles.credentialsHeading}>
              <span>Credibility should be specific, not decorative.</span>
              <h2>Details that support the work.</h2>
            </div>

            <div className={styles.credentialList}>
              {about.credentials.map((credential, index) => (
                <div className={styles.credential} key={credential.id || String(index)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{credential.title}</h3>
                  {credential.detail && <p>{credential.detail}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={styles.practice}>
        <div className={styles.practiceHeading}>
          <span>04 / The practice</span>
          <h2>Different occasions. One standard of attention.</h2>
        </div>

        <div className={styles.practiceGrid}>
          <div className={styles.practiceServices}>
            <p>Services</p>
            {services.slice(0, 5).map((service, index) => (
              <Link href={'/services#' + service.slug} key={service.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{service.title}</strong>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>

          <div className={styles.practiceContact}>
            <p>Working together</p>
            <h3>Start with the date, the place, and how you want it to feel.</h3>
            <span>
              You do not need a perfect brief. The first enquiry is simply a way to check
              availability and understand what the occasion needs.
            </span>
            <LinkButton href="/contact">Request availability</LinkButton>
          </div>
        </div>
      </section>

      {socialLinks.length ? (
        <section className={styles.social}>
          <div className={styles.socialHeading}>
            <span>05 / Follow the work</span>
            <p>For recent faces, behind-the-scenes moments, and the work between full portfolio stories.</p>
          </div>

          <div className={styles.socialLinks}>
            {socialLinks.map((social, index) => (
              <a
                href={social.url}
                key={social.platform + '-' + social.url}
                rel={isExternal(social.url) ? 'noreferrer' : undefined}
                target={isExternal(social.url) ? '_blank' : undefined}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{social.label || social.platform}</strong>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <Testimonials items={testimonials} title="The experience, remembered." />

      <EditorialCTA
        body="If the approach feels right for you, share the date, location, and a little about what you are planning. The first step is simply checking availability."
        eyebrow="Work together"
        href={about?.cta?.url || '/contact'}
        label={about?.cta?.label || 'Request availability'}
        title="The work should feel personal before it feels polished."
      />
    </div>
  )
}
