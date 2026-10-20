export type Service = {
  id: string
  title: string
  /** Il problema concreto che l'azienda ha prima di chiamarci. */
  problem: string
  /** Che cosa realizzo in risposta. */
  summary: string
  detail: string
  /** Funzionalità che possono essere incluse: dipende dal progetto, non è un pacchetto. */
  includes: string[]
}

export const services: Service[] = [
  {
    id: 'siti-web',
    title: 'Siti web',
    problem:
      'Il sito non c’è, è fermo a qualche anno fa o non porta richieste: chi arriva non capisce in fretta cosa fate e se ne va.',
    summary:
      'Siti aziendali, landing page e pagine di servizio costruite attorno alle domande che i tuoi clienti si fanno davvero, con un percorso chiaro verso il contatto.',
    detail:
      'Parto dai contenuti: cosa deve capire chi arriva e quale azione deve essergli facile. Poi costruisco le pagine attorno a quelle risposte, con un sito leggero e intestato a te.',
    includes: [
      'Sito aziendale o landing page, con struttura e testi definiti insieme',
      'Modulo di contatto collegato a email, CRM o foglio di calcolo',
      'SEO tecnica, dati strutturati e anteprime social',
      'Servizi, catalogo o progetti aggiornabili; immagini responsive e prestazioni misurate',
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    problem:
      'Vendere online significa oggi aggiornare il catalogo a mano, rispondere alle stesse domande sulla spedizione e perdere ordini nel passaggio al pagamento.',
    summary:
      'Un negozio online dimensionato sul catalogo reale: schede prodotto che spiegano il prodotto, checkout breve e ordini che arrivano dove li gestisci già.',
    detail:
      'Il catalogo decide il perimetro: cinque prodotti artigianali e cinquemila codici B2B richiedono negozi diversi. Definisco le funzioni necessarie e uso un provider esterno per i pagamenti: sul sito non transitano dati di carta.',
    includes: [
      'Catalogo, varianti, disponibilità e schede prodotto',
      'Carrello e checkout breve, senza registrazione obbligatoria',
      'Provider di pagamento, spedizioni e ritiro in sede',
      'Email transazionali e collegamento con gestionale o magazzino',
    ],
  },
  {
    id: 'automazioni-ai',
    title: 'Automazioni AI',
    problem:
      'Ogni giorno qualcuno ricopia dati da un’email a un foglio, smista richieste a mano o rilegge documenti per estrarne tre informazioni.',
    summary:
      'Il passaggio ripetitivo viene svolto dagli strumenti che già usi, con un controllo umano dove la decisione pesa.',
    detail:
      'Mappo il processo attuale e scelgo cosa automatizzare. Uso l’AI quando aiuta a leggere testi, classificare documenti o preparare risposte; per le attività semplici bastano regole chiare.',
    includes: [
      'Analisi del processo e stima del tempo recuperato',
      'Smistamento, classificazione ed estrazione di dati da richieste e documenti',
      'Bozze e riepiloghi approvati da una persona',
      'Collegamenti tra strumenti, con registro degli errori e controllo umano',
    ],
  },
  {
    id: 'sistemi-digitali',
    title: 'Sistemi digitali su misura',
    problem:
      'Le informazioni sono divise tra fogli di calcolo, email e un gestionale usato a metà: per sapere com’è andato un lavoro servono tre strumenti.',
    summary:
      'Dashboard, applicazioni web e interfacce costruite sui dati che hai già e sulle necessità di chi le userà ogni giorno.',
    detail:
      'Quando i fogli di calcolo non bastano, progetto lo strumento che manca: una vista utile ogni giorno, collegata ai servizi che usi. I dati esistenti vengono importati, non riscritti a mano.',
    includes: [
      'Dashboard e viste operative per ruolo',
      'Anagrafiche, pratiche, commesse e scadenze',
      'Accessi, permessi e registro delle modifiche',
      'Integrazioni, importazione ed esportazione dei dati',
    ],
  },
]
