import Link from 'next/link'

import type { Navigation, SiteSetting } from '@/payload-types'
import { LinkButton } from '@/components/ui/LinkButton'

import styles from './SiteHeader.module.css'

type SiteHeaderProps = {
  navigation: Navigation | null
  siteSettings: SiteSetting | null
}

const fallbackLinks = [
  { label: 'Portfolio', url: '/portfolio' },
  { label: 'Services', url: '/services' },
  { label: 'About', url: '/about' },
  { label: 'Journal', url: '/journal' },
  { label: 'Contact', url: '/contact' },
]

const isExternal = (url: string) => /^https?:\/\//i.test(url)

function NavLink({ label, newTab, url }: { label: string; newTab?: boolean | null; url: string }) {
  if (isExternal(url) || newTab) {
    return (
      <a href={url} rel={newTab ? 'noreferrer' : undefined} target={newTab ? '_blank' : undefined}>
        {label}
      </a>
    )
  }

  return <Link href={url}>{label}</Link>
}

export function SiteHeader({ navigation, siteSettings }: SiteHeaderProps) {
  const links = navigation?.headerLinks?.length ? navigation.headerLinks : fallbackLinks
  const brand = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const ctaLabel = navigation?.primaryCTA?.label || 'Enquire'
  const ctaURL = navigation?.primaryCTA?.url || '/contact'

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link aria-label={brand + ' home'} className={styles.brand} href="/">
          <span>{brand}</span>
          <small>Makeup artistry</small>
        </Link>

        <nav aria-label="Primary navigation" className={styles.desktopNav}>
          {links.map((link) => (
            <NavLink key={link.label + '-' + link.url} {...link} />
          ))}
        </nav>

        <div className={styles.desktopCTA}>
          <LinkButton href={ctaURL} variant="outline">
            {ctaLabel}
          </LinkButton>
        </div>

        <details className={styles.mobileNav}>
          <summary aria-label="Open navigation">
            <span>Menu</span>
            <span aria-hidden="true" className={styles.menuMark}>
              +
            </span>
          </summary>
          <div className={styles.mobilePanel}>
            <nav aria-label="Mobile navigation">
              {links.map((link) => (
                <NavLink key={link.label + '-' + link.url} {...link} />
              ))}
            </nav>
            <LinkButton className={styles.mobileCTA} href={ctaURL}>
              {ctaLabel}
            </LinkButton>
          </div>
        </details>
      </div>
    </header>
  )
}
