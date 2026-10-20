import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { Picture } from './Picture'
import type { Video } from '../data/projects'
import './VideoFigure.css'

type VideoFigureProps = {
  video: Video
  /** Didascalia sotto il riquadro. Senza, il riquadro resta nudo. */
  caption?: string
  /** `sizes` della copertina: la stessa misura che occuperà il riquadro. */
  sizes?: string
  /** La copertina della prima scheda è l'immagine più grande della pagina. */
  priority?: boolean
  className?: string
}

/**
 * Un video di presentazione dentro una scheda.
 *
 * Finché non si preme Play non si scarica niente: a video fermo in pagina
 * c'è solo la copertina, che è un'immagine come le altre. Il file vero
 * parte al clic — quindi con un gesto dell'utente, e con l'audio acceso,
 * come vuole il browser.
 *
 * Il riquadro ha la proporzione del video (16/9) ed è il video ad
 * adattarsi dentro: nessuna deformazione a nessuna larghezza.
 */
export function VideoFigure({
  video,
  caption,
  sizes = '100vw',
  priority = false,
  className,
}: VideoFigureProps) {
  const [playing, setPlaying] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)

  // Il <video> compare solo dopo il clic: lo si avvia appena è montato,
  // così il gesto dell'utente vale ancora e l'audio non viene bloccato.
  useEffect(() => {
    if (playing) ref.current?.play().catch(() => {})
  }, [playing])

  return (
    <figure className={className ? `vfig ${className}` : 'vfig'}>
      <div className="vfig__frame">
        {playing ? (
          <video
            ref={ref}
            className="vfig__video"
            src={video.src}
            poster={`${video.poster}-1280.jpg`}
            controls
            playsInline
            preload="auto"
          />
        ) : (
          <button type="button" className="vfig__cover" onClick={() => setPlaying(true)}>
            <Picture
              base={video.poster}
              widths={video.posterWidths}
              alt={video.posterAlt}
              sizes={sizes}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              className="vfig__poster"
            />
            <span className="vfig__play">
              <Icon name="play" size={22} />
            </span>
            <span className="vfig__label">
              Guarda la presentazione
              <span className="vfig__time">{video.duration}</span>
            </span>
          </button>
        )}
      </div>
      {caption && <figcaption className="t-small">{caption}</figcaption>}
    </figure>
  )
}
