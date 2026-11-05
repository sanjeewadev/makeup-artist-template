# Current Status

## Active milestone

Chat 1 — Foundation & Payload CMS

## Scope

This milestone establishes the reusable CMS and data foundation only. Public-site visual design is intentionally deferred to Chat 2.

## Foundation included

- Users and authentication roles
- Media metadata and Cloudflare R2-backed uploads
- Portfolio categories
- Portfolio projects with drafts and editorial gallery hints
- Services with drafts
- Testimonials with drafts
- Journal posts with drafts
- Enquiries for business lead management
- Site Settings global
- Navigation global
- Home content global
- About content global
- Contact content global
- Reusable slug and SEO fields
- Public/read and authenticated/write access policies
- Cloudflare D1 database architecture

## Validation

The Chat 1 schema is validated by generating Payload types and a D1 migration, then running lint and TypeScript checks in GitHub Actions.

## Next milestone

Chat 2 — Design System & Homepage

No Tailwind. The public frontend will use standard CSS and CSS Modules.
