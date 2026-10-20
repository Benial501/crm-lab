type PictureProps = {
  /** Percorso senza suffisso di larghezza, es. "/img/progetto-dashboard". */
  base: string
  widths: number[]
  alt: string
  sizes?: string
  className?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  position?: string
  width?: number
  height?: number
}

/**
 * Immagine responsive in WebP con fallback JPEG.
 * Le varianti sono generate in fase di preparazione degli asset.
 */
export function Picture({
  base,
  widths,
  alt,
  sizes = '100vw',
  className,
  loading = 'lazy',
  fetchPriority = 'auto',
  position,
  width,
  height,
}: PictureProps) {
  const srcset = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ')
  const fallback = `${base}-${widths[widths.length - 1]}.jpg`

  return (
    <picture>
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={fallback}
        srcSet={srcset('jpg')}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
        width={width}
        height={height}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  )
}
