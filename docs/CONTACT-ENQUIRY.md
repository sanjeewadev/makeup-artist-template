# Contact and Enquiry Flow

## Purpose

Chat 4 turns the public contact page into a real availability enquiry experience rather than a generic contact form.

The flow is designed for makeup bookings and stores qualified leads in Payload without opening anonymous write access to the Enquiries collection.

## Public flow

1. A visitor opens `/contact`.
2. They can use direct email, phone, or WhatsApp links from Site Settings.
3. They can submit the structured availability form.
4. A Next.js server action validates the submitted data.
5. If a service was selected, the server verifies that the service still exists and is publicly available.
6. The server creates the Enquiry through Payload's Local API using trusted server-side access.
7. The visitor receives the CMS-configured success message.

The Enquiries collection itself remains protected from anonymous REST/API writes.

## Form fields

- Name — required
- Email — required
- Phone / WhatsApp — optional unless phone or WhatsApp is selected as the preferred contact method
- Preferred contact method — required
- Service — optional
- Event date — optional
- Number of people — optional, 1–100
- Location / venue — optional
- Occasion/message — required

Service links from `/services` use `/contact?service=<slug>`, which preselects the relevant service in the form.

## Validation

Validation happens on the server even though browser input types also provide basic client affordances.

The server validates:

- minimum name length
- email shape
- phone presence/length when required by contact preference
- allowed preferred-contact values
- event-date parseability
- people-count range
- minimum message detail
- selected service existence

Client input is trimmed and capped before storage.

## Spam protection

A hidden honeypot field is included. If it is filled, the server quietly returns a successful response without creating an Enquiry.

This is intentionally lightweight for the template. If a production site begins receiving automated abuse, Cloudflare Turnstile can be added later without changing the Enquiries access model.

## Payload storage

Successful submissions are stored with:

- `status = new`
- `source = website`

Public input cannot set internal notes or lead-management state.

Admin/editor users continue managing Enquiries through Payload.

## WhatsApp

The WhatsApp button is generated from:

`Site Settings → Contact → WhatsApp number`

Store the number in international format, for example:

`+94771234567`

The frontend strips formatting characters and generates a `wa.me` URL with a short prefilled availability message.

## Direct contact

The Contact page can also expose:

- Email
- Phone
- Service area
- WhatsApp
- Availability note
- Response-time note

All of these come from Payload globals rather than being hard-coded to a specific artist.

## Booking boundary

Submitting the form is explicitly not treated as a confirmed booking.

Availability, timing, price, deposits, terms, and final confirmation remain a personal follow-up step.

## Email notifications

Chat 4 stores enquiries reliably in Payload and provides direct contact channels. Automated notification email is not configured yet because the starter currently has no production email adapter.

A future deployment step may connect an email adapter and send notifications after successful Enquiry creation without changing the public form contract.
