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
  const selectedService = services.find((item) => item.slug === service)
  const initialServiceSlug = selectedService?.slug

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.index}>Contact / Availability</p>
        <div>
          <p className={styles.eyebrow}>{contact?.eyebrow || 'Private consultation'}</p>
          <h1>{contact?.heading || 'Tell me what you’re planning.'}</h1>
          <div className={styles.heroFooter}>
            <p className={styles.lead}>
              {contact?.intro ||
                'Share the date, location, service, and a little about the occasion. This first message is simply to check availability and understand what you need.'}
            </p>
            <div className={styles.heroMeta}>
              <span>4-part enquiry brief</span>
              {serviceArea && <span>{serviceArea}</span>}
            </div>
          </div>
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

          <div className={styles.nextSteps}>
            <p>After you send</p>
            <ol>
              <li>
                <span>01</span>
                <strong>Availability is checked.</strong>
              </li>
              <li>
                <span>02</span>
                <strong>The service and timing are clarified.</strong>
              </li>
              <li>
                <span>03</span>
                <strong>Pricing and next steps are confirmed personally.</strong>
              </li>
            </ol>
          </div>
        </aside>

        <div className={styles.formArea}>
          <div className={styles.formHeading}>
            <p>Availability enquiry</p>
            <h2>{contact?.enquiryHeading || 'Share the details.'}</h2>
            {selectedService && (
              <div className={styles.selectedService}>
                <span>Starting with</span>
                <div>
                  <strong>{selectedService.title}</strong>
                  <p>{selectedService.shortDescription}</p>
                  <div>
                    {selectedService.durationLabel && <span>{selectedService.durationLabel}</span>}
                    {selectedService.priceLabel && <span>{selectedService.priceLabel}</span>}
                  </div>
                </div>
                <a href="/services">Review services ↗</a>
              </div>
            )}
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
        <div className={styles.closingCopy}>
          <h2>No pressure, no instant booking.</h2>
          <p>
            An enquiry opens the conversation. Availability, timing, final pricing, and any
            booking details are confirmed personally afterward.
          </p>

          <div className={styles.closingNotes}>
            <div>
              <span>01</span>
              <strong>Estimates are okay.</strong>
              <p>You do not need every timeline detail finalized before asking about availability.</p>
            </div>
            <div>
              <span>02</span>
              <strong>You can be undecided.</strong>
              <p>If you are unsure which service fits, choose “Not sure yet” and describe the occasion.</p>
            </div>
            <div>
              <span>03</span>
              <strong>References can come later.</strong>
              <p>The first message only needs enough context to understand the date, scope, and direction.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
