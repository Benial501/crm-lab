/* ---------------------------------------------------------------
   I progetti del portfolio.

   Due nature diverse, dichiarate in `kind` e sempre visibili nel sito:

   - `prodotto`  un'applicazione realizzata dallo studio e in uso
                 davvero, raggiungibile al suo indirizzo pubblico;
   - `concept`   un lavoro dimostrativo costruito dallo studio, non
                 commissionato, navigabile come demo dentro questo sito.

   Niente mockup e niente fotografie di repertorio: ogni immagine è una
   schermata vera: catturata dalla demo per i concept, presa dal video
   di presentazione per i prodotti.

   Regola per chi modifica questo file: in `canTry` va solo quello che
   il progetto fa davvero. Un pulsante o una voce di menu non sono una
   funzione. Quello che manca, o è simulato, sta in `toUse`.
   --------------------------------------------------------------- */

export type Shot = {
  /** Percorso senza suffisso di larghezza, es. "/img/demo-legale-desktop". */
  base: string
  widths: number[]
  alt: string
  /** Proporzione del fotogramma, per riservare lo spazio prima del caricamento. */
  ratio: '16/10' | '9/19'
}

export type Video = {
  /** Il file da riprodurre. Parte solo al clic: vedi `VideoFigure`. */
  src: string
  /** Copertina, nello stesso formato delle altre immagini del sito. */
  poster: string
  posterWidths: number[]
  posterAlt: string
  /** Durata leggibile, scritta accanto al Play: m:ss. */
  duration: string
}

export type Project = {
  slug: string
  title: string
  /** Il tipo di progetto, detto in due parole. */
  category: string
  /**
   * La natura del lavoro. Decide le etichette in tutto il sito: un
   * concept non va mai presentato come un prodotto consegnato.
   */
  kind: 'prodotto' | 'concept'
  /** L'azione principale: la demo interna, o l'indirizzo pubblico. */
  action: { href: string; label: string; external?: boolean }
  /** Nome del prodotto. */
  brand: string
  /** Due righe per la homepage: a chi serve e a cosa. */
  blurb: string
  /** A chi si rivolge. */
  audience: string
  /** L'esigenza da cui parte. */
  need: string
  /** La soluzione mostrata nella demo. */
  solution: string
  /** Cosa si può provare davvero nella demo: solo comportamenti verificati. */
  canTry: string[]
  /** Per un concept: quello che nella demo è simulato o assente. Per un prodotto: le scelte tecniche. */
  toUse: string[]
  /** Il video di presentazione, dove c'è: prende il posto dell'immagine di copertina. */
  video?: Video
  /** Le schermate della demo, nell'ordine in cui compaiono. */
  shots: Shot[]
}

export const projects: Project[] = [
  {
    slug: 'wallt',
    title: 'App per la gestione delle finanze personali',
    category: 'Applicazione web',
    kind: 'prodotto',
    action: { href: 'https://wallt.it', label: 'Visita Wallt', external: true },
    brand: 'WALLT',
    blurb:
      'Conti, movimenti, budget e obiettivi in un unico posto, tradotti in una lettura comprensibile della propria situazione.',
    audience:
      'Chi tiene i conti su più fronti — conto corrente, carte, contanti, risparmi — e vuole una lettura sola invece di quattro saldi separati.',
    need:
      'Le banche mostrano i movimenti, non raccontano le abitudini. L’estratto conto dice cosa è successo, ma non come è distribuito il budget, quali spese si ripetono ogni mese e quanto resta davvero da spendere.',
    solution:
      'Una sola applicazione in cui ogni operazione ha categoria, conto e data, e i conti restano separati ma sommati. Sopra ai movimenti stanno il budget per categoria, gli obiettivi di risparmio e l’analisi; i trasferimenti fra conti spostano denaro senza contare come spesa.',
    canTry: [
      'Dashboard con patrimonio totale, entrate e uscite del mese e ultimi movimenti',
      'Movimenti con categoria, conto e data, e filtri distinti per entrate, uscite e trasferimenti',
      'Conti separati per natura — banca, carta, contanti, risparmi — con trasferimento interno fra l’uno e l’altro',
      'Budget mensile con un tetto per categoria, speso e rimanente aggiornati a ogni movimento',
      'Oltre novanta categorie predefinite divise per gruppi, più quelle personali',
      'Analisi delle spese per categoria e andamento del patrimonio nel tempo',
      'Obiettivi di risparmio con importo, scadenza e progresso di quanto è già accantonato',
      'Importazione dell’estratto conto, con categoria proposta riga per riga, livello di confidenza e segnalazione dei duplicati',
      'Simulazione di una spesa prima di farla, con il limite indicativo per giorno fino a fine mese',
    ],
    toUse: [
      'Front-end Vue 3 con Vite e Pinia',
      'Back-end Node.js con Express',
      'Database PostgreSQL con Sequelize',
      'Autenticazione JWT, validazione dei dati e rate limiting',
      'Le regole di dominio stanno nel server, dentro una transazione: un movimento non può mandare un conto sotto zero, un trasferimento non conta come spesa, una data futura non viene accettata',
    ],
    video: {
      src: '/video/wallt-presentazione.mp4',
      poster: '/img/wallt-cover-logo',
      posterWidths: [640, 960, 1280],
      posterAlt:
        'Logo WALLT bianco e turchese su sfondo scuro.',
      duration: '3:54',
    },
    shots: [
      {
        base: '/img/wallt-dashboard',
        widths: [800, 1200, 1600],
        alt: 'Dashboard di WALLT: andamento del patrimonio, entrate e uscite del mese e transazioni recenti.',
        ratio: '16/10',
      },
      {
        base: '/img/wallt-movimenti',
        widths: [800, 1200, 1600],
        alt: 'Elenco dei movimenti, raggruppati per giorno, con filtri per entrate, uscite e trasferimenti.',
        ratio: '16/10',
      },
      {
        base: '/img/wallt-conti',
        widths: [800, 1200, 1600],
        alt: 'La pagina «I miei conti»: conto corrente, carta prepagata, contanti e risparmi, ciascuno col proprio saldo.',
        ratio: '16/10',
      },
      {
        base: '/img/wallt-budget',
        widths: [800, 1200, 1600],
        alt: 'Il budget mensile: un tetto per ogni categoria, con speso, rimanente e totale in fondo.',
        ratio: '16/10',
      },
      {
        base: '/img/wallt-analisi',
        widths: [800, 1200, 1600],
        alt: 'L’analisi: entrate e uscite messe a confronto mese per mese.',
        ratio: '16/10',
      },
      {
        base: '/img/wallt-obiettivi',
        widths: [800, 1200, 1600],
        alt: 'Gli obiettivi di risparmio, con importo da raggiungere, scadenza e progresso di quanto è già accantonato.',
        ratio: '16/10',
      },
      {
        base: '/img/wallt-importazione',
        widths: [800, 1200, 1600],
        alt: 'L’importazione dell’estratto conto: ogni riga con la categoria proposta e il livello di confidenza.',
        ratio: '16/10',
      },
    ],
  },
  {
    slug: 'ordini-asporto',
    title: 'Sito di ordini da asporto per ristoranti',
    category: 'Applicazione web',
    kind: 'concept',
    action: {
      href: 'https://prenotazioni-ristorante-demo.vercel.app/',
      label: 'Apri la demo',
      external: true,
    },
    brand: 'Asporto',
    blurb:
      'Il locale riceve gli ordini da asporto dal proprio sito, già scritti e con l’orario di ritiro scelto dal cliente, senza commissioni su ogni ordine.',
    audience:
      'Pizzerie, trattorie e ristoranti che lavorano anche d’asporto e oggi prendono gli ordini al telefono o su una piattaforma di consegna.',
    need:
      'Il telefono squilla durante il servizio: l’ordine finisce su un foglietto, il nome si capisce a metà, il cliente arriva prima che sia pronto. Le piattaforme risolvono la raccolta, ma trattengono una percentuale su ogni ordine e tengono per sé i dati di chi ordina.',
    solution:
      'Un sito d’ordine che appartiene al locale. Il cliente sceglie i piatti, li personalizza e indica il giorno e l’ora di ritiro fra le fasce ancora libere; in cucina l’ordine arriva già scritto, con personalizzazioni, note e totale, e diventa una comanda da stampare. Menu, orari, capienza per fascia e identità del locale si cambiano dall’area ristoratore, senza passare dallo studio.',
    canTry: [
      'Sfogliare il menu per categorie, con ricerca per piatto o per ingrediente',
      'Personalizzare un piatto — formato, ingredienti da togliere, extra a pagamento — con il prezzo che si aggiorna a ogni scelta',
      'Un carrello che riporta per intero le personalizzazioni e le note, e resta anche ricaricando la pagina',
      'Scegliere giorno e orario di ritiro fra le fasce che il locale ha davvero libere',
      'Completare l’ordine come ospite o con un profilo, con pagamento al ritiro e numero d’ordine in chiusura',
      'Entrare nell’area ristoratore con le credenziali di prova pubblicate in home',
      'La schermata degli ordini da preparare, che si aggiorna da sola ogni dieci secondi, con avviso sonoro facoltativo',
      'La comanda già formattata per la stampante termica da 80 mm della cucina',
      'Cambiare il menu dall’area ristoratore: categorie, piatti, disponibilità, varianti ed extra',
      'Impostare orari di apertura, fasce di ritiro, quanti ordini accettare per fascia e i minuti di preparazione',
    ],
    toUse: [
      'Il locale della demo è di fantasia: nome, logo, colori, menu, prezzi, orari e recapiti vanno sostituiti con quelli veri',
      'Le credenziali dell’area ristoratore sono pubbliche perché è una demo: in un locale vero diventano un accesso riservato',
      'Si ordina per il ritiro e si paga in cassa: non c’è pagamento online né consegna a domicilio',
      'Serve un indirizzo intestato al locale e il materiale da pubblicare: piatti, descrizioni, fotografie',
      'Il prodotto è in versione beta: va concordato cosa aggiungere prima di aprirlo ai clienti',
    ],
    video: {
      src: '/video/asporto-presentazione.mp4',
      poster: '/img/asporto-cover',
      posterWidths: [640, 960, 1280],
      posterAlt:
        'Un telefono con la schermata d’ordine del locale, accanto a una pizza nel cartone e alla comanda stampata.',
      duration: '4:58',
    },
    shots: [
      {
        base: '/img/asporto-cliente',
        widths: [800, 1200, 1600],
        alt: 'La prima schermata del sito del locale: invito a ordinare da asporto e le categorie del menu.',
        ratio: '16/10',
      },
      {
        base: '/img/asporto-prodotto',
        widths: [800, 1200, 1600],
        alt: 'La scheda di una pizza: formato, ingredienti da togliere ed extra a pagamento, col prezzo aggiornato.',
        ratio: '16/10',
      },
      {
        base: '/img/asporto-checkout',
        widths: [800, 1200, 1600],
        alt: 'La chiusura dell’ordine: le fasce di ritiro disponibili, i dati del cliente e il riepilogo col totale.',
        ratio: '16/10',
      },
      {
        base: '/img/asporto-ordini',
        widths: [800, 1200, 1600],
        alt: 'L’area ristoratore: gli ordini da preparare, con orario di ritiro, cliente, piatti, note e totale.',
        ratio: '16/10',
      },
      {
        base: '/img/asporto-comanda',
        widths: [800, 1200, 1600],
        alt: 'La comanda di un ordine, formattata per la stampante termica della cucina.',
        ratio: '16/10',
      },
      {
        base: '/img/asporto-menu',
        widths: [800, 1200, 1600],
        alt: 'La gestione del menu: categorie e piatti con prezzo, disponibilità e riordino.',
        ratio: '16/10',
      },
      {
        base: '/img/asporto-orari',
        widths: [800, 1200, 1600],
        alt: 'Orari e ritiri: giorni di apertura con doppia fascia, minuti di preparazione e ordini accettati per fascia.',
        ratio: '16/10',
      },
    ],
  },
  {
    slug: 'studio-professionale',
    title: 'Sito per uno studio professionale',
    category: 'Sito aziendale',
    kind: 'concept',
    action: { href: '/demo/studio-legale', label: 'Apri la demo' },
    brand: 'Marcucci & Partners',
    blurb:
      'Per uno studio professionale che deve far capire subito di cosa si occupa e come lo si contatta.',
    audience:
      'Studi legali, commercialisti, consulenti: attività che vendono competenza e vengono scelte dopo una lettura veloce.',
    need:
      'Chi cerca un professionista vuole sapere in pochi secondi se è il posto giusto, chi ci lavora e come si fa a parlarne. Molti siti di settore mettono prima la storia dello studio e lasciano i recapiti in fondo.',
    solution:
      'Una pagina sola, in cui l’ordine è la risposta: settore e territorio in apertura, poi le quattro aree di attività descritte per materia, il modo di lavorare in tre passaggi, le persone con foro e specializzazione, e in chiusura recapiti e orari in chiaro.',
    canTry: [
      'Leggere le quattro aree di attività, ciascuna con il perimetro concreto',
      'Scorrere la scheda delle persone con materia e foro di appartenenza',
      'Usare la navigazione in alto: le voci portano alle sezioni della stessa pagina',
      'Vedere recapiti, indirizzo e orari senza passare da un modulo',
    ],
    toUse: [
      'Il pulsante «Fissa un primo incontro» porta alla sezione contatti: non è un sistema di prenotazione e non apre un calendario',
      'Non c’è un modulo di contatto: serve decidere il canale (email, telefono, modulo) e collegarlo a una casella reale',
      'Nomi, indirizzo, recapiti e aree sono di esempio e vanno sostituiti con i dati dello studio',
      'Testi, foto delle persone ed eventuali pagine aggiuntive (privacy, note legali) sono da preparare',
    ],
    shots: [
      {
        base: '/img/demo-legale-desktop',
        widths: [800, 1200, 1600],
        alt: 'Schermata iniziale del sito dello studio legale: titolo, descrizione dello studio e dati di fondazione su fondo avorio.',
        ratio: '16/10',
      },
      {
        base: '/img/demo-legale-scroll',
        widths: [800, 1200, 1600],
        alt: 'Sezione “Aree di attività” del sito, con quattro voci affiancate e le rispettive descrizioni.',
        ratio: '16/10',
      },
      {
        base: '/img/demo-legale-detail',
        widths: [800, 1200, 1600],
        alt: 'Sezione “Persone” del sito, con tre professionisti, materia e foro di appartenenza.',
        ratio: '16/10',
      },
      {
        base: '/img/demo-legale-mobile',
        widths: [390, 780],
        alt: 'Lo stesso sito su telefono: titolo, descrizione e pulsante per fissare il primo incontro.',
        ratio: '9/19',
      },
    ],
  },
  {
    slug: 'ecommerce-indipendente',
    title: 'E-commerce per un brand indipendente',
    category: 'Vendita online',
    kind: 'concept',
    action: { href: '/demo/orso-nero', label: 'Apri la demo' },
    brand: 'Orso Nero',
    blurb:
      'Per chi vende pochi prodotti curati e vuole un negozio costruito sul catalogo corto, non su un modello da migliaia di articoli.',
    audience:
      'Produttori e rivenditori con un catalogo ristretto: torrefazioni, laboratori, piccoli marchi che cambiano spesso le referenze.',
    need:
      'Con pochi prodotti i modelli da e-commerce sembrano vuoti: griglie pensate per centinaia di articoli, filtri inutili e schede che non spiegano perché un prodotto costa quello che costa.',
    solution:
      'Il ritmo della produzione diventa l’argomento di vendita fin dalla prima riga. Un filtro solo, sul metodo di estrazione, perché è la sola domanda che il cliente si pone. Il carrello resta in testata con quantità e totale, e ogni prodotto mostra origine e note di degustazione.',
    canTry: [
      'Filtrare il catalogo per metodo: tutti, filtro, espresso',
      'Aggiungere prodotti al carrello e vedere quantità e totale aggiornarsi in testata',
      'Leggere origine, note di degustazione e prezzo di ciascuna delle sei referenze',
      'Scorrere la sezione che spiega il catalogo corto con i suoi numeri',
    ],
    toUse: [
      'Il carrello è simulato: non esiste una pagina di riepilogo, non si rimuovono prodotti e non si arriva a un pagamento',
      'Nessun pagamento reale è collegato: serve un provider (commissioni e verifiche a suo carico) e le relative pagine',
      'Spedizioni, disponibilità e gestione degli ordini non sono gestite: vanno definite e collegate',
      'L’abbonamento mensile è una voce del catalogo, non un flusso di sottoscrizione ricorrente',
      'Non c’è una scheda prodotto separata: se serve, va progettata',
      'Prodotti, prezzi, numeri e immagini sono di esempio; le etichette sono disegnate in CSS al posto di fotografie',
    ],
    shots: [
      {
        base: '/img/demo-shop-desktop',
        widths: [800, 1200, 1600],
        alt: 'Schermata iniziale del negozio: titolo “Tostiamo il martedì, parte il mercoledì” e tre sacchetti disegnati.',
        ratio: '16/10',
      },
      {
        base: '/img/demo-shop-scroll',
        widths: [800, 1200, 1600],
        alt: 'Catalogo del negozio con sei caffè, filtro per metodo, prezzi e pulsanti per aggiungere al carrello.',
        ratio: '16/10',
      },
      {
        base: '/img/demo-shop-detail',
        widths: [800, 1200, 1600],
        alt: 'Sezione che spiega il catalogo corto, con i tre numeri della torrefazione su fondo scuro.',
        ratio: '16/10',
      },
      {
        base: '/img/demo-shop-mobile',
        widths: [390, 780],
        alt: 'Il catalogo del negozio su telefono, con le schede prodotto incolonnate.',
        ratio: '9/19',
      },
    ],
  },
  {
    slug: 'dashboard-gestionale',
    title: 'Gestionale per piccole attività',
    category: 'Strumento di lavoro',
    kind: 'concept',
    action: { href: '/demo/bottega', label: 'Apri la demo' },
    brand: 'Bottega',
    blurb:
      'Per chi oggi tiene clienti, lavori e scadenze su più fogli di calcolo e vuole una vista unica.',
    audience:
      'Piccole attività e studi che seguono pochi lavori alla volta, con una persona che deve sapere ogni giorno come stanno andando.',
    need:
      'Le informazioni finiscono divise fra fogli di calcolo, email e il gestionale della fatturazione. Ricostruire lo stato di un lavoro vuol dire aprire tre strumenti e fidarsi dell’ultimo aggiornamento fatto a mano.',
    solution:
      'Una schermata costruita sulle quattro domande ricorrenti — quanto ho fatturato, cosa è aperto, cosa devo fatturare, cosa scade — invece che sulle tabelle disponibili. Gli indicatori in alto sono la somma delle righe sotto, il fatturato per mese ha il picco in evidenza e una riga che dice cosa è successo.',
    canTry: [
      'Passare fra le tre viste: Panoramica, Lavori, Scadenze',
      'Leggere i quattro indicatori, calcolati dalle righe della tabella sottostante',
      'Guardare il fatturato per mese con il mese migliore in evidenza',
      'Scorrere la tabella dei lavori con referente, scadenza, stato e valore, e l’elenco delle scadenze',
    ],
    toUse: [
      'I dati sono fissi nel codice: non si inseriscono, non si modificano e non si salva nulla',
      'La tabella non è ordinabile né filtrabile: è una lettura, non uno strumento di gestione',
      'Non ci sono accessi né ruoli: il nome in basso a sinistra è un’etichetta, non un utente autenticato',
      'Le voci Clienti, Fatture e Impostazioni sono presenti nel menu ma non attive',
      'Non esistono esportazioni, stampe né collegamenti con gestionali o fogli di calcolo esistenti',
      'Per un uso reale servono una base dati, gli accessi e la decisione su quali dati entrano e da dove',
    ],
    shots: [
      {
        base: '/img/demo-dashboard-desktop',
        widths: [800, 1200, 1600],
        alt: 'Panoramica del gestionale: quattro indicatori, grafico del fatturato per mese e tabella dei lavori in corso.',
        ratio: '16/10',
      },
      {
        base: '/img/demo-dashboard-scroll',
        widths: [800, 1200, 1600],
        alt: 'Tabella dei lavori del gestionale con cliente, referente, scadenza, stato e valore.',
        ratio: '16/10',
      },
      {
        base: '/img/demo-dashboard-detail',
        widths: [800, 1200, 1600],
        alt: 'Elenco delle prossime scadenze del gestionale, con responsabile e termine accanto a ciascuna.',
        ratio: '16/10',
      },
      {
        base: '/img/demo-dashboard-mobile',
        widths: [390, 780],
        alt: 'Il gestionale su telefono: menu in linea, indicatori incolonnati e grafico del fatturato.',
        ratio: '9/19',
      },
    ],
  },
]

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug)
