import Link from 'next/link'

import type { Navigation, SiteSetting } from '@/payload-types'
import { LinkButton } from '@/components/ui/LinkButton'

import styles from './SiteFooter.module.css'

type SiteFooterProps = {
  navigation: Navigation | null
  siteSettings: SiteSetting | null
}

const fallbackLinks = [
  { label: 'Portfolio', url: '/portfolio' },
  { label: 'Services', url: '/services' },
  { label: 'About', url: '/about' },
  { label: 'Contact', url: '/contact' },
]

const isExternal = (url: string) => /^https?:\/\//i.test(url)

export function SiteFooter({ navigation, siteSettings }: SiteFooterProps) {
  const brand = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const links = navigation?.footerLinks?.length ? navigation.footerLinks : fallbackLinks
  const email = siteSettings?.contact?.email
  const area = siteSettings?.contact?.serviceArea
  const socialLinks = siteSettings?.socialLinks ?? []

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <p className={styles.kicker}>Makeup artistry</p>
            <p className={styles.brand}>{brand}</p>
          </div>
          <div className={styles.invitation}>
            <p>For weddings, editorials, and beautifully considered occasions.</p>
            <LinkButton href="/contact" variant="outline">
              Start an enquiry
            </LinkButton>
          </div>
        </div>

        <div className={styles.grid}>
          <nav aria-label="Footer navigation">
            <p className={styles.label}>Explore</p>
            {links.map((link) =>
              isExternal(link.url) || link.newTab ? (
                <a
                  href={link.url}
                  key={link.label + '-' + link.url}
                  rel={link.newTab ? 'noreferrer' : undefined}
                  target={link.newTab ? '_blank' : undefined}
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.url} key={link.label + '-' + link.url}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div>
            <p className={styles.label}>Contact</p>
            {email && <a href={'mailto:' + email}>{email}</a>}
            {area && <p>{area}</p>}
            {!email && !area && <p>Available by enquiry</p>}
          </div>

          <div>
            <p className={styles.label}>Follow</p>
            {socialLinks.length ? (
              socialLinks.map((social) => (
                <a
                  href={social.url}
                  key={social.platform + '-' + social.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {social.label || social.platform}
                </a>
              ))
            ) : (
              <p>Social links can be added in Site Settings.</p>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {brand}
          </p>
          <p>{navigation?.footerNote || 'Artistry with a quiet, editorial point of view.'}</p>
        </div>
      </div>
    </footer>
  )
}
