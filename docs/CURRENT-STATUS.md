# Current Status

## Chat 1 — Foundation & Payload CMS

**Status: complete**

The CMS/data foundation is established on the `dev` branch.

### Completed

- Cloudflare D1 + R2 architecture retained from the official starter
- Payload configuration reorganized for the commercial site
- Team-member roles and access control
- Media metadata/access policy
- Portfolio Categories
- Portfolio Projects with drafts/version history
- Services with drafts/version history
- Testimonials with drafts/version history
- Journal with drafts/version history
- Enquiries business collection
- Site Settings global
- Navigation global
- Home global
- About global
- Contact global
- Reusable slug field
- Reusable SEO field group
- Generated Payload TypeScript types
- Generated D1 schema migration
- Next.js 16-compatible ESLint flat configuration
- Lint validation
- TypeScript validation
- Project/CMS/architecture documentation
- No-Tailwind rule documented

### Validation result

Chat 1 schema validation completed successfully on GitHub Actions:

- Payload type generation: pass
- D1 migration generation: pass
- ESLint: pass
- TypeScript: pass

Generated schema artifacts are committed to `dev`.

### Deliberately not started

The public visual website remains the Payload starter. Chat 1 did not implement:

- Typography/design tokens
- Header/footer UI
- Homepage UI
- Portfolio UI
- Services/About/Contact frontend pages
- Journal frontend
- Public enquiry form
- Animations/transitions

Those belong to later milestones.

## Next milestone

Chat 2 — Design System & Homepage

Scope:

- Typography
- Color system
- Spacing/layout tokens
- Plain CSS / CSS Modules architecture
- Navigation
- Footer
- Responsive shell
- Luxury editorial homepage
- Photography treatment
- Buttons/interactions
- Restrained transitions
- Reusable frontend primitives

**Tailwind must not be introduced.**
