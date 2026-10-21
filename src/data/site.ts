/* ---------------------------------------------------------------
   Configurazione del sito.
   Tutti i dati di contatto partono vuoti: vanno compilati solo con
   informazioni reali. Quello che resta vuoto non viene mostrato.
   --------------------------------------------------------------- */

export type ChannelId = 'whatsapp' | 'email' | 'instagram' | 'tiktok'

export type Channel = {
  id: ChannelId
  label: string
  /**
   * Il dato reale del canale. Finché è una stringa vuota l'icona resta visibile
   * nel sito ma non è cliccabile: nessun collegamento viene inventato.
   *
   *  whatsapp  → numero in formato internazionale, solo cifre: '393401234567',
   *              oppure il link completo (https://…) del messaggio WhatsApp
   *  email     → indirizzo: 'ciao@crmlab.it'
   *  instagram → nome utente senza chiocciola: 'crmlab'
   *  tiktok    → nome utente senza chiocciola: 'crmlab'
   */
  value: string
}

/** Costruisce il collegamento del canale, o null se non è ancora configurato. */
export function channelHref(channel: Channel): string | null {
  if (!channel.value) return null
  if (/^https?:\/\//.test(channel.value)) return channel.value
  switch (channel.id) {
    case 'whatsapp':
      return `https://wa.me/${channel.value.replace(/\D/g, '')}`
    case 'email':
      return `mailto:${channel.value}`
    case 'instagram':
      return `https://instagram.com/${channel.value.replace(/^@/, '')}`
    case 'tiktok':
      return `https://tiktok.com/@${channel.value.replace(/^@/, '')}`
  }
}

/** I canali effettivamente configurati: gli unici che diventano collegamenti. */
export function configuredChannels(): Channel[] {
  return channels.filter((channel) => Boolean(channel.value))
}

/** Testo mostrato accanto all'icona. Senza valore dichiara l'attesa, senza inventare recapiti. */
export const CHANNEL_PENDING = 'In attivazione'

export function channelDisplay(channel: Channel): string {
  if (!channel.value) return CHANNEL_PENDING
  switch (channel.id) {
    case 'whatsapp':
      return /^https?:\/\//.test(channel.value) ? 'Scrivimi su WhatsApp' : `+${channel.value.replace(/\D/g, '')}`
    case 'email':
      return channel.value
    case 'instagram':
    case 'tiktok':
      return `@${channel.value.replace(/^@/, '')}`
  }
}

/**
 * I quattro canali del sito, nell'ordine in cui compaiono.
 * Per attivarne uno basta riempire `value`: l'icona diventa un collegamento
 * vero in footer, nella sezione contatti e nel menu del telefono.
 */
export const channels: Channel[] = [
  { id: 'whatsapp', label: 'WhatsApp', value: 'https://api.whatsapp.com/message/JNHZKUNROQD2J1?autoload=1&app_absent=0' },
  { id: 'email', label: 'Email', value: 'support@crm-lab.it' },
  { id: 'instagram', label: 'Instagram', value: 'crm._.lab' },
  { id: 'tiktok', label: 'TikTok', value: 'crmlab3' },
]

export const site = {
  name: 'CRM LAB',
  tagline: 'Sviluppo digitale su misura.',
  description:
    'Studio di sviluppo digitale indipendente: siti web, e-commerce, automazioni AI e gestionali costruiti sulle esigenze dell’azienda.',

  /** Telefono fisso, se diverso dal numero WhatsApp. Lasciare null finché non c'è. */
  phone: null as string | null,
  /** Città o area di lavoro, se la si vuole dichiarare. */
  location: null as string | null,
  /** Dati legali da pubblicare in footer quando disponibili (P. IVA, ragione sociale). */
  legal: null as string | null,

  /**
   * Endpoint a cui inviare il modulo contatti (POST JSON).
   * Di base è la funzione del sito `api/contact.ts`, che inoltra la richiesta
   * via email senza salvarla. Si può cambiare con VITE_CONTACT_ENDPOINT.
   */
  contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || '/api/contact',
} as const

/**
 * Il titolare del trattamento: chi risponde dei dati raccolti dal sito.
 * L'informativa privacy non si pubblica finché `name` ed `email` non ci
 * sono: senza un titolare identificabile e un recapito a cui esercitare
 * i diritti, un'informativa non è un'informativa.
 *
 * `vat` e `address` si compilano quando esistono; finché sono vuoti non
 * vengono mostrati e non vengono inventati.
 */
export const owner = {
  name: 'Christian Maiolo' as string | null,
  email: 'support@crm-lab.it' as string | null,
  address: null as string | null,
  vat: null as string | null,
  /** Fornitore dell'hosting, responsabile del trattamento per i log tecnici. */
  hosting: 'Vercel Inc.' as string | null,
  /** Servizio che recapita via email i messaggi del modulo, responsabile del trattamento. */
  mailer: 'Resend (Plus Five Five, Inc.)' as string | null,
} as const

/** L'informativa può essere pubblicata solo se il titolare è identificabile. */
export const canPublishPrivacy = Boolean(owner.name && owner.email)

/**
 * Stato delle pagine informative.
 * Nessun collegamento viene pubblicato finché la pagina corrispondente non è
 * scritta e verificata: un rimando a un'informativa incompleta è peggio
 * dell'assenza del rimando.
 *
 *  privacy        → mettere il percorso quando l'informativa è completa e pubblicata
 *  cookiePolicy   → solo se diventa una pagina distinta dall'informativa privacy
 *  cookiePrefs    → solo se esiste un sistema di consenso che permette di cambiare le scelte
 */
export const legal = {
  privacy: '/privacy' as string | null,
  cookiePolicy: null as string | null,
  cookiePrefs: false,
} as const

export const navigation = [
  { label: 'Servizi', href: '/#servizi' },
  { label: 'Progetti', href: '/#progetti' },
  { label: 'Prezzi', href: '/#prezzi' },
  { label: 'Metodo', href: '/#metodo' },
  { label: 'Studio', href: '/#studio' },
  { label: 'Contatti', href: '/#contatti' },
] as const
