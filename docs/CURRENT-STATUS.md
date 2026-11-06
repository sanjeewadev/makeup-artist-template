# Current Status

## Chat 3 — Portfolio Experience

**Status: complete**

Chat 1 established the CMS/data foundation and Chat 2 established the public design system/homepage. Chat 3 completes the public portfolio experience.

### Implemented

- `/portfolio` editorial portfolio index
- CMS-driven Portfolio Categories
- Instant client-side category filtering
- Accessible filter buttons with project counts
- Asymmetrical 12-column desktop portfolio grid
- Responsive two-column tablet layout
- Linear full-width mobile portfolio layout
- Published-project counts and graceful empty state
- `/portfolio/[slug]` project routes
- Project-specific metadata
- Portfolio-specific not-found state
- Project hero with category, title, excerpt, client/project name, location, and event date
- Payload Lexical story rendering
- Art-directed gallery renderer
- `wide`, `portrait`, `landscape`, and `auto` gallery presentation handling
- Figure captions
- Responsive Next.js image sizing
- Priority loading for hero / first visible listing imagery
- Lazy loading for the remaining gallery/listing imagery
- Portfolio route loading skeleton
- Next-project navigation
- Project enquiry CTA
- Restrained filter/gallery/hover transitions
- Reduced-motion support
- Homepage/portfolio routes marked dynamic for CMS freshness
- Portfolio route smoke test
- Portfolio experience documentation
- No Tailwind

### CMS behavior

The portfolio index reads public Portfolio Categories and published Portfolio Projects.

Filters are derived from real categories, and categories with zero published projects are omitted from the public filter controls.

Project pages use the existing Payload slug, category, hero image, story, gallery, location, event date, and SEO fields.

The existing gallery `presentation` field is now fully honored by the frontend, so an editor can art-direct individual gallery images without changing code.

### Image behavior

- Hero image: priority loaded
- First visible index images: prioritized
- Remaining index/gallery images: normal Next.js lazy loading
- Responsive `sizes` hints are defined
- Layout frames reserve image space before loading
- Required Payload alt text remains the accessibility source
- Missing images fall back to controlled editorial placeholders

### Validation

Final Chat 3 validation is green through repository CI:

- ESLint: pass
- TypeScript: pass
- Production Next.js build: pass

During validation, local D1 production builds exposed a concurrent SQLite lock. CI/local validation now serializes Next.js build workers only when `CLOUDFLARE_REMOTE_BINDINGS=false`. Real Cloudflare deployment retains normal parallelism.

### Deliberately not implemented yet

- Services page
- About page
- Public contact/enquiry form
- WhatsApp/contact integration
- Journal listing/article pages
- Payload admin/preview polish

Those belong to Chats 4–5.

## Next milestone

Chat 4 — Services, About & Contact

Scope:

- Services page
- Artist story/About page
- Testimonials presentation
- CTA system expansion
- Sophisticated enquiry form
- Server-side validation
- Payload Enquiry storage
- WhatsApp/contact integration
- Mobile UX
