import type { Metadata } from 'next'

import { EnquiryForm } from '@/components/contact/EnquiryForm'
import { LinkButton } from '@/components/ui/LinkButton'
import { getContactPageData } from '@/lib/business-data'
import { makeTelURL, makeWhatsAppURL } from '@/lib/contact'

import styles from './contact.module.css'

export const dynamic = 'force-dynamic'

type ContactPageProps = {
  searchParams: Promise<{
    service?: string
  }>
}

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getContactPageData()

  return {
    description:
      contact?.seo?.description ||
      contact?.intro ||
      'Request makeup availability and share the details of your wedding, event, or editorial project.',
    robots: contact?.seo?.noIndex ? { follow: false, index: false } : undefined,
    title: contact?.seo?.title || 'Contact',
  }
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [{ service }, { contact, services, siteSettings }] = await Promise.all([
    searchParams,
    getContactPageData(),
  ])

  const email = siteSettings?.contact?.email
  const phone = siteSettings?.contact?.phone
  const whatsapp = makeWhatsAppURL(
    siteSettings?.contact?.whatsapp,
    'Hello, I would like to ask about makeup availability.',
  )
  const tel = makeTelURL(phone)
  const serviceArea = siteSettings?.contact?.serviceArea
  const initialServiceSlug = services.some((item) => item.slug === service)
    ? service
    : undefined

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.index}>Contact / Availability</p>
        <div>
          <p className={styles.eyebrow}>{contact?.eyebrow || 'Let’s begin'}</p>
          <h1>{contact?.heading || 'Tell me what you’re planning.'}</h1>
          <p className={styles.lead}>
            {contact?.intro ||
              'Share the date, location, service, and a little about the occasion. This first message is simply to check availability and understand what you need.'}
          </p>
        </div>
      </header>

      <section className={styles.contactGrid}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarIntro}>
            <p>Direct contact</p>
            <h2>Prefer a conversation first?</h2>
          </div>

          <div className={styles.contactMethods}>
            {email && (
              <a href={'mailto:' + email}>
                <span>Email</span>
                <strong>{email}</strong>
              </a>
            )}
            {tel && phone && (
              <a href={tel}>
                <span>Phone</span>
                <strong>{phone}</strong>
              </a>
            )}
            {serviceArea && (
              <div>
                <span>Service area</span>
                <strong>{serviceArea}</strong>
              </div>
            )}
          </div>

          {whatsapp && (
            <LinkButton href={whatsapp} variant="outline">
              Message on WhatsApp
            </LinkButton>
          )}

          {contact?.availabilityNote && (
            <p className={styles.note}>{contact.availabilityNote}</p>
          )}
          {contact?.responseTime && (
            <p className={styles.response}>{contact.responseTime}</p>
          )}
        </aside>

        <div className={styles.formArea}>
          <div className={styles.formHeading}>
            <p>Availability enquiry</p>
            <h2>{contact?.enquiryHeading || 'Share the details.'}</h2>
          </div>

          <EnquiryForm
            initialServiceSlug={initialServiceSlug}
            services={services}
            successMessage={
              contact?.successMessage ||
              'Your enquiry is safely in. I’ll review the details and reply as soon as possible.'
            }
          />
        </div>
      </section>

      <section className={styles.closing}>
        <p>Before you send</p>
        <div>
          <h2>No pressure, no instant booking.</h2>
          <p>
            An enquiry opens the conversation. Availability, timing, final pricing, and any
            booking details are confirmed personally afterward.
          </p>
        </div>
      </section>
    </div>
  )
}
