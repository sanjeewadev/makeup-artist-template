# Makeup Artist Portfolio — Product Plan

## Product goal

Build a premium, reusable makeup-artist website template that can credibly be sold as a high-value commercial website rather than a simple portfolio theme.

The product should make the artist look premium, present photography exceptionally well, convert visitors into enquiries, perform strongly on mobile, and remain easy for a non-technical client to manage through Payload CMS.

## Technical foundation

- Next.js 16
- Payload CMS 3
- TypeScript
- Cloudflare D1 for structured CMS data
- Cloudflare R2 for media
- OpenNext / Cloudflare Workers for deployment
- pnpm for dependency management
- Payload-generated admin panel at `/admin`

The repository starts from Payload's Cloudflare D1 template so the database, object storage, and deployment architecture stay in one ecosystem.

## Product principles

1. Photography is the hero. UI should support the work, not compete with it.
2. Luxury editorial direction over generic salon/template styling.
3. Mobile is a first-class design target.
4. Subtle motion only; never add animation just to make the page feel busy.
5. Content is CMS-managed, but visual composition remains controlled so clients cannot accidentally break the design.
6. No artist-specific identity should be hard-coded when it can be safely represented in Site Settings.
7. Accessibility, SEO, image performance, and loading states are part of the product definition, not cleanup work.
8. Prefer a small number of excellent pages over unnecessary feature count.

## Planned public routes

- `/` — Home
- `/portfolio` — Curated portfolio with categories
- `/portfolio/[slug]` — Portfolio story / project
- `/services` — Service offering
- `/about` — Artist story and credentials
- `/journal` — Optional editorial / SEO content
- `/journal/[slug]` — Journal article
- `/contact` — Enquiry experience
- `/admin` — Payload CMS

## Planned Payload content model

### Collections

- Users
- Media
- Portfolio Categories
- Portfolio Projects
- Services
- Testimonials
- Journal Posts
- Enquiries

### Globals

- Site Settings
- Navigation
- Home
- About
- Contact

## Enquiry strategy

The public enquiry form should be tailored to makeup services rather than using a generic message form.

Initial fields:

- Name
- Email
- Phone / WhatsApp
- Service type
- Event date
- Location
- Number of people
- Message

Enquiries may be stored in Payload for management while notification delivery can use a production email adapter. No customer account system is planned.

## Visual direction

Target: luxury editorial / fashion portfolio.

Expected characteristics:

- Large, high-quality photography
- Strong typography
- Generous whitespace
- Intentional asymmetry and editorial grids where appropriate
- Minimal decorative UI
- Restrained color system
- Refined hover/focus states
- Smooth but subtle page and gallery transitions
- No generic dashboard-card look on the public site

## Quality bar

Before release, the project should include:

- Fully responsive layouts
- Keyboard-accessible navigation and forms
- Meaningful focus states
- Optimized responsive images
- Metadata and Open Graph support
- Sitemap and robots configuration
- Structured data where useful
- Good empty/loading/error states
- 404 experience
- Form validation and clear feedback
- Payload permissions appropriate for public/read and authenticated/write flows
- Automated checks for important frontend and CMS behavior

## Milestone status

- Chat 1 — Foundation & Payload CMS: **complete**
- Chat 2 — Design System & Homepage: **complete**
- Chat 3 — Portfolio Experience: **complete**
- Chat 4 — Services, About & Contact: **complete**
- Chat 5 — Journal + CMS Experience: **complete**
- Chat 6 — Signature Art Direction & Next-Level UI/UX: **complete**
- Chat 7 — $2K Visual Identity & Photography Direction: **complete**\n- Chat 8 — Cinematic Homepage 3.0: **complete**\n- Chat 9 — Portfolio as the Main Sales Weapon: **complete**\n- Chat 10 — Services + Booking Conversion: **complete**\n- Chat 11 — Artist Brand, Trust & Social Proof: **complete**\n- Chat 12 — Editorial Journal + Serious SEO: **complete**\n- Chat 13 — Premium Motion & Detail Obsession: **complete**

## Delivery phases

1. Foundation and documentation
2. CMS schemas, access control, and generated types
3. Global design system and site shell
4. Home page
5. Portfolio listing and project pages
6. Services, About, Testimonials, Contact
7. Journal
8. Enquiry flow and production email integration
9. CMS/admin polish
10. SEO, accessibility, performance, and responsive QA
11. Cloudflare production configuration and deployment
12. Final content/handoff documentation

## Branch policy

- `main` is the stable baseline / release branch.
- `dev` is the integration branch for active development.
- Feature work should land on `dev` first.
- `main` should only receive reviewed, release-ready work.


## Signature redesign completion

Chat 6 adds the signature public-facing art direction without changing the technical foundation or CMS content model.

See `docs/SIGNATURE-ART-DIRECTION.md` for the protected visual rules.

## Five-chat scope completion

The requested five development chats are complete on `dev`.

The remaining delivery phases in this broader product plan—production deployment, final real-content QA, optional email notification integration, and release/handoff—are release tasks rather than missing website feature milestones.


## $2K photography direction completion

Chat 7 expands the visual-content system behind the signature design.

The template now carries a much denser demo photography library, ten believable Portfolio stories, richer Services/Journal/testimonial content, homepage image-essay pacing, photo credits, and formal real-client photography guidance.

See `docs/PHOTOGRAPHY-DIRECTION.md`.


## Cinematic homepage completion

Chat 8 turns the homepage into a full premium narrative rather than a generic collection of website sections.

It now connects Portfolio proof, service experience, artist credibility, client testimonials, Journal authority, and enquiry conversion into one intentional sequence.

See `docs/CINEMATIC-HOMEPAGE.md`.


## Portfolio sales-experience completion

Chat 9 turns Portfolio into the primary proof surface for the $2K website: cover-story presentation, contextual filtering, richer project metadata, case-study storytelling, full-screen image viewing, stronger enquiry bridging, and continuous previous/next project browsing.

See `docs/PORTFOLIO-SALES-EXPERIENCE.md`.


## Services and booking conversion completion

Chat 10 turns the service journey into a premium consultation flow: service discovery, process education, detailed service stories, practical FAQs, selected-service continuity, and a four-part availability brief backed by the existing trusted server-side enquiry workflow.

See `docs/SERVICES-BOOKING-CONVERSION.md`.


## Artist-brand and trust completion

Chat 11 makes authentic identity and proof part of the product: a stronger artist profile, Portfolio evidence, Service context, genuine testimonial attribution, real social profiles, global footer identity, and explicit safeguards against fabricated credibility.

See `docs/ARTIST-BRAND-TRUST.md`.


## Editorial Journal and SEO completion

Chat 12 turns the Journal into an editorial authority surface and hardens technical search/share behavior across the public website: topic discovery, related reading, canonical URLs, social metadata, structured data, sitemap/no-index integration, crawler-safe public media, and practical CMS publishing guidance.

See `docs/EDITORIAL-SEO-AUTHORITY.md`.


## Premium motion completion

Chat 13 unifies the site's interaction language: route transitions, loading states, image arrival, scroll-aware navigation, mobile-menu staging, tactile buttons, lightbox/disclosure/pending feedback, and reduced-motion behavior.

See `docs/PREMIUM-MOTION-DETAILS.md`.

## Final milestone

Chat 14 — Commercial Finish & Client Handoff

This is the release-quality pass rather than another major design rebuild. It should cover:

- final responsive/device QA
- browser compatibility review
- accessibility regression pass
- production environment/domain checklist
- Cloudflare D1/R2/Workers readiness
- real-client content replacement checklist
- image/alt/credit review
- contact/WhatsApp/enquiry workflow verification
- sitemap/robots/canonical verification
- optional analytics decision
- optional enquiry-email notification decision
- CMS/client operating guide
- launch checklist
- backup/rollback/release notes
- final dev-to-main release procedure
