/* ---------------------------------------------------------------
   Listino — unico punto da modificare per i prezzi.

   kind: 'from'  → prezzo di partenza confermato ("A partire da")
   kind: 'quote' → nessun importo pubblicato ("Su preventivo")

   Per togliere un importo dal sito basta passare a kind: 'quote'.
   Gli importi riguardano SOLO la realizzazione (una tantum).
   Ogni voce dichiara anche che cosa NON comprende: è la parte che
   genera i malintesi, quindi sta accanto al prezzo e non in una nota.
   --------------------------------------------------------------- */

export type PriceItem = {
  id: string
  title: string
  description: string
  /** Che cosa è compreso nel prezzo di partenza. */
  includes: string[]
  /** Che cosa resta fuori, e va concordato a parte. */
  excludes: string[]
  kind: 'from' | 'quote'
  /** Importo in euro, usato solo quando kind === 'from'. */
  amount?: number
  /** Solo per le voci su preventivo: da che cosa dipende la cifra. */
  dependsOn?: string[]
}

/** Le famiglie del listino, nell'ordine in cui compaiono. */
export type PriceGroup = {
  id: string
  title: string
  body: string
  items: PriceItem[]
}

export const currency = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
  // Senza questo le migliaia a quattro cifre restano senza punto: «1200 €» invece di «1.200 €».
  useGrouping: true,
})

export const priceGroups: PriceGroup[] = [
  {
    id: 'siti-web',
    title: 'Siti web',
    body: 'Tre perimetri diversi, dal più breve al più articolato. Quello che è compreso è scritto per esteso: il preventivo lo conferma prima di iniziare.',
    items: [
      {
        id: 'landing-page',
        title: 'Landing page',
        description:
          'Una pagina singola per presentare un servizio, un’offerta o un evento.',
        includes: [
          'Una pagina, una lingua, fino a cinque sezioni',
          'Impostazione grafica coerente con l’attività',
          'Adattamento per smartphone e desktop',
          'Testi e immagini forniti da te, con sistemazione leggera',
          'Un canale di contatto concordato',
          'Un ciclo di revisioni',
          'Pubblicazione sull’ambiente concordato',
          'Titolo e descrizione della pagina per i motori di ricerca',
        ],
        excludes: [
          'Identità visiva completa e scrittura estesa dei testi',
          'CMS, prenotazioni, pagamenti e integrazioni personalizzate',
          'Dominio, hosting e servizi esterni',
        ],
        kind: 'from',
        amount: 350,
      },
      {
        id: 'sito-aziendale',
        title: 'Sito aziendale',
        description:
          'Il sito dell’attività: chi sei, cosa fai e come ti si raggiunge.',
        includes: [
          'Fino a quattro pagine, una lingua',
          'Presentazione dell’attività, servizi e contatti',
          'Testi e immagini forniti da te',
          'Adattamento per smartphone e desktop',
          'Modulo semplice o altro canale di contatto concordato',
          'SEO tecnica di base',
          'Due cicli di revisioni',
          'Pubblicazione e istruzioni essenziali di consegna',
        ],
        excludes: [
          'Area riservata, CMS, e-commerce e integrazioni personalizzate',
          'Redazione professionale dei testi legali',
          'Dominio, hosting, licenze e manutenzione continuativa',
        ],
        kind: 'from',
        amount: 700,
      },
      {
        id: 'sito-aggiornabile',
        title: 'Sito con contenuti aggiornabili',
        description:
          'Il sito aziendale, più un tipo di contenuto che aggiorni tu: per esempio articoli oppure progetti.',
        includes: [
          'Tutto il perimetro del sito aziendale',
          'Gestione di un tipo di contenuto concordato (articoli oppure progetti)',
          'Accesso editoriale per pubblicare e modificare',
          'Istruzioni per aggiornare i contenuti',
        ],
        excludes: [
          'Più tipi di contenuto o flussi redazionali articolati',
          'Area riservata, e-commerce e integrazioni personalizzate',
          'Dominio, hosting, licenze e manutenzione continuativa',
        ],
        kind: 'from',
        amount: 1100,
      },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    body: 'Non pubblico un prezzo minimo: un negozio con sei prodotti e uno con seicento non hanno nulla in comune se non il nome.',
    items: [
      {
        id: 'ecommerce',
        title: 'Negozio online',
        description:
          'Il prezzo si definisce dopo aver guardato il catalogo e il modo in cui vendi.',
        includes: [],
        dependsOn: [
          'Numero e tipologia dei prodotti',
          'Varianti (taglie, formati, listini)',
          'Pagamenti e spedizioni',
          'Gestione degli ordini',
          'Collegamenti con altri strumenti già in uso',
        ],
        excludes: [
          'Abbonamenti, magazzino e integrazioni: non sono inclusi d’ufficio, si valutano voce per voce',
          'Dominio, hosting, licenze e commissioni dei servizi di pagamento',
        ],
        kind: 'quote',
      },
    ],
  },
  {
    id: 'automazioni',
    title: 'Automazioni',
    body: 'Un flusso circoscritto che toglie di mezzo un passaggio manuale ripetuto. Niente di più, e detto con chiarezza.',
    items: [
      {
        id: 'automazione-semplice',
        title: 'Automazione semplice',
        description:
          'Esempio: una richiesta ricevuta viene registrata in un foglio, senza ricopiarla a mano.',
        includes: [
          'Un flusso circoscritto',
          'Collegamento tra massimo due servizi compatibili',
          'Un evento iniziale e un’azione principale',
          'Verifica degli esiti e gestione essenziale degli errori',
          'Istruzioni d’uso',
        ],
        excludes: [
          'API personalizzate complesse',
          'Elaborazione AI di documenti',
          'Migrazioni e flussi articolati',
          'Canoni e consumi dei servizi esterni',
        ],
        kind: 'from',
        amount: 250,
      },
    ],
  },
  {
    id: 'sistemi',
    title: 'Applicazioni, dashboard e gestionali',
    body: 'Il perimetro cambia troppo da un’attività all’altra per pubblicare una cifra che regga.',
    items: [
      {
        id: 'sistemi-digitali',
        title: 'Applicazioni, dashboard e gestionali',
        description:
          'Strumenti interni costruiti sui dati e sui flussi che hai già.',
        includes: [],
        dependsOn: [
          'Flussi di lavoro da coprire',
          'Utenti e permessi',
          'Dati gestiti e da dove arrivano',
          'Integrazioni con gli strumenti esistenti',
          'Necessità di assistenza e continuità',
        ],
        excludes: [
          'Dominio, hosting, licenze e servizi esterni',
          'Assistenza continuativa, che si concorda a parte',
        ],
        kind: 'quote',
      },
    ],
  },
]

/** Elenco piatto, usato dove serve un solo insieme (es. la tendina dei contatti). */
export const pricing: PriceItem[] = priceGroups.flatMap((group) => group.items)

/**
 * La nota comune, da leggere accanto ai prezzi.
 * Testo concordato: non va riassunto né spezzato.
 */
export const pricingNote =
  'I prezzi indicati sono di partenza e si riferiscono alle attività descritte. Il preventivo conferma contenuti, funzionalità, revisioni, tempi e costi ricorrenti prima dell’avvio. Dominio, hosting, licenze e servizi esterni sono indicati separatamente. Le richieste aggiuntive vengono concordate prima di procedere.'
