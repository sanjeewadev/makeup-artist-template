# Development Guide

## Branches

Active development happens on `dev`.

Do not develop directly on `main`.

To set up the local tracking branch after cloning or after `dev` is created remotely:

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

At the current baseline:

- Node: `^22.23.4 || >=24.22.1`
- pnpm: `^9 || ^10 || ^11`

Verify before debugging dependency or Cloudflare issues:

```powershell
node -v
pnpm -v
```

## Local development

```powershell
pnpm install
pnpm dev
```

Frontend:

`http://localhost:3000`

Payload admin:

`http://localhost:3000/admin`

## Payload schema workflow

Whenever collection/global fields change:

1. Update the schema.
2. Generate Payload/Cloudflare types as appropriate.
3. Create/update migrations when the database schema changes.
4. Run lint/tests.
5. Commit generated schema artifacts that belong in the repository.

Relevant scripts are defined in `package.json`.

## Cloudflare architecture

Production persistence is intentionally separated:

- D1: CMS records and structured content
- R2: uploaded photography and media
- Worker/OpenNext: Next.js + Payload runtime

Do not replace this with a local SQLite file in production.

## Security rules

- Never commit `.env` or real secrets.
- Keep `.env.example` limited to safe placeholders.
- Public CMS reads should be explicitly allowed where required.
- CMS writes remain authenticated.
- When Payload Local API calls operate on behalf of a user, use `overrideAccess: false`.
- Validate all public form input server-side.

## Design implementation rules

- Build reusable primitives before page-specific duplication.
- Avoid hard-coded artist identity; use Payload globals for brand/contact data.
- Keep public-page styling independent from Payload admin styling.
- Prefer CSS and platform capabilities before adding large UI libraries.
- Any animation dependency must earn its cost.
- Every major layout must be verified at mobile, tablet, laptop, and wide desktop sizes.

## Before merging to main

At minimum:

```powershell
pnpm lint
pnpm test
pnpm build
```

Cloudflare deployment checks are added as production configuration is finalized.
