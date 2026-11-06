# Current Status

## Chat 2 — Design System & Homepage

**Status: complete**

Chat 1 established the CMS/data foundation. Chat 2 replaces the Payload starter frontend with the public visual system and homepage.

### Implemented

- Cormorant Garamond display typography
- Manrope UI/body typography
- Warm ivory / ink / muted rose design tokens
- Fluid gutters and section spacing
- Global CSS reset and accessibility foundations
- Skip link and visible focus states
- Responsive site header
- Native, accessible mobile navigation
- Responsive site footer
- Reusable solid/outline/text link-button component
- Reusable Payload media image component
- CMS data-loading helpers
- Luxury editorial homepage
- CMS-driven hero
- Editorial introduction
- Featured-project mosaic
- Featured-services section
- Testimonial/experience statement
- Closing enquiry CTA
- Graceful placeholders when the CMS is empty
- CSS-only transitions
- Reduced-motion support
- Responsive desktop/tablet/mobile behavior
- Updated frontend e2e smoke test
- Design-system documentation
- No Tailwind

### CMS behavior

The homepage reads Site Settings, Navigation, Home, featured Portfolio Projects, featured Services, and the featured Testimonial.

If explicit Home selections are missing, the page falls back to published content marked `featured`.

If the CMS is still empty, the public page renders a polished editorial shell without fake third-party stock imagery.

### Deliberately not implemented yet

- `/portfolio` listing/filter experience
- `/portfolio/[slug]` project pages
- Services page
- About page
- Contact/enquiry form
- Journal listing/article pages
- Preview workflow/admin polish

Those belong to Chats 3–5.

## Next milestone

Chat 3 — Portfolio Experience

The next milestone builds the portfolio listing, categories/filters, project pages, premium gallery layouts, image loading behavior, CMS integration, responsive behavior, and transitions.

## Validation

Final Chat 2 validation is green through repository CI:

- ESLint: pass
- TypeScript: pass
- Production Next.js build: pass
