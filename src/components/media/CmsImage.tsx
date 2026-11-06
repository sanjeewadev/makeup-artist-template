import Image from 'next/image'

import type { Media } from '@/payload-types'

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
  if (!image || typeof image === 'number' || !image.url) return null

  return (
    <Image
      alt={image.alt}
      className={className}
      fill
      priority={priority}
      sizes={sizes}
      src={image.url}
    />
  )
}
