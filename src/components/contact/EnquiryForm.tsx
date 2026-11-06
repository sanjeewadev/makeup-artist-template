'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import type { Service } from '@/payload-types'
import {
  submitEnquiry,
  type EnquiryFormState,
} from '@/app/(frontend)/contact/actions'

import styles from './EnquiryForm.module.css'

type EnquiryFormProps = {
  initialServiceSlug?: string
  services: Service[]
  successMessage: string
}

const initialState: EnquiryFormState = {}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button className={styles.submit} disabled={pending} type="submit">
      <span>{pending ? 'Sending enquiry…' : 'Request availability'}</span>
      <span aria-hidden="true">↗</span>
    </button>
  )
}

export function EnquiryForm({
  initialServiceSlug,
  services,
  successMessage,
}: EnquiryFormProps) {
  const [state, formAction] = useActionState(submitEnquiry, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  if (state.success) {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successLabel}>Enquiry received</p>
        <h2>Thank you.</h2>
        <p>{successMessage}</p>
        <a href="/contact">Send another enquiry</a>
      </div>
    )
  }

  const errorFor = (field: keyof NonNullable<EnquiryFormState['fieldErrors']>) =>
    state.fieldErrors?.[field]

  return (
    <form action={formAction} className={styles.form} noValidate ref={formRef}>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
      </div>

      <div className={styles.twoColumn}>
        <div className={styles.field}>
          <label htmlFor="name">Your name *</label>
          <input
            aria-describedby={errorFor('name') ? 'name-error' : undefined}
            aria-invalid={Boolean(errorFor('name'))}
            autoComplete="name"
            id="name"
            maxLength={120}
            name="name"
            required
            type="text"
          />
          {errorFor('name') && (
            <p className={styles.error} id="name-error">
              {errorFor('name')}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email *</label>
          <input
            aria-describedby={errorFor('email') ? 'email-error' : undefined}
            aria-invalid={Boolean(errorFor('email'))}
            autoComplete="email"
            id="email"
            maxLength={254}
            name="email"
            required
            type="email"
          />
          {errorFor('email') && (
            <p className={styles.error} id="email-error">
              {errorFor('email')}
            </p>
          )}
        </div>
      </div>

      <div className={styles.twoColumn}>
        <div className={styles.field}>
          <label htmlFor="phone">Phone / WhatsApp</label>
          <input
            aria-describedby={errorFor('phone') ? 'phone-error' : undefined}
            aria-invalid={Boolean(errorFor('phone'))}
            autoComplete="tel"
            id="phone"
            maxLength={50}
            name="phone"
            type="tel"
          />
          {errorFor('phone') && (
            <p className={styles.error} id="phone-error">
              {errorFor('phone')}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="preferredContact">Preferred contact *</label>
          <select
            aria-describedby={
              errorFor('preferredContact') ? 'preferred-contact-error' : undefined
            }
            aria-invalid={Boolean(errorFor('preferredContact'))}
            defaultValue="email"
            id="preferredContact"
            name="preferredContact"
            required
          >
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="phone">Phone</option>
          </select>
          {errorFor('preferredContact') && (
            <p className={styles.error} id="preferred-contact-error">
              {errorFor('preferredContact')}
            </p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="service">Service</label>
        <select
          aria-describedby={errorFor('service') ? 'service-error' : undefined}
          aria-invalid={Boolean(errorFor('service'))}
          defaultValue={initialServiceSlug || ''}
          id="service"
          name="service"
        >
          <option value="">Not sure yet</option>
          {services.map((service) => (
            <option key={service.id} value={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
        {errorFor('service') && (
          <p className={styles.error} id="service-error">
            {errorFor('service')}
          </p>
        )}
      </div>

      <div className={styles.twoColumn}>
        <div className={styles.field}>
          <label htmlFor="eventDate">Event date</label>
          <input
            aria-describedby={errorFor('eventDate') ? 'event-date-error' : undefined}
            aria-invalid={Boolean(errorFor('eventDate'))}
            id="eventDate"
            name="eventDate"
            type="date"
          />
          {errorFor('eventDate') && (
            <p className={styles.error} id="event-date-error">
              {errorFor('eventDate')}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="peopleCount">Number of people</label>
          <input
            aria-describedby={errorFor('peopleCount') ? 'people-count-error' : undefined}
            aria-invalid={Boolean(errorFor('peopleCount'))}
            id="peopleCount"
            max={100}
            min={1}
            name="peopleCount"
            type="number"
          />
          {errorFor('peopleCount') && (
            <p className={styles.error} id="people-count-error">
              {errorFor('peopleCount')}
            </p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="location">Location / venue</label>
        <input
          aria-describedby={errorFor('location') ? 'location-error' : undefined}
          aria-invalid={Boolean(errorFor('location'))}
          autoComplete="street-address"
          id="location"
          maxLength={180}
          name="location"
          type="text"
        />
        {errorFor('location') && (
          <p className={styles.error} id="location-error">
            {errorFor('location')}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Tell me about the occasion *</label>
        <textarea
          aria-describedby={errorFor('message') ? 'message-error' : 'message-help'}
          aria-invalid={Boolean(errorFor('message'))}
          id="message"
          maxLength={3000}
          name="message"
          required
          rows={7}
        />
        {errorFor('message') ? (
          <p className={styles.error} id="message-error">
            {errorFor('message')}
          </p>
        ) : (
          <p className={styles.help} id="message-help">
            Include timing, the kind of look you are considering, and anything else that would
            help with availability.
          </p>
        )}
      </div>

      {state.formError && (
        <p className={styles.formError} role="alert">
          {state.formError}
        </p>
      )}

      <div className={styles.formFooter}>
        <p>By sending this form, you are asking for availability—not confirming a booking.</p>
        <SubmitButton />
      </div>
    </form>
  )
}
