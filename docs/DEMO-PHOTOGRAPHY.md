# Demo Photography

The template includes a curated external demo-photography layer so a fresh CMS installation can be shown as a complete premium website before a real artist uploads their work.

## Current demo scale

Chat 7 expands the demo library to:

- 44 curated image assets
- 10 Portfolio projects
- 4 Portfolio categories
- 5 Services
- 5 testimonials
- 5 Journal stories
- project galleries containing portrait, landscape, wide, process, and detail frames

The goal is to reduce obvious image repetition and make the site feel like a real creative business rather than a template with a few recycled stock portraits.

## Behavior

- Payload content always takes priority.
- Demo Portfolio projects appear only when there are no published Portfolio projects.
- Demo Services appear only when there are no published Services.
- Demo testimonials appear when no matching testimonials exist.
- Demo About content appears only when the About global has no meaningful client content.
- Demo Journal stories appear only when there are no published Journal posts.
- The homepage uses demo featured content when its CMS selections are empty.
- The homepage hero uses demo photography only when no CMS hero image is set.

No demo records are inserted into Payload.

## Photography families

The library intentionally contains different visual roles:

- bridal hero portraits
- veil/jewelry details
- bridal preparation
- makeup application
- artist-at-work
- minimal beauty portraits
- glamour/editorial portraits
- monochrome portraits
- creative beauty
- brushes/palettes/tools
- still-life beauty details

See `docs/PHOTOGRAPHY-DIRECTION.md` for the complete replacement strategy.

## Image provider

Demo photography is loaded remotely from Pexels.

The current library uses Pexels photo IDs including:

`29352013, 38765825, 34607174, 5767917, 35808599, 18478116, 7289123, 7476708, 15789321, 35983922, 16123932, 40525078, 19345732, 32427370, 33986816, 29569638, 34025162, 37710475, 33951059, 12957390, 6044654, 40654330, 15670451, 6954217, 15579920, 13918628, 29721721, 19832289, 18435619, 8173248, 16961531, 20820147, 14016182, 8128689, 20459105, 29528108, 36078897, 30825631, 29815593, 1438065, 8394923, 37356602, 37575397, 15898033`.

Representative source pages:

- https://www.pexels.com/photo/elegant-bridal-portrait-with-glamorous-makeup-29352013/
- https://www.pexels.com/photo/elegant-bridal-portrait-with-veil-and-pearls-38765825/
- https://www.pexels.com/photo/bridal-makeup-preparation-in-soft-lighting-32427370/
- https://www.pexels.com/photo/professional-makeup-artist-applying-bridal-makeup-37710475/
- https://www.pexels.com/photo/portrait-of-beautiful-woman-with-makeup-in-studio-19832289/
- https://www.pexels.com/photo/beautiful-woman-with-glamour-makeup-13918628/
- https://www.pexels.com/photo/elegant-makeup-and-accessories-flat-lay-37575397/

## Attribution

The demo Media objects carry a generic:

`Demo photography via Pexels`

photo-credit label so gallery presentation never implies that the demo images belong to the future client.

For a real client launch, replace this with the actual photographer/studio credit where appropriate.

## Production guidance

Before a real artist publicly markets the website as their portfolio:

1. upload the artist's real photography into Payload Media,
2. create real Portfolio projects,
3. assign real Service photography,
4. upload real artist/behind-the-scenes images,
5. publish real testimonials and Journal content,
6. confirm every real image has accurate alternative text,
7. add photo credits where appropriate,
8. inspect mobile and desktop cropping.

Once real CMS content exists, the relevant demo content automatically disappears.

## Technical locations

Demo content:

`src/lib/demo-content.ts`

Remote image allowlist:

`next.config.ts`

Photography direction:

`docs/PHOTOGRAPHY-DIRECTION.md`

Do not copy the demo records into the production database unless the client explicitly wants demonstration content.
