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

function NavLink({
  index,
  label,
  newTab,
  showIndex = false,
  url,
}: {
  index?: number
  label: string
  newTab?: boolean | null
  showIndex?: boolean
  url: string
}) {
  const content = (
    <>
      {showIndex && typeof index === 'number' && (
        <span aria-hidden="true" className={styles.navIndex}>
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <span>{label}</span>
    </>
  )

  if (isExternal(url) || newTab) {
    return (
      <a href={url} rel={newTab ? 'noreferrer' : undefined} target={newTab ? '_blank' : undefined}>
        {content}
      </a>
    )
  }

  return <Link href={url}>{content}</Link>
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
          <small>Beauty / Artistry</small>
        </Link>

        <nav aria-label="Primary navigation" className={styles.desktopNav}>
          {links.map((link, index) => (
            <NavLink index={index} key={link.label + '-' + link.url} {...link} />
          ))}
        </nav>

        <div className={styles.desktopCTA}>
          <LinkButton href={ctaURL} variant="text">
            {ctaLabel}
          </LinkButton>
        </div>

        <details className={styles.mobileNav}>
          <summary aria-label="Open navigation">
            <span>Menu</span>
            <span aria-hidden="true" className={styles.menuMark}>
              <i />
              <i />
            </span>
          </summary>

          <div className={styles.mobilePanel}>
            <div className={styles.mobileTopline}>
              <span>Navigation</span>
              <span>{brand}</span>
            </div>

            <nav aria-label="Mobile navigation">
              {links.map((link, index) => (
                <NavLink
                  index={index}
                  key={link.label + '-' + link.url}
                  showIndex
                  {...link}
                />
              ))}
            </nav>

            <div className={styles.mobileBottom}>
              <p>Refined makeup for weddings, editorial work and modern occasions.</p>
              <LinkButton className={styles.mobileCTA} href={ctaURL} variant="outline">
                {ctaLabel}
              </LinkButton>
            </div>
          </div>
        </details>
      </div>
    </header>
  )
}
