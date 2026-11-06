# Journal and CMS Experience

## Journal

Public routes:

- `/journal`
- `/journal/[slug]`

The Journal is intentionally editorial rather than a generic blog grid.

Each published post supports:

- title
- slug
- excerpt
- featured image
- rich-text article body
- publication date
- featured flag
- tags
- SEO title/description/social image/no-index

The first featured post receives the lead treatment on the Journal index. If no post is marked featured, the newest published post becomes the lead story.

Article pages include:

- article metadata
- reading-time estimate
- tags
- editorial hero
- rich-text content
- enquiry CTA
- next-story navigation
- Open Graph metadata
- Article structured data

The first publication timestamp is filled automatically when a Journal post is published for the first time.

## Draft preview

Draft preview is enabled for:

- Journal posts
- Portfolio projects
- Services

Payload's Preview button points to the same Next.js application and enters Next.js Draft Mode through `/preview`.

Normal visitors continue to receive published-only content.

A visible preview banner appears while Draft Mode is active. The Exit Preview action clears Draft Mode and returns to the public site.

### Local setup

Add a preview secret to `.env`:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the generated value into:

```text
PREVIEW_SECRET=your-generated-secret
```

If `PREVIEW_SECRET` is missing, Payload does not generate preview links.

Use the same secret in the production Cloudflare environment when preview is required there.

Never commit the real secret.

## SEO

The project now provides:

- page metadata
- per-Journal-post metadata
- Open Graph article metadata
- Article structured data
- dynamic `/sitemap.xml`
- `/robots.txt`

Set the canonical site origin with:

```text
NEXT_PUBLIC_SITE_URL=https://example.com
```

The sitemap includes public static pages, published portfolio projects, and published Journal posts.

Admin/API/preview routes are blocked from crawler indexing through robots rules.

## Payload Admin organization

The client-facing admin is grouped by task:

- Website Pages
- Portfolio
- Services & Reviews
- Journal
- Media Library
- Business
- Site Settings
- Team

API URLs are hidden from normal content edit screens where they are unnecessary.

The Admin dashboard contains shortcuts for:

- homepage editing
- portfolio management
- Journal writing
- enquiry management

The login/navigation graphics use the Studio CMS white-label treatment.

## Editing guidance

Important fields include inline descriptions explaining where content appears and how it should be used.

Editors should prefer:

1. Draft
2. Preview
3. Publish

for Journal, Portfolio, and Service content.

For photography, always provide useful Alternative Text in Media.

For Journal content, use headings to create a clear article structure rather than styling paragraphs manually.

For SEO fields, leave overrides blank unless there is a specific reason to replace the natural page title/excerpt/featured image.

## Import map

Custom Payload admin components are registered in:

`src/app/(payload)/admin/importMap.js`

If custom Payload components are added or their config paths change, regenerate the import map:

```powershell
pnpm generate:importmap
```

## Scope boundary

The five requested development chats are now complete.

Production deployment, production-domain configuration, real client content population, analytics, and an optional production email notification adapter are separate release/handoff tasks.
