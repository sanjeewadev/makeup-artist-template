import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import React from 'react'

import { PreviewBanner } from '@/components/site/PreviewBanner'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { getShellData } from '@/lib/site-data'

import './styles.css'

const displayFont = Cormorant_Garamond({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

const sansFont = Manrope({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
})

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getShellData()
  const defaultSEO = siteSettings?.defaultSEO
  const siteName = siteSettings?.siteName || siteSettings?.artistName || 'Makeup Artist Portfolio'

  return {
    description:
      defaultSEO?.description ||
      siteSettings?.shortDescription ||
      'Editorial makeup artistry for weddings, portraits, campaigns, and modern occasions.',
    robots: defaultSEO?.noIndex ? { index: false, follow: false } : undefined,
    title: {
      default: defaultSEO?.title || siteName,
      template: '%s — ' + siteName,
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [{ navigation, siteSettings }, preview] = await Promise.all([
    getShellData(),
    draftMode(),
  ])

  return (
    <html className={displayFont.variable + ' ' + sansFont.variable} lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-frame">
          {preview.isEnabled && <PreviewBanner />}
          <SiteHeader navigation={navigation} siteSettings={siteSettings} />
          <main id="main-content">{children}</main>
          <SiteFooter navigation={navigation} siteSettings={siteSettings} />
        </div>
      </body>
    </html>
  )
}
