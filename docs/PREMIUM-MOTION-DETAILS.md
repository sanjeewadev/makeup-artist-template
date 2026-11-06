# Premium Motion & Detail Obsession

## Goal

Chat 13 gives the website one coherent interaction language.

The target is not “more animation”.

The target is:

**calm, responsive, deliberate, tactile, and expensive-feeling**

Motion should help a visitor understand:

- where they are
- what changed
- what is interactive
- whether something is loading
- whether an action was accepted
- what deserves visual attention

## Core rule

Motion is subordinate to:

1. photography
2. typography
3. content
4. usability

If an animation becomes the first thing a visitor notices, it is probably too strong.

## Shared timing system

The public CSS now defines shared motion tokens:

- `--motion-fast` — small state changes
- `--motion-base` — standard UI interaction
- `--motion-slow` — larger reveal/state changes
- `--motion-page` — route entrance
- `--motion-image` — image arrival
- `--motion-menu` — full-screen mobile navigation
- `--ease-editorial` — signature directional easing

Use these before inventing page-specific durations.

## Route transition

Public page content is wrapped in a lightweight route motion frame.

New routes use:

- subtle opacity entrance
- very small vertical travel
- editorial easing

There is no full-screen wipe, spinner takeover, or artificial route delay.

## Loading state

The frontend now has a global loading state that matches the site language.

It uses:

- editorial metadata line
- photography-shaped placeholder
- typography-shaped placeholders
- restrained progress line

The loading UI must look like part of the website rather than a framework fallback.

## Image loading

CMS images now use a restrained arrival treatment.

Rules:

- fade only
- no zoom on initial image load
- hover zoom remains controlled by the parent composition
- no-JavaScript / progressive rendering remains safe
- reduced-motion users receive the image immediately

## Header behavior

The site header is route-aware and scroll-aware.

### Active navigation

The current section receives a persistent underline.

Nested routes such as:

`/portfolio/project-slug`

still identify Portfolio as the active primary section.

### Scroll state

After the visitor begins scrolling:

- the header becomes slightly denser
- the brand mark subtly tightens
- supporting brand text becomes quieter
- the surface becomes slightly more opaque

The header does not disappear or chase the visitor.

## Mobile navigation

The mobile menu continues to use native `details/summary`.

Chat 13 adds:

- Menu / Close state labels
- body scroll locking while open
- native route remount so the menu closes when navigation completes
- staged menu entrance
- staggered navigation labels
- active-route treatment
- existing menu-mark transformation
- full reduced-motion fallback

No custom modal/menu state library is required.

## Buttons

Buttons now have one shared tactile behavior:

- small lift on hover-capable devices
- directional arrow response
- subtle press state
- restrained border/background changes
- no touch-only sticky hover dependence
- visible focus state
- reduced-motion fallback

Avoid:

- elastic bounce
- large scale effects
- button glow
- magnetic cursor effects

## Project lightbox

The Portfolio full-screen viewer now enters with a restrained content transition.

The existing native-dialog behavior remains intact:

- Escape closes
- focus behavior remains native
- previous/next controls remain accessible

## Services FAQ

Open FAQ content receives a short disclosure entrance.

The native `details/summary` element remains the source of state and accessibility.

## Enquiry pending state

The availability-request submit button now communicates pending state through:

- pending text
- disabled state
- subtle rotating arrow indicator

This reinforces that the submission is being processed without introducing a separate spinner component.

## Scroll and section reveal

Existing view-timeline section reveal remains progressive enhancement.

Chat 13 makes it quieter:

- less vertical travel
- higher starting opacity
- shorter reveal window

Unsupported browsers simply receive static content.

## Scrollbar detail

Fine-pointer browsers receive a subtle editorial scrollbar treatment.

It remains:

- low contrast
- system-like
- nonessential

The design does not depend on custom scrollbar support.

## Reduced motion

Every Chat 13 motion treatment must respect:

`prefers-reduced-motion: reduce`

In reduced-motion mode:

- route entrance is removed
- image entrance animation is removed
- menu staging is removed
- lightbox entrance is removed
- FAQ disclosure animation is removed
- pending arrow rotation is removed
- hover transforms are removed where relevant
- smooth scrolling remains disabled globally

Reduced motion is not a degraded version of the website. It is an intentional presentation mode.

## What Chat 13 intentionally does not add

- animation libraries
- GSAP
- Framer Motion
- custom cursors
- mouse-following effects
- parallax everywhere
- scroll-jacking
- artificial page delays
- autoplay video
- background canvas effects
- heavy transition overlays
- sound
- vibration tricks

These would add complexity without increasing trust or commercial value.

## Quality principle

A premium interaction should usually feel obvious only when it is removed.

The visitor should think:

**“This feels very polished.”**

not:

**“This website has a lot of animations.”**
