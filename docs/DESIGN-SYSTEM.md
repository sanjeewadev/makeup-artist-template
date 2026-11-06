# Design System

## Signature direction

The public site uses a high-fashion beauty editorial language rather than generic luxury-template styling.

The target is:

**high-fashion beauty editorial × luxury bridal atelier × contemporary art direction**

Detailed Chat 6 rules live in `docs/SIGNATURE-ART-DIRECTION.md`.

Core principles:

- Photography carries the emotional weight.
- Typography establishes identity before UI decoration.
- Each major page receives its own composition rather than repeating one layout formula.
- Space is an active design element.
- Fine rules and quiet contrast organize information.
- Motion is restrained and subordinate to photography.
- Mobile is intentionally art-directed rather than merely stacked.
- No Tailwind.

## Typography

### Display

Cormorant Garamond, loaded through `next/font` with normal and italic styles.

Use for:

- primary page titles
- editorial statements
- artist-profile moments
- project/story titles
- testimonials
- selected emotional emphasis

Italic display text is an accent. Do not make every heading italic.

### Sans

Manrope, loaded through `next/font`.

Use for:

- body copy
- labels
- navigation
- buttons
- metadata
- forms
- utility information

## Color tokens

Defined in `src/app/(frontend)/styles.css`.

- `--color-paper`: warm ivory base
- `--color-paper-soft`: lighter editorial surface
- `--color-paper-deep`: photography/loading neutral
- `--color-ink`: warm near-black
- `--color-ink-soft`: softer dark body/display tone
- `--color-muted`: secondary copy
- `--color-accent`: clay / muted rose editorial accent
- `--color-accent-dark`: deeper interaction/accent tone
- `--color-line`: quiet separators
- `--color-line-strong`: stronger field/detail separators

Avoid adding bright accent colors without revisiting the complete art direction.

## Layout tokens

- `--site-max`: maximum editorial canvas
- `--gutter`: fluid horizontal page gutter
- `--section-space`: major vertical section rhythm
- `--section-space-small`: secondary section rhythm
- `--label-size`: shared editorial metadata size
- `--ease-editorial`: shared premium motion curve

Prefer these tokens before introducing page-specific constants.

## Buttons

Three variants exist in `LinkButton`:

- Solid — primary conversion
- Outline — secondary/high-contrast action
- Text — editorial inline action

Button design uses typography, fine borders, and a restrained circular arrow detail rather than rounded pill styling or shadows.

## Photography

Images should:

- use intentional crops
- vary scale where the page composition calls for it
- avoid unnecessary rounded corners
- use subtle hover scale only when interactive
- preserve Payload alternative text
- use Payload Media as the source of truth
- avoid stock imagery hard-coded into the template

## Motion

Motion is CSS-led and uses one shared timing system.

Current behavior includes:

- route-level editorial entrance
- premium frontend loading state
- CMS image arrival
- scroll-aware header refinement
- active-route navigation
- staged full-screen mobile-menu entrance
- tactile button press / hover states
- clipped/faded hero image entrance
- editorial text rise
- image micro-scale on intentional interactive photography
- directional underline motion
- subtle arrow motion
- Portfolio lightbox entrance
- Services FAQ disclosure motion
- enquiry pending-state feedback
- progressive section reveal using CSS view timelines when supported

Shared motion tokens:

- `--motion-fast`
- `--motion-base`
- `--motion-slow`
- `--motion-page`
- `--motion-image`
- `--motion-menu`
- `--ease-editorial`

Every motion treatment must respect `prefers-reduced-motion`.

Detailed rules live in `docs/PREMIUM-MOTION-DETAILS.md`.

## Accessibility

- Skip link
- Visible focus treatment
- Semantic header/nav/main/footer
- Native `details/summary` mobile navigation
- Reduced-motion support
- Payload alt text
- Accessible form errors and pending states
- Editorial 404 states that retain usable navigation

## CSS architecture

Tailwind is prohibited.

- `styles.css` — tokens, reset, global accessibility, shared progressive motion
- CSS Modules — page and component art direction
- Payload Admin SCSS — isolated CMS branding

Do not collapse page-specific composition into a generic card/component system simply to reduce CSS.
