import { Icon } from './Icon'
import { channelDisplay, channelHref, channels, configuredChannels, type Channel } from '../data/site'
import './Channels.css'

const icons = {
  whatsapp: 'whatsapp',
  email: 'mail',
  instagram: 'instagram',
  tiktok: 'tiktok',
} as const

type ChannelsProps = {
  /** 'icons' per una riga di sole icone, 'list' per icona, nome e recapito. */
  variant?: 'icons' | 'list'
  size?: number
  className?: string
  /**
   * Mostra soltanto i canali già configurati. Serve dove un'icona senza
   * destinazione non spiegherebbe nulla: piè di pagina e menu del telefono.
   */
  configuredOnly?: boolean
}

/**
 * I canali di contatto del sito.
 * Un canale senza valore in site.ts resta visibile ma non cliccabile:
 * l'icona c'è, il collegamento si attiva da solo appena il dato è disponibile.
 */
export function Channels({ variant = 'icons', size = 18, className, configuredOnly }: ChannelsProps) {
  const classes = ['channels', `channels--${variant}`, className].filter(Boolean).join(' ')
  const list = configuredOnly ? configuredChannels() : channels

  if (list.length === 0) return null

  return (
    <ul className={classes}>
      {list.map((channel) => (
        <li key={channel.id}>
          <ChannelItem channel={channel} variant={variant} size={size} />
        </li>
      ))}
    </ul>
  )
}

function ChannelItem({
  channel,
  variant,
  size,
}: {
  channel: Channel
  variant: 'icons' | 'list'
  size: number
}) {
  const href = channelHref(channel)
  const external = channel.id === 'instagram' || channel.id === 'tiktok' || channel.id === 'whatsapp'

  const content = (
    <>
      <span className="channel__glyph">
        <Icon name={icons[channel.id]} size={size} />
      </span>
      {variant === 'list' ? (
        <span className="channel__text">
          <span className="channel__label">{channel.label}</span>
          <span className="channel__value">{channelDisplay(channel)}</span>
        </span>
      ) : (
        <span className="visually-hidden">{channel.label}</span>
      )}
    </>
  )

  if (!href) {
    return (
      <span
        className="channel channel--pending"
        aria-label={`${channel.label}: canale in attivazione, collegamento non ancora disponibile`}
      >
        {content}
      </span>
    )
  }

  return (
    <a
      className="channel"
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {content}
    </a>
  )
}
