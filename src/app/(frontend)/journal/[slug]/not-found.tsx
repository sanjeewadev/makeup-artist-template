import Link from 'next/link'

export default function JournalNotFound() {
  return (
    <section
      style={{
        margin: '0 auto',
        maxWidth: 'var(--site-max)',
        padding: 'var(--section-space) var(--gutter)',
      }}
    >
      <p>Journal / 404</p>
      <h1>That story is no longer available.</h1>
      <p>The journal may have been updated or this link may be out of date.</p>
      <Link href="/journal">Return to the journal →</Link>
    </section>
  )
}
