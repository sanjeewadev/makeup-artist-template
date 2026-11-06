# Design System

## Direction

The public site uses a restrained luxury-editorial visual language.

The design should feel closer to a beauty editorial or independent fashion publication than a generic salon template.

Core principles:

- Photography carries the emotional weight.
- Typography creates hierarchy before boxes, shadows, or decoration.
- Space is an active design element.
- Fine rules and quiet contrast organize information.
- Motion is subtle and never competes with makeup imagery.
- The composition can be asymmetrical, but reading order must remain clear.
- Mobile is designed intentionally rather than treated as a compressed desktop.

## Typography

### Display

Cormorant Garamond, loaded through `next/font`.

Use for display headings, editorial statements, large brand moments, and testimonial quotations.

### Sans

Manrope, loaded through `next/font`.

Use for body copy, labels, navigation, buttons, metadata, and forms.

## Color tokens

Defined in `src/app/(frontend)/styles.css`.

- `--color-paper`: warm ivory base
- `--color-paper-soft`: lighter editorial surface
- `--color-paper-deep`: deeper warm neutral
- `--color-ink`: near-black warm ink
- `--color-muted`: secondary copy
- `--color-accent`: muted rose/clay
- `--color-accent-dark`: dark interactive accent
- `--color-line`: subtle separators

Avoid adding bright accent colors without revisiting the complete palette.

## Layout tokens

- `--site-max`: maximum editorial canvas
- `--gutter`: fluid horizontal page gutter
- `--section-space`: fluid vertical section rhythm

Use shared tokens before introducing page-specific spacing constants.

## Buttons

Three variants exist in `LinkButton`:

- Solid — primary conversion action
- Outline — secondary/high-contrast action
- Text — editorial inline action

Buttons use typography and motion rather than large radii, shadows, or gradients.

## Photography treatment

Images should:

- Fill their art-directed frame with `object-fit: cover`
- Use generous crops and portrait-forward ratios
- Avoid unnecessary rounded corners
- Use subtle hover scale only where the image is interactive
- Always have meaningful alternative text from Payload
- Use Payload Media records as the source of truth

When CMS photography is missing, the homepage uses neutral editorial placeholders rather than hard-coded third-party stock photography.

## Motion

Motion is CSS-only in Chat 2.

- Soft initial rise/fade on the hero
- Small arrow movement on hover
- Subtle image scale on interactive portfolio cards
- Underline/navigation transitions

All motion is removed or effectively disabled under `prefers-reduced-motion: reduce`.

## Accessibility

- Skip link provided
- Visible focus treatment
- Semantic header/nav/main/footer structure
- Mobile navigation uses native `details/summary`
- Reduced-motion preference respected
- Image alt text comes from required Media fields

## CSS architecture

Tailwind is prohibited.

- `styles.css` — global tokens, reset, accessibility, shared motion
- CSS Modules — component/page-specific styling
- Payload Admin custom SCSS remains separate from the public design system

Do not place page-specific selectors into the global stylesheet unless they are genuinely reusable across the whole site.
