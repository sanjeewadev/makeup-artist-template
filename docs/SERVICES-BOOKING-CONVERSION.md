# Services & Booking Conversion

## Goal

Chat 10 turns Services and Contact into a premium consultation and conversion experience without becoming aggressive, transactional, or over-engineered.

The conversion principle is:

**help the visitor decide → reduce uncertainty → collect useful context → confirm details personally**

The website does not pretend that submitting a form is a confirmed booking.

## Services-page journey

### Hero

The Services hero establishes:

- service count
- service area
- the artist's approach
- the idea that services are shaped around the person and occasion

### 01 — Find your service

The service finder gives visitors a quick visual way to compare the available services.

Each service can show:

- photography
- title
- short description
- duration label
- price / quote label

The cards link to the detailed service story further down the same page.

The visitor is explicitly told that they do not need to know the exact service before enquiring.

### 02 — What happens next

The public process is intentionally simple:

1. Share the brief
2. Check availability
3. Confirm the details
4. Prepare with confidence

Do not introduce deposit/payment promises or automated booking language unless the actual business workflow supports them.

### 03 — Service stories

Each Service remains CMS-driven.

The detailed presentation uses:

- service photography
- title
- short description
- rich service description
- duration
- price / quote guidance
- service-specific enquiry CTA

The description should help someone understand the experience, not function as a wall of terms and conditions.

### 04 — A useful first message

The website teaches visitors what makes an enquiry useful:

- date + location
- people + timing
- look + feeling

This improves lead quality without adding mandatory form fields.

### 05 — FAQ

The Services FAQ addresses common decision friction:

- which service to choose
- whether an enquiry is a booking
- when to enquire
- what to include
- whether displayed pricing is final

The wording intentionally avoids unsupported guarantees.

## Contact as a private consultation

The Contact page is no longer framed as a generic form.

It is a private consultation / availability request.

The experience communicates:

- direct contact options
- service area
- response expectation if configured
- what happens after sending
- selected service context
- low-pressure booking expectations

## Selected-service continuity

Links from Services use:

`/contact?service=<service-slug>`

When the selected service exists:

- Contact visibly acknowledges the service
- its description is shown
- duration / price guidance is shown
- the matching service is preselected in the consultation form

If the service slug is invalid or stale, the visitor simply starts with “Not sure yet”.

## Four-part enquiry brief

### 01 — Choose the starting point

Services are presented as radio-card choices.

The visitor can also choose:

**Not sure yet**

This prevents the form from forcing a decision before the visitor has enough information.

### 02 — Tell me about the occasion

Collect:

- event date
- number of people
- location / venue

These remain optional because a visitor may still be early in planning.

### 03 — How should I reply?

Collect:

- name
- email
- phone / WhatsApp
- preferred contact method

Email remains required as the reliable baseline contact channel.

If Phone or WhatsApp is selected as the preferred method, a phone number is required by server-side validation.

### 04 — Describe the direction

The message invites useful context such as:

- ready-by timing
- desired level of makeup
- Portfolio references
- styling / dress direction
- anything important about the occasion

The form does not require image uploads or a perfect brief.

## Submission behavior

The existing secure server action remains the source of truth.

Current safeguards include:

- honeypot bot field
- server-side sanitation
- email validation
- preferred-contact validation
- phone validation when needed
- date-shape validation
- people-count validation
- service lookup against published Services
- minimum useful message length
- trusted server-side Payload create

The public Payload collection does not accept anonymous direct API creation.

## Success state

A successful submission should communicate:

- the enquiry was received
- it will be reviewed personally
- availability and next steps come afterward
- the booking is not automatically confirmed

Do not introduce fake urgency, countdowns, or instant-booking language.

## Enquiry management in Payload

Use Enquiry status consistently:

- **New** — unread / untriaged
- **In progress** — being discussed or awaiting information
- **Replied** — response has been sent
- **Closed** — no further action required
- **Spam** — unwanted submission

Internal notes are private and should contain useful follow-up context such as:

- availability
- quote notes
- pending questions
- next action

Never put private notes into public-facing fields.

## Service CMS writing rules

### Short description

Write a 1–2 sentence decision hook.

Useful topics:

- who the service is for
- occasion
- level of finish
- overall feeling
- photography context

### Full description

Use for:

- experience
- likely inclusions
- preparation
- timing context
- useful booking context

Avoid dense legal copy here.

### Price label

Treat as public guidance, not a promise.

Examples:

- From $250
- By enquiry
- Custom quote

If travel, group size, timing, or brief can affect pricing, the label should not imply a final all-inclusive figure.

### Duration label

Use human-readable wording:

- 90–120 min
- Bridal morning
- Half / full day
- By group size

## Conversion rules

Premium conversion is not maximum pressure.

Avoid:

- countdown timers
- “Only 2 slots left” unless genuinely maintained
- fake reviews
- fake client counts
- instant-booking claims
- hidden fees
- forcing optional planning details
- repeated Book Now buttons after every paragraph

The website should make the visitor feel:

**understood, informed, and comfortable taking the next step.**

## Technical boundary

Chat 10 adds no new database fields or migrations.

It reuses:

- Services
- Site Settings
- Contact
- Enquiries
- existing server action
- existing contact helpers

This keeps the product architecture simple while materially improving commercial value.
