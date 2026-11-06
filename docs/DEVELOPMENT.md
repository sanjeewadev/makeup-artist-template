# Development Guide

## Branches

Active development happens on `dev`.

Do not develop directly on `main`. Feature work is integrated into `dev` first and only promoted to `main` when a milestone is release-ready.

To set up the local tracking branch:

```powershell
git fetch origin
git switch -c dev --track origin/dev
```

If the local `dev` branch already exists:

```powershell
git switch dev
git pull origin dev
```

## Runtime requirements

Use the versions declared by `package.json`.

Current baseline:

- Node: `^22.23.4 || >=24.22.1`
- pnpm: `^9 || ^10 || ^11`

Verify before debugging dependency, Payload, or Cloudflare issues:

```powershell
node -v
pnpm -v
```

Node versions below the declared engine range are unsupported even if the dev server appears to start.

## Local development

```powershell
pnpm install
pnpm dev
```

Frontend:

`http://localhost:3000`

Payload admin:

`http://localhost:3000/admin`

The first Payload user is automatically promoted to the `admin` role. Later team members default to `editor` unless an administrator assigns another role.

## Styling rule: no Tailwind

Tailwind is intentionally not part of this project.

Public-site styling will use:

- Standard CSS
- CSS Modules for component-level styles
- CSS custom properties for design tokens
- Native modern CSS layout and responsive features

Do not introduce Tailwind, Tailwind UI, utility-class styling systems, or generated utility frameworks without an explicit project decision.

Payload Admin keeps its own styling system and may use the existing `src/app/(payload)/custom.scss` for carefully scoped admin customizations.

## Payload schema workflow

Schema source lives in:

- `src/collections/`
- `src/globals/`
- `src/fields/`
- `src/access/`
- `src/payload.config.ts`

After a schema change, regenerate types:

```powershell
pnpm generate:types:payload
```

When the D1 database shape changes, create a migration with a descriptive name:

```powershell
pnpm payload migrate:create descriptive-name
```

Then validate:

```powershell
pnpm lint
pnpm typecheck
```

Generated Payload types and migrations are committed to Git because they are part of the deployable application contract.

Do not hand-edit `src/payload-types.ts` or generated migration snapshots.

## Cloudflare architecture

Production persistence is intentionally separated:

- D1: structured CMS records
- R2: uploaded photography and media
- Cloudflare Worker/OpenNext: Next.js + Payload runtime

Do not replace production D1 with a local SQLite file.

For local production-build validation, set `CLOUDFLARE_REMOTE_BINDINGS=false`. In that mode, Next.js build workers are intentionally serialized because local D1 is SQLite-backed and concurrent page-data workers can otherwise hit `SQLITE_BUSY`. Real Cloudflare deployment keeps remote bindings enabled and normal build parallelism unless explicitly overridden.

The starter deliberately disables Sharp-dependent upload transforms because the target runtime is Cloudflare Workers. Image presentation/optimization decisions belong in the frontend layer.

## Access-control rules

- Public visitors may read public site content.
- Draft-enabled collections expose only published documents publicly.
- Authenticated CMS users can manage content.
- User management is administrator-only in the Admin UI.
- Editors cannot promote themselves or change roles.
- Enquiries are not writable through the anonymous Payload REST API.
- The future public enquiry flow must validate input server-side before using trusted server-side Payload access.
- Never trust public form input.
- Never commit `.env`, production secrets, Cloudflare credentials, or service tokens.
- When a Local API operation acts on behalf of a signed-in user, use `overrideAccess: false` so Payload access control is enforced.

## Design implementation rules

These become active in Chat 2:

- Build reusable primitives before page-specific duplication.
- Never hard-code a specific makeup artist identity when it belongs in Payload Site Settings.
- Keep public-site styling isolated from Payload Admin styling.
- Prefer native CSS/platform capabilities before adding UI dependencies.
- Every animation dependency must justify its cost.
- Every major layout must be verified on mobile, tablet, laptop, and wide desktop.

## Quality checks

Before a normal development commit is considered healthy:

```powershell
pnpm lint
pnpm typecheck
```

Before promoting a release to `main`, also run the appropriate tests and production build checks for that milestone.

GitHub Actions runs lint, TypeScript checks, and a production Next.js build on development pushes and pull requests.
