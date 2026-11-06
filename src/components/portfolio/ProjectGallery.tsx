import { CmsImage } from '@/components/media/CmsImage'
import type { Media, PortfolioProject } from '@/payload-types'

import styles from './ProjectGallery.module.css'

type GalleryItem = NonNullable<PortfolioProject['gallery']>[number]

type ProjectGalleryProps = {
  gallery: PortfolioProject['gallery']
}

const mediaFrom = (value: GalleryItem['image']): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

const layoutClass = (item: GalleryItem, index: number) => {
  if (item.presentation === 'wide') return styles.wide
  if (item.presentation === 'portrait') return styles.portrait
  if (item.presentation === 'landscape') return styles.landscape

  const pattern = index % 6

  if (pattern === 0 || pattern === 5) return styles.wide
  if (pattern === 1 || pattern === 3) return styles.portrait

  return styles.landscape
}

export function ProjectGallery({ gallery }: ProjectGalleryProps) {
  if (!gallery?.length) return null

  return (
    <div className={styles.gallery}>
      {gallery.map((item, index) => {
        const image = mediaFrom(item.image)

        if (!image) return null

        return (
          <figure
            className={styles.figure + ' ' + layoutClass(item, index)}
            key={item.id || String(index)}
          >
            <div className={styles.imageFrame}>
              <CmsImage
                image={image}
                sizes={
                  item.presentation === 'wide' || index % 6 === 0
                    ? '(max-width: 760px) 100vw, 90vw'
                    : '(max-width: 760px) 100vw, 48vw'
                }
              />
            </div>
            {(item.caption || image.credit) && (
              <figcaption>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{item.caption || image.alt}</span>
                {image.credit && <span>{image.credit}</span>}
              </figcaption>
            )}
          </figure>
        )
      })}
    </div>
  )
}
