# Payload CMS Model

## Purpose

The CMS is intentionally controlled rather than becoming a free-form page builder. The client can manage photography, copy, portfolio work, services, testimonials, journal content, contact information, and SEO without being able to accidentally destroy the site's art direction.

## Collections

### Team Members (`users`)

Payload authentication collection for people who manage the site.

Roles:

- `admin` — manages content and team members
- `editor` — manages site content but cannot manage roles/team members in the Admin UI

The first account created on a fresh installation is promoted to administrator automatically. Later accounts default to editor.

### Media (`media`)

Stores metadata for R2-backed image uploads.

Core fields:

- Alternative text
- Caption
- Photo credit

Public reads are allowed because these assets power the public site. Upload/update/delete operations require authentication.

### Portfolio Categories (`portfolio-categories`)

Controlled categories such as Bridal, Editorial, Engagement, or Events.

Core fields:

- Title
- Slug
- Description
- Sort order

Categories are publicly readable and managed by authenticated CMS users.

### Portfolio Projects (`portfolio-projects`)

The primary portfolio/story content type.

Core fields:

- Title and slug
- Category
- Client/project name
- Excerpt
- Hero image
- Rich-text story
- Ordered gallery
- Per-image presentation hint
- Event date
- Location
- Featured flag
- Sort order
- SEO metadata

Drafts and version history are enabled. Anonymous visitors can read only published projects.

### Services (`services`)

Client-facing makeup offerings.

Core fields:

- Title and slug
- Short description
- Rich-text description
- Image
- Optional price label
- Optional duration label
- Featured flag
- Sort order
- SEO metadata

Drafts/versioning are enabled. Public access is published-only.

### Testimonials (`testimonials`)

Curated client feedback.

Core fields:

- Client name
- Quote
- Related service
- Location
- Optional portrait
- Featured flag
- Sort order

Drafts/versioning are enabled. Public access is published-only.

### Journal (`journal-posts`)

Editorial and SEO-focused content.

Core fields:

- Title and slug
- Excerpt
- Featured image
- Rich-text article content
- Publication date
- Featured flag
- Tags
- SEO metadata

Drafts/versioning are enabled. Public access is published-only.

### Enquiries (`enquiries`)

Business lead records.

Core fields:

- Name
- Email
- Phone
- Preferred contact method
- Related service
- Event date
- Location
- Number of people
- Message
- Lead status
- Source
- Internal notes

Anonymous REST/API creation is intentionally denied in Chat 1. Chat 4 will expose a validated server-side enquiry flow and can add email notifications without weakening the collection's access policy.

## Globals

### Site Settings (`site-settings`)

Single source of truth for reusable brand/business data:

- Site name
- Artist name
- Tagline
- Short description
- Logo / mark / favicon
- Email, phone, WhatsApp, service area
- Social profiles
- Default SEO metadata

### Navigation (`navigation`)

Controls header links, primary CTA, footer links, and footer note without allowing arbitrary layout editing.

### Home (`home`)

Stores homepage editorial content and curated relationships:

- Hero content
- Introduction
- Featured portfolio projects
- Featured services
- Featured testimonial
- Closing CTA

The frontend decides the visual composition in Chat 2.

### About (`about`)

Stores artist story content, portrait, credentials, CTA, and SEO.

### Contact (`contact`)

Stores contact-page messaging, enquiry guidance, response-time messaging, submission success copy, and SEO.

## Reusable fields

### Slug

`src/fields/slug.ts` normalizes manual slugs and generates a slug from the source title when blank.

### SEO

`src/fields/seo.ts` provides a controlled metadata group:

- Meta title
- Meta description
- Social image
- No-index flag

Site Settings contains the fallback/default SEO group.

## Access summary

| Content | Anonymous read | Anonymous write | Authenticated CMS write |
| --- | --- | --- | --- |
| Media | Yes | No | Yes |
| Portfolio Categories | Yes | No | Yes |
| Portfolio Projects | Published only | No | Yes |
| Services | Published only | No | Yes |
| Testimonials | Published only | No | Yes |
| Journal | Published only | No | Yes |
| Enquiries | No | No | Yes |
| Public globals | Yes | No | Yes |
| Team Members | No | First-user bootstrap only | Admin/self rules |

## Database/storage mapping

D1 stores structured Payload records and version tables.

R2 stores uploaded media bytes.

The database never stores the photography binary itself; Payload records store the associated media metadata and object references.
