/* ---------------------------------------------------------------
   I progetti del portfolio.

   Due nature diverse, dichiarate in `kind` e sempre visibili nel sito:

   - `prodotto`  un'applicazione realizzata dallo studio e in uso
                 davvero, raggiungibile al suo indirizzo pubblico;
   - `concept`   un lavoro dimostrativo costruito dallo studio, non
                 commissionato: navigabile come demo, o mostrato per
                 intero nel suo video di presentazione.

   Niente mockup e niente fotografie di repertorio: ogni immagine è una
   schermata vera: catturata dalla demo, o presa dal video di
   presentazione dove c'è.

   Regola per chi modifica questo file: in `canTry` va solo quello che
   il progetto fa davvero. Un pulsante o una voce di menu non sono una
   funzione. Quello che manca, o è simulato, sta in `toUse`.
   --------------------------------------------------------------- */

export type Shot = {
  /** Percorso senza suffisso di larghezza, es. "/img/demo-shop-desktop". */
  base: string
  widths: number[]
  alt: string
  /**
   * Proporzione del fotogramma, per riservare lo spazio prima del caricamento.
   * 48/25 è un fotogramma 16:9 senza la fascia dei sottotitoli del video.
   */
  ratio: '16/10' | '48/25' | '9/19'
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
  /**
   * L'azione principale: la demo interna, o l'indirizzo pubblico. Manca
   * quando il progetto si vede solo nel suo video di presentazione.
   */
  action?: { href: string; label: string; external?: boolean }
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
  /** Cosa si può provare davvero nella demo, o si vede fare nel video: solo comportamenti verificati. */
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
    slug: 'linea-outdoor',
    title: 'Sito con preventivo guidato per pergole, serramenti e tende',
    category: 'Sito aziendale',
    kind: 'concept',
    brand: 'Linea Outdoor',
    blurb:
      'Il cliente sceglie la soluzione, indica misure e località e allega le foto del terrazzo: all’azienda arriva una richiesta di preventivo già completa, pronta per fissare il sopralluogo.',
    audience:
      'Aziende che progettano e installano pergole bioclimatiche, serramenti e tende da sole, e lavorano su misura: ogni preventivo dipende dallo spazio del cliente.',
    need:
      'In questo settore il primo contatto arriva quasi sempre incompleto: «vorrei un preventivo per una pergola», senza misure, senza foto, senza località. Prima di poter rispondere servono due o tre telefonate, e intanto il cliente che stava confrontando più aziende ha già scelto.',
    solution:
      'Un sito costruito attorno al preventivo. Il catalogo presenta pergole, serramenti e tende con immagini e caratteristiche chiare, i progetti illustrativi aiutano a immaginare il risultato, e ogni pagina porta alla richiesta guidata. In quattro passaggi — soluzione, spazio, contatti, riepilogo — il cliente sceglie il prodotto, indica misure e comune, allega le foto e dice quando vorrebbe installare, con il riassunto del progetto che si aggiorna a ogni scelta. Nell’area del titolare la richiesta arriva già ordinata, con lo stato e la proposta di sopralluogo.',
    canTry: [
      'Homepage, catalogo delle soluzioni e una pagina per ciascun prodotto, con struttura, copertura, configurazione e dimensioni',
      'Progetti illustrativi che raccontano materiali e contesto, ciascuno con il proprio invito alla richiesta',
      'La pagina dell’azienda, con il metodo di lavoro in tre passaggi: ascolto, valutazione, sopralluogo',
      'Richiesta di preventivo guidata in quattro passaggi, con l’avanzamento sempre visibile',
      'Scelta della soluzione e misure indicative di larghezza e profondità',
      'Comune di installazione e fotografie del terrazzo allegate alla richiesta',
      'Tempistiche di installazione, recapiti e una nota libera sul progetto',
      'Il riquadro «Il tuo progetto, in breve», che si aggiorna a ogni passaggio, e un controllo finale prima dell’invio',
      'Area del titolare con le richieste ricevute e i contatori: ricevute, da contattare, sopralluoghi confermati',
      'La scheda di ogni richiesta, con prodotto, misure, foto e contatti, lo stato e la proposta di sopralluogo da salvare',
      'Lo stesso percorso da telefono, con menu e richiesta pensati per lo schermo piccolo',
    ],
    toUse: [
      'Nome, logo, prodotti e testi sono di esempio e le fotografie sono illustrative: si sostituiscono con quelli dell’azienda e con le foto dei lavori veri',
      'Il catalogo si adatta all’assortimento reale: famiglie di prodotto, caratteristiche e domande del modulo',
      'Nella demo la richiesta resta salvata nel browser: per l’uso reale va collegata a una casella email o al gestionale, così arriva subito a chi deve rispondere',
      'L’area del titolare diventa un accesso riservato, con le credenziali dell’azienda',
      'Servono un dominio intestato all’azienda e le pagine di privacy e cookie',
    ],
    video: {
      src: '/video/linea-outdoor-presentazione.mp4',
      poster: '/img/linea-outdoor-cover',
      posterWidths: [640, 960, 1280],
      posterAlt:
        'La prima schermata del sito Linea Outdoor: una pergola bioclimatica su un terrazzo al tramonto e il titolo «Il tuo spazio all’aperto, progettato intorno a te».',
      duration: '1:30',
    },
    shots: [
      {
        base: '/img/linea-outdoor-home',
        widths: [800, 1200, 1600],
        alt: 'La homepage di Linea Outdoor: una pergola bioclimatica sul terrazzo e l’invito a raccontare il proprio progetto.',
        ratio: '48/25',
      },
      {
        base: '/img/linea-outdoor-soluzioni',
        widths: [800, 1200, 1600],
        alt: 'Il catalogo «Spazio alla tua idea»: pergole bioclimatiche, serramenti e tende da sole, ciascuno con la sua pagina.',
        ratio: '48/25',
      },
      {
        base: '/img/linea-outdoor-pergola',
        widths: [800, 1200, 1600],
        alt: 'La pagina della pergola bioclimatica: struttura, copertura, configurazione, dimensioni e richiesta di preventivo.',
        ratio: '48/25',
      },
      {
        base: '/img/linea-outdoor-progetto',
        widths: [800, 1200, 1600],
        alt: 'Un progetto illustrativo: un terrazzo con pergola antracite, raccontato con immagine, soluzione e contesto.',
        ratio: '48/25',
      },
      {
        base: '/img/linea-outdoor-richiesta',
        widths: [800, 1200, 1600],
        alt: 'Il primo passaggio della richiesta: la soluzione scelta e le misure indicative, con il riassunto del progetto accanto.',
        ratio: '48/25',
      },
      {
        base: '/img/linea-outdoor-riepilogo',
        widths: [800, 1200, 1600],
        alt: 'Il controllo prima dell’invio: soluzione e misure, comune e tempistiche, recapiti e le due foto del terrazzo.',
        ratio: '48/25',
      },
      {
        base: '/img/linea-outdoor-titolare',
        widths: [800, 1200, 1600],
        alt: 'L’area del titolare: la richiesta ricevuta con misure, foto e contatti, lo stato e la proposta di sopralluogo.',
        ratio: '48/25',
      },
      {
        base: '/img/linea-outdoor-mobile',
        widths: [800, 1200, 1600],
        alt: 'Il sito su telefono: la stessa homepage nel suo layout mobile.',
        ratio: '48/25',
      },
    ],
  },
  {
    slug: 'casale-aurora',
    title: 'Sito con prenotazione diretta per agriturismi e B&B',
    category: 'Sito con prenotazioni',
    kind: 'concept',
    brand: 'Casale Aurora',
    blurb:
      'Date, ospiti, alloggio e prezzo voce per voce: l’ospite prenota direttamente dal sito della struttura, senza passare da un portale e senza sorprese sul totale.',
    audience:
      'Agriturismi, B&B, case vacanza e piccole strutture con poche camere, che oggi ricevono gran parte delle prenotazioni dai portali.',
    need:
      'Chi sceglie dove dormire guarda foto, dotazioni e prezzo, poi prenota dove è più semplice: spesso un portale, che trattiene una commissione su ogni notte e si tiene il contatto con l’ospite. Molti siti di piccole strutture si fermano a una galleria e a un numero di telefono, e la prenotazione finisce altrove.',
    solution:
      'Un sito che accompagna l’ospite dalla prima foto alla prenotazione. In apertura si scelgono subito date e numero di ospiti; ogni alloggio ha la sua pagina con fotografie, dotazioni e tariffa; servizi, galleria, dintorni, indicazioni e domande frequenti rispondono ai dubbi prima che diventino telefonate. Il motore mostra gli alloggi disponibili, scompone il prezzo — notti, colazione, tassa di soggiorno — e chiude la prenotazione in tre passaggi, con un codice di riferimento. Il titolare ritrova tutto nella sua area: alloggio, date, ospiti e importo.',
    canTry: [
      'Ricerca per date di arrivo e partenza e numero di ospiti, già dalla prima schermata',
      'Una pagina per ogni alloggio, con fotografie, metratura, ospiti, dotazioni, tariffa per notte e orari di check-in e check-out',
      'Servizi, galleria fotografica, esperienze nei dintorni e indicazioni per arrivare',
      'Domande frequenti e condizioni di soggiorno, da leggere prima di prenotare',
      'La disponibilità degli alloggi per le date scelte, ciascuno con il suo prezzo',
      'Il prezzo voce per voce — notti, colazione, tassa di soggiorno — con il totale sempre visibile accanto al modulo',
      'Prenotazione in tre passaggi: il soggiorno, i dati dell’ospite, il riepilogo con l’accettazione delle condizioni',
      'Conferma con il codice di riferimento della prenotazione',
      'Area del titolare con le prenotazioni ricevute, gli importi e il dettaglio di ogni soggiorno',
      'Ricerca e prenotazione anche da telefono, con un’interfaccia pensata per lo schermo piccolo',
    ],
    toUse: [
      'Nome, testi, prezzi e condizioni sono di esempio e le fotografie sono illustrative, generate con IA: si sostituiscono con quelli della struttura',
      'Disponibilità e prenotazioni vanno collegate al gestionale della struttura, così il calendario resta allineato con i portali',
      'Nella demo non si paga: si decide se chiedere un acconto online, con quale servizio di pagamento, o il saldo in struttura',
      'Le email di conferma all’ospite e di avviso al titolare vanno collegate a una casella reale',
      'L’area del titolare diventa un accesso riservato, con le credenziali della struttura',
      'Servono un dominio intestato alla struttura e le pagine di privacy, cookie e condizioni di soggiorno',
    ],
    video: {
      src: '/video/casale-aurora-presentazione.mp4',
      poster: '/img/casale-aurora-cover',
      posterWidths: [640, 960, 1280],
      posterAlt:
        'La prima schermata del sito Casale Aurora: il casale in pietra tra ulivi e cipressi e, sotto, la ricerca per date e ospiti.',
      duration: '1:30',
    },
    shots: [
      {
        base: '/img/casale-aurora-home',
        widths: [800, 1200, 1600],
        alt: 'La homepage di Casale Aurora: il casale nella campagna e, subito sotto, la ricerca per date e ospiti.',
        ratio: '48/25',
      },
      {
        base: '/img/casale-aurora-alloggi',
        widths: [800, 1200, 1600],
        alt: 'Gli alloggi: Camera Ulivo e Appartamento Limone, con metratura, ospiti, colazione e prezzo per notte.',
        ratio: '48/25',
      },
      {
        base: '/img/casale-aurora-camera',
        widths: [800, 1200, 1600],
        alt: 'La pagina di Camera Ulivo: fotografia, dotazioni, tariffa e orari di check-in e check-out.',
        ratio: '48/25',
      },
      {
        base: '/img/casale-aurora-galleria',
        widths: [800, 1200, 1600],
        alt: 'La galleria «Uno sguardo al soggiorno»: il casale e il giardino, la camera, la colazione.',
        ratio: '48/25',
      },
      {
        base: '/img/casale-aurora-disponibilita',
        widths: [800, 1200, 1600],
        alt: 'La disponibilità per le date scelte: gli alloggi liberi dal 12 al 15 giugno per due adulti, ciascuno con il suo prezzo.',
        ratio: '48/25',
      },
      {
        base: '/img/casale-aurora-prezzo',
        widths: [800, 1200, 1600],
        alt: 'Il prezzo voce per voce: tre notti, colazione inclusa e tassa di soggiorno, con il totale accanto.',
        ratio: '48/25',
      },
      {
        base: '/img/casale-aurora-prenotazioni',
        widths: [800, 1200, 1600],
        alt: 'L’area del titolare: le prenotazioni ricevute, con alloggio, date, ospiti, importo e stato.',
        ratio: '48/25',
      },
      {
        base: '/img/casale-aurora-mobile',
        widths: [800, 1200, 1600],
        alt: 'Il sito su telefono: la homepage con la ricerca per date e ospiti.',
        ratio: '48/25',
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
]

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug)
