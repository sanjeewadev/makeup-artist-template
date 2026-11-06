# Chat 14A–14B — Readability and Photography Corrections

Status: implemented on `dev`. 14C–14F are **not started**.

## 14A — Global design-system correction

- Darkened muted text from `#746c64` to `#655c54` for improved contrast on paper.
- Reduced standard section spacing from `clamp(6rem, 12vw, 12rem)` to `clamp(4.25rem, 8vw, 8rem)`.
- Reduced small section spacing from `clamp(3.5rem, 7vw, 7rem)` to `clamp(2.75rem, 5vw, 5rem)`.
- Increased the global uppercase label token from `0.61rem` to `0.72rem`.
- Raised excessively small hard-coded text sizes across Home, About, Services, Journal, Contact, Portfolio and their interactive components.
- Increased header desktop navigation and brand descriptor sizes; improved footer contrast and utility text.
- Removed unnecessary low-opacity blending from Portfolio and Journal filter counts.
- Retained Cormorant Garamond / Manrope, the paper-and-ink palette, plain CSS Modules, motion and existing page structure.

These are targeted design-system/readability fixes, not the 14C page compression/recomposition work.

## 14B — Demo photography and asset resilience

- Replaced the failing `artistEyeliner` demo photo ID `40654330` with another working makeup-application photo family (ID `37710475`), including updated alt text.
- Changed the Home closing image selection: prefer the first published bridal Portfolio hero with a resolved image, then a published project hero, then the homepage hero. This avoids the previous arbitrary last-project choice, which selected a visually inconsistent cool-tone editorial image.
- Added an intentional warm-neutral missing-image fallback to the shared `CmsImage` component. Unavailable remote photos no longer expose broken image chrome/alt text inside galleries.
- Added `scripts/check-demo-images.mjs` to check every Pexels demo URL with concurrent lightweight HEAD requests. Run `node scripts/check-demo-images.mjs` with internet access. HEAD-blocking by a remote provider should be investigated with a browser before replacing the asset.
- Kept CMS photography primary; demo content remains non-database fallback data.

## Validation and follow-up

The changes above were committed to `dev`. GitHub-connector commits do not reliably trigger a full CI run; do **not** interpret this document as a claim of a passing build or visual/browser audit.

On a development machine:
```powershell
git switch dev
git pull origin dev
pnpm install
pnpm lint
pnpm exec tsc --noEmit
node scripts/check-demo-images.mjs
pnpm dev
```

Visually inspect all six public pages at laptop/desktop and mobile widths. Confirm that the Journal thumbnail loads, the Home ending uses a bridal image, and enlarged labels do not overflow navigation/filter bars.

14C is reserved for actual page compression/composition, 14D testimonial repetition, 14E responsive/accessibility audits, and 14F production/release QA. Do not merge to `main` yet.
