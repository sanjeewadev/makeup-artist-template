# Architecture

## Runtime

The project is a single Next.js application with Payload embedded directly into the Next.js runtime.

```text
Browser
  |
  v
Next.js + Payload
  |          |
  |          +--> /admin
  |
  +--> Public routes
  |
  +--> Payload Local / REST / GraphQL APIs
             |
             +--> Cloudflare D1 (structured data)
             |
             +--> Cloudflare R2 (uploaded media)
```

Production deployment targets Cloudflare through OpenNext.

## Source layout

```text
src/
├── access/                 Reusable Payload access policies
├── app/
│   ├── (frontend)/         Public Next.js site
│   └── (payload)/          Payload Admin/API routes
├── collections/            Payload collection schemas
├── fields/                 Reusable field factories
├── globals/                Single-instance page/site content
├── migrations/             Generated D1 schema migrations
├── payload-types.ts        Generated Payload TypeScript contract
└── payload.config.ts       Payload registration + D1/R2 adapters
```

## Content architecture

The public website is not driven by arbitrary visual blocks.

Payload owns content and editorial choices. Next.js owns presentation.

This separation gives the client useful control while protecting the premium design system from accidental layout changes.

## Persistence

### Cloudflare D1

D1 is the authoritative production store for:

- Users/authentication records
- Portfolio content
- Services
- Testimonials
- Journal
- Enquiries
- Globals/settings
- Draft/version records
- Payload internal records

Database changes are versioned through committed Payload migrations.

### Cloudflare R2

R2 is the authoritative production object store for uploaded images.

Payload's R2 storage adapter connects the `media` collection to the configured R2 binding.

## Security boundary

Anonymous visitors can consume intentionally public content. Draft content and business/private records are protected at the Payload collection layer.

The public enquiry form planned for Chat 4 will not expose anonymous collection-level write access. It will pass validated form data through trusted server-side code into Payload.

## Styling boundary

Tailwind is prohibited by project decision.

- Public frontend: CSS + CSS Modules + CSS custom properties
- Payload Admin: Payload UI plus narrowly scoped custom SCSS when needed

## Current milestone boundary

Chat 1 establishes data, CMS, access, migration, generated types, documentation, and quality checks.

Visual design, typography, public navigation/footer, homepage rendering, and frontend transitions are intentionally deferred to Chat 2.
