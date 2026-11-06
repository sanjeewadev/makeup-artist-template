'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { Media } from '@/payload-types'

import styles from './CmsImage.module.css'

type CmsImageProps = {
  className?: string
  image: Media | number | null | undefined
  priority?: boolean
  sizes?: string
}

export function CmsImage({
  className,
  image,
  priority = false,
  sizes = '100vw',
}: CmsImageProps) {
  const [loaded, setLoaded] = useState(false)

  if (!image || typeof image === 'number' || !image.url) return null

  const classes = [styles.image, loaded ? styles.loaded : '', className].filter(Boolean).join(' ')

  return (
    <Image
      alt={image.alt}
      className={classes}
      data-loaded={loaded ? 'true' : 'false'}
      fill
      onLoad={() => setLoaded(true)}
      priority={priority}
      sizes={sizes}
      src={image.url}
    />
  )
}
