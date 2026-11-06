# Signature Art Direction

## Chat 6 goal

Chat 6 moves the public site from a polished luxury template into a more distinctive, art-directed beauty experience.

The design language is:

**high-fashion beauty editorial × luxury bridal atelier × contemporary independent publication**

The CMS architecture, routes, content model, enquiry flow, SEO, and preview workflow remain unchanged.

## Signature principles

### 1. Photography leads

Photography is treated as editorial material rather than card content.

Use:

- large portrait crops
- deliberate asymmetry
- alternating scale
- occasional wide cinematic frames
- restrained hover movement
- generous negative space around strong images

Do not force every image into the same ratio or grid rhythm.

### 2. Typography creates the identity

Cormorant Garamond remains the display face, now using both normal and italic styles.

Italic display type is used selectively for:

- emotional emphasis
- artist-profile moments
- testimonials
- next-project / next-story transitions
- large editorial statements

Manrope remains the functional sans-serif for navigation, labels, body copy, buttons, metadata, and forms.

Do not overuse italic styling. It is an accent, not the default voice.

### 3. Pages should not share one template

The site deliberately avoids repeating the same split-section composition on every route.

- Home: layered hero and signature chapters
- Portfolio: editorial archive / fashion-book rhythm
- Project: image-led story with overlapping title
- Services: catalogue-like alternating compositions
- About: artist profile
- Contact: concierge panel + refined form
- Journal: independent beauty publication
- Journal article: long-form editorial story

Shared components still exist, but page composition should feel purpose-built.

### 4. Restraint over decoration

Do not introduce:

- glassmorphism
- floating decorative blobs
- large rounded cards
- ornamental gradients
- excessive shadows
- noisy iconography
- animation for its own sake

Gradients are acceptable only as subtle image readability treatments or neutral photography placeholders.

### 5. Color

The signature palette is:

- warm ivory paper
- soft ivory surface
- warm near-black ink
- restrained muted text
- clay / muted rose accent
- deeper clay interaction tone

The accent is used for meaningful editorial moments rather than scattered decoration.

### 6. Motion

Motion remains CSS-led and restrained.

Current behavior includes:

- clipped hero image reveal
- editorial text rise
- image micro-scale on interactive photography
- underline direction changes
- arrow movement
- full-screen mobile menu transitions
- progressive scroll reveal where CSS view timelines are supported

All motion must respect `prefers-reduced-motion`.

### 7. Navigation

Desktop navigation is intentionally quiet so the photography and typography remain dominant.

Mobile navigation is a full-screen editorial composition rather than a dropdown panel.

Do not replace it with a generic hamburger drawer unless the complete art direction is intentionally changed.

### 8. Forms

The enquiry form is part of the luxury experience.

Fields use large editorial input typography, fine rules, restrained focus movement, and minimal chrome.

Do not replace the form with boxed input cards or large rounded controls.

### 9. Mobile art direction

Mobile layouts are not compressed desktop grids.

Important mobile behavior:

- large display typography is preserved
- photography becomes full-width
- complex grid asymmetry becomes a clear linear sequence
- the full-screen navigation becomes a distinct experience
- form actions become comfortably full-width where needed
- metadata remains concise

### 10. Error states

Public 404 states use the same editorial language as the main site.

A missing Journal story or Portfolio project must never drop into a generic framework-looking page.

## Design protection

Future content, deployment, analytics, or integration work should preserve this public design language.

Changes that introduce a new UI library, utility framework, major visual effect, or generic component system should be treated as a design decision rather than an implementation shortcut.

Tailwind remains prohibited.
