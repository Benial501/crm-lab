type IconProps = {
  name:
    | 'arrow'
    | 'arrow-down'
    | 'window'
    | 'layers'
    | 'bars'
    | 'code'
    | 'bag'
    | 'flow'
    | 'panel'
    | 'menu'
    | 'close'
    | 'check'
    | 'play'
    | 'mail'
    | 'instagram'
    | 'tiktok'
    | 'whatsapp'
  size?: number
  className?: string
}

/**
 * Glifi disegnati per questo sito: tratto 1px, nessun arrotondamento,
 * stessa logica di linea dei separatori di sezione.
 */
export function Icon({ name, size = 16, className }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    'aria-hidden': true as const,
    focusable: 'false' as const,
    className,
  }

  switch (name) {
    case 'arrow':
      return (
        <svg {...common}>
          <path d="M4 12h15.5M13.5 6l6 6-6 6" />
        </svg>
      )
    case 'arrow-down':
      return (
        <svg {...common}>
          <path d="M12 4v15.5M6 13.5l6 6 6-6" />
        </svg>
      )
    case 'code':
      return (
        <svg {...common}>
          <rect x="2.5" y="4" width="19" height="16" rx="1.5" />
          <path d="M2.5 8h19" />
          <path d="m9.5 12.5-2 2 2 2M14.5 12.5l2 2-2 2" />
        </svg>
      )
    case 'bag':
      return (
        <svg {...common}>
          <path d="M4 7.5h16l-1.1 12a1.5 1.5 0 0 1-1.5 1.35H6.6A1.5 1.5 0 0 1 5.1 19.5Z" />
          <path d="M8.75 10V6.25a3.25 3.25 0 0 1 6.5 0V10" />
        </svg>
      )
    case 'flow':
      return (
        <svg {...common}>
          <circle cx="5.5" cy="6" r="2.5" />
          <circle cx="18.5" cy="12" r="2.5" />
          <circle cx="5.5" cy="18" r="2.5" />
          <path d="M8 6h4.5a2 2 0 0 1 2 2v1.6M8 18h4.5a2 2 0 0 0 2-2v-1.6" />
        </svg>
      )
    case 'panel':
      return (
        <svg {...common}>
          <rect x="2.5" y="4" width="19" height="16" rx="1.5" />
          <path d="M9 4v16" />
          <path d="M12.5 9h6M12.5 13h6M12.5 17h3.5" />
        </svg>
      )
    case 'window':
      return (
        <svg {...common}>
          <rect x="2.5" y="4.5" width="19" height="14" />
          <path d="M2.5 8.5h19M19 15.5v0" />
          <path d="M8 22h8" />
        </svg>
      )
    case 'layers':
      return (
        <svg {...common}>
          <path d="M12 3 2.5 8 12 13l9.5-5L12 3Z" />
          <path d="M2.5 13 12 18l9.5-5" />
          <path d="M2.5 17.5 12 22.5l9.5-5" />
        </svg>
      )
    case 'bars':
      return (
        <svg {...common}>
          <path d="M3 20.5h18" />
          <path d="M6.5 20.5V13M12 20.5V5M17.5 20.5V9.5" />
        </svg>
      )
    case 'menu':
      return (
        <svg {...common}>
          <path d="M3 8h18M3 16h18" />
        </svg>
      )
    case 'close':
      return (
        <svg {...common}>
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      )
    case 'play':
      /* Triangolo pieno: a 16 px due linee incrociate si impastano,
         come per la cornetta di WhatsApp. */
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M7 4.5v15l13-7.5z" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common}>
          <path d="M4 12.5 9.5 18 20 6.5" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...common}>
          <rect x="2.5" y="5" width="19" height="14" />
          <path d="m2.5 6.5 9.5 7 9.5-7" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.1" />
          <circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'tiktok':
      // Nota musicale ridisegnata a filo, nello stesso tratto delle altre icone.
      return (
        <svg {...common}>
          <path d="M12.2 3.3v12.9a3.6 3.6 0 1 1-3.6-3.6c.37 0 .73.06 1.07.17" />
          <path d="M12.2 3.3c.33 2.76 2.52 4.92 5.3 5.2" />
        </svg>
      )
    case 'whatsapp':
      // Bolla a filo, cornetta piena: a 18 px due tratti sottili si impasterebbero.
      return (
        <svg {...common}>
          <path d="M20.4 11.7a8.4 8.4 0 0 1-12.5 7.3L3.6 20.3l1.4-4.2a8.4 8.4 0 1 1 15.4-4.4Z" />
          <path
            d="M9.3 7.9c.4 0 .75.22.92.58l.83 1.76c.16.34.09.74-.18 1l-.72.72a6.3 6.3 0 0 0 2.72 2.72l.72-.72c.26-.27.66-.34 1-.18l1.76.83c.36.17.58.52.58.92v1.3c0 .6-.5 1.08-1.1 1.03a9.8 9.8 0 0 1-8.56-8.56c-.05-.6.43-1.1 1.03-1.1Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      )
  }
}
