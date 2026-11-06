# Portfolio Experience

## Scope

Chat 3 owns the public portfolio experience:

- `/portfolio`
- `/portfolio/[slug]`
- Category filtering
- Project hero/meta presentation
- Project story rendering
- Art-directed galleries
- Portfolio loading states
- Next-project navigation

Services, About, Contact, Journal, and admin-preview work remain outside this milestone.

## Portfolio index

The portfolio index loads all published Portfolio Projects and public Portfolio Categories.

Filtering happens client-side after the initial server fetch. This keeps category changes immediate and avoids a network request for every filter click.

Filter buttons:

- expose `aria-pressed`
- display only categories that currently contain published projects
- include project counts
- retain an All filter

The grid intentionally uses an asymmetrical editorial rhythm rather than equal cards.

On small screens it becomes a single-column sequence with consistent portrait-forward crops.

## Project pages

Each project route is resolved by its Payload slug.

The page presents:

- category
- title
- excerpt
- client/project name
- location
- event month/year
- hero image
- rich-text story
- image gallery
- enquiry CTA
- next project

If a slug is not published or does not exist, the route uses a portfolio-specific not-found state.

## Gallery art direction

Payload already exposes a per-image `presentation` field.

Supported values:

- `wide` — full editorial width
- `portrait` — tall, narrower frame
- `landscape` — wider supporting frame
- `auto` — frontend chooses a repeating editorial rhythm

The frontend should continue honoring these author choices rather than flattening every image into a generic grid.

## Image loading

- Project hero images use Next.js priority loading.
- Portfolio listing images prioritize only the first visible pair.
- Remaining listing/gallery images use normal Next.js lazy loading.
- Every responsive image defines a `sizes` hint.
- Image containers preserve layout before the image arrives to reduce visual shift.
- Payload Media alternative text remains the source of accessible image descriptions.
- Missing images fall back to neutral design-system placeholders.

## Content freshness

The homepage and portfolio routes are dynamic because the public website is CMS-driven. Publishing a project should not require rebuilding a static copy of the portfolio before the content can appear.

## Motion

Chat 3 keeps motion restrained:

- filter-result entrance
- portfolio image hover scale
- detail overlay fade
- gallery image micro-scale
- next-project image hover

All of these are disabled under `prefers-reduced-motion: reduce`.

## Responsive behavior

Desktop uses a 12-column editorial canvas.

Tablet simplifies to a two-column portfolio rhythm.

Mobile becomes a linear reading experience with full-width photography and no layout tricks that interrupt the project story.

## Future boundaries

Chat 5 may add preview/admin workflow improvements, but it should not replace the portfolio's public visual language or gallery rules without an explicit redesign decision.
