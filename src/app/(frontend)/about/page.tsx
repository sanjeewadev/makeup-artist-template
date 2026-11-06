import type { Metadata } from 'next'

import { CmsImage } from '@/components/media/CmsImage'
import { EditorialCTA } from '@/components/content/EditorialCTA'
import { Testimonials } from '@/components/content/Testimonials'
import { RichText } from '@/components/rich-text/RichText'
import { getAboutPageData } from '@/lib/business-data'
import type { Media } from '@/payload-types'

import styles from './about.module.css'

export const dynamic = 'force-dynamic'

const getMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getAboutPageData()

  return {
    description:
      about?.seo?.description ||
      about?.lead ||
      'Meet the makeup artist and discover the philosophy behind the work.',
    robots: about?.seo?.noIndex ? { follow: false, index: false } : undefined,
    title: about?.seo?.title || 'About',
  }
}

export default async function AboutPage() {
  const { about, siteSettings, testimonials } = await getAboutPageData()
  const portrait = getMedia(about?.portrait)
  const artistName = siteSettings?.artistName || siteSettings?.siteName || 'The artist'

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{about?.eyebrow || 'Behind the work'}</p>
          <h1>{about?.heading || 'Beauty with a personal point of view.'}</h1>
          <p className={styles.lead}>
            {about?.lead ||
              'A calm, detail-led approach to makeup that begins with listening and ends with a look that still feels entirely like you.'}
          </p>
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

      <section className={styles.story}>
        <p className={styles.sectionIndex}>01 / Story</p>
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
      </section>

      {about?.credentials?.length ? (
        <section className={styles.credentials}>
          <p className={styles.sectionIndex}>02 / Details</p>
          <div className={styles.credentialList}>
            {about.credentials.map((credential, index) => (
              <div className={styles.credential} key={credential.id || String(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{credential.title}</h2>
                {credential.detail && <p>{credential.detail}</p>}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <Testimonials items={testimonials} title="The experience, remembered." />

      <EditorialCTA
        body="If the approach feels right for you, share a little about the occasion and we can start with availability."
        eyebrow="Work together"
        href={about?.cta?.url || '/contact'}
        label={about?.cta?.label || 'Start an enquiry'}
        title="Let’s create something that feels like you."
      />
    </div>
  )
}
