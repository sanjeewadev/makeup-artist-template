# Editorial Journal & Serious SEO

## Goal

Chat 12 turns the Journal into a real editorial authority surface and makes the public site technically consistent for search, social sharing, and structured data.

The strategy is deliberately simple:

**publish useful original content → organize it clearly → link it to real work/services → expose clean metadata → avoid duplicate/thin search surfaces**

## Journal editorial model

The Journal is not a generic blog feed.

It should contain material that helps a real client understand:

- preparation
- skin / finish
- bridal timing
- editorial thinking
- beauty decisions
- behind-the-scenes practice
- what to expect from the service
- how photography/light changes the makeup approach

The best article should be useful even if the reader never books.

## Journal index

### Featured story

The featured story remains the primary editorial lead.

It includes:

- editorial image
- headline
- excerpt
- publication date
- reading time
- topic labels

### Editorial desk

The archive now has reader-facing topic discovery.

Topic filters:

- do not create separate query-string URLs
- do not create duplicate indexable pages
- use the existing Journal tag data
- show article counts
- filter the already published archive client-side

This keeps discovery useful without creating thin SEO category pages.

## Topic rules

Tags now have two jobs:

1. reader discovery
2. related-story matching

Use a small, consistent vocabulary.

Good examples:

- Bridal
- Skin
- Preparation
- Editorial
- Photography
- Behind the Scenes
- Occasion

Avoid near-duplicates such as:

- Bridal
- Brides
- Bride Makeup
- Bridal Makeup Tips
- Wedding Makeup

unless they genuinely describe different content systems.

Tags are not a place for keyword stuffing.

## Related reading

Article pages calculate related stories from shared topics.

When topic overlap exists, those stories are prioritized.

When it does not, recent Journal stories provide a graceful fallback.

This creates better:

- internal linking
- reader depth
- topic authority
- content discovery

without requiring a new CMS relationship field.

## Article authority

Each article now exposes stronger context:

- author / artist
- publication date
- reading time
- topic labels
- About-the-artist link
- related reading
- Services bridge
- availability bridge
- next Journal story

The article should remain editorial first and commercial second.

## Article writing rules

### Title

Write the human-facing headline first.

It should clearly communicate what the reader gains.

Do not force the primary keyword into awkward wording.

### Excerpt

Use 1–2 useful sentences.

The excerpt should explain:

- what the article covers
- why the reader should care

It becomes the fallback meta description when there is no SEO override.

### Content

Use descriptive headings.

Prefer:

- firsthand experience
- concrete observations
- real process knowledge
- practical advice
- specific examples

Avoid:

- filler written only for length
- repeating the same phrase for SEO
- generic AI-style introductions
- claims the artist cannot support

### Featured image

Use article-specific photography where possible.

Avoid reusing the same bridal hero image across many Journal articles.

## SEO field rules

### Meta title

Optional.

Use when the editorial headline is too long or unclear for search/share contexts.

A practical target is roughly 50–60 characters, but clarity matters more than exact length.

### Meta description

Optional.

Use natural language that explains the page value.

A practical target is roughly 140–160 characters.

Do not list keywords.

### Social sharing image

Optional.

Recommended:

- landscape crop
- roughly 1.91:1
- approximately 1200×630 when available

If omitted, page/featured photography remains the fallback.

### No index

Use intentionally.

Draft content is already protected.

Use no-index for public content that should remain accessible but should not be surfaced by search engines.

## Canonical URL system

The public origin is controlled by:

`NEXT_PUBLIC_SITE_URL`

Example:

`https://artistname.com`

It is used for:

- metadata base
- canonical URLs
- structured data URLs
- sitemap
- robots
- absolute social image URLs

Set the real production domain before launch.

The URL helper automatically adds `https://` if the configured value omits a protocol.

## Canonical coverage

Canonical metadata now exists for:

- Home
- Portfolio
- Portfolio projects
- Services
- About
- Journal
- Journal articles
- Contact

The Contact canonical remains `/contact` even when a service query parameter is present, preventing service-prefill URLs from becoming duplicate indexed pages.

## OpenGraph and Twitter

Global defaults come from Site Settings.

Pages can override:

- title
- description
- social image

Journal articles and Portfolio projects use their own SEO image first, then their page photography.

Local Payload media URLs are converted to absolute public URLs for metadata.

## Structured data

### Global WebSite

The layout publishes WebSite structured data using the configured public site URL.

### Artist / Person

The layout publishes Person structured data using:

- artist name
- site description / tagline
- email when available
- About URL
- service area
- real social profiles

### Journal article

Journal articles publish BlogPosting structured data containing:

- headline
- description
- author
- publisher
- publication date
- modified date
- image
- topics
- canonical main-entity URL

### Breadcrumbs

Journal articles also publish BreadcrumbList structured data:

Home → Journal → Article

## Draft safety

Journal and Portfolio draft previews explicitly return:

- noindex
- nofollow

even when the content-level SEO checkbox is not set.

This protects CMS preview work from accidental indexing.

## Sitemap

The dynamic sitemap includes:

- Home
- Portfolio
- Services
- About
- Journal
- Contact
- published Portfolio projects
- published Journal stories

It excludes:

- Portfolio projects marked no-index
- Journal stories marked no-index
- About when About SEO is no-index
- Contact when Contact SEO is no-index

If Site Settings default SEO is globally no-indexed, the dynamic sitemap returns no public entries.

## Robots

The robots route blocks:

- /admin/
- private /api/ routes
- /preview

Important exception:

`/api/media/file/`

is explicitly allowed.

Payload public images are served through that route, so blocking all `/api/` traffic would prevent search crawlers from fetching portfolio and article photography.

## Site Settings default SEO

Site Settings is the fallback metadata source.

The default SEO image becomes the global social-sharing fallback.

Be careful with:

**Hide from search engines**

inside Site Settings default SEO.

It acts as the site-wide fallback no-index signal and also suppresses dynamic sitemap entries.

## Search-quality principle

The site should not try to rank by creating dozens of shallow pages.

Prefer:

- five excellent Journal articles
- clear Portfolio case studies
- useful service explanations
- strong internal links
- accurate metadata

over fifty thin keyword pages.

## Pre-launch SEO checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS domain.
2. Confirm Site Settings site name / artist name.
3. Add a real default SEO description.
4. Add a real default social image.
5. Confirm global no-index is OFF for launch.
6. Review About/Contact no-index settings.
7. Replace demo Journal content.
8. Publish genuinely useful Journal articles.
9. Keep topic labels consistent.
10. Confirm every Journal featured image has useful alt text.
11. Confirm social images crop well.
12. Confirm Portfolio project SEO titles/descriptions where useful.
13. Visit `/robots.txt`.
14. Visit `/sitemap.xml`.
15. Confirm the production domain appears in canonical URLs.
16. Submit the sitemap through the search-engine tools used by the client after launch.

## Commercial principle

SEO is not a separate decorative feature.

The strongest search strategy for this site is the same strategy that makes it valuable to humans:

**real expertise, clear structure, strong photography, useful answers, and credible work.**
