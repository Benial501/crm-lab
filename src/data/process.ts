export type ProcessStep = {
  n: string
  title: string
  body: string
  /** Che cosa resta in mano al cliente alla fine della fase. */
  output: string
  /** Quale frammento d'interfaccia rappresenta la fase (vedi Process.tsx). */
  artefact: 'notes' | 'wireframe' | 'components' | 'checks' | 'deploy'
}

/* I numeri di fase sono richiesti dal committente e compaiono a schermo:
   sono il modo in cui lo studio presenta il metodo ai clienti.
   taste-skill-ignore numbering */
export const processSteps: ProcessStep[] = [
  {
    n: '01',
    title: 'Analisi delle esigenze',
    body: 'Guardo come lavori oggi: chi fa cosa, dove si perde tempo e quali strumenti usi già. Nessun preventivo prima di aver capito il problema.',
    output: 'Un documento con obiettivi, perimetro, vincoli e stima di costi e tempi.',
    artefact: 'notes',
  },
  {
    n: '02',
    title: 'Proposta e progettazione',
    body: 'Definisco la struttura prima della grafica: schermate, funzioni e ordine. Poi scelgo tipografia, colore e componenti.',
    output: 'Mappa delle schermate, struttura dei contenuti e interfaccia approvata.',
    artefact: 'wireframe',
  },
  {
    n: '03',
    title: 'Sviluppo',
    body: 'Sviluppo a tappe, partendo dai componenti e dai loro stati. Vedi il lavoro su un indirizzo di prova, così le correzioni arrivano presto.',
    output: 'Ambiente di prova sempre aggiornato, codice su repository intestata a te.',
    artefact: 'components',
  },
  {
    n: '04',
    title: 'Verifica',
    body: 'Provo con te i casi reali, su desktop e telefono. Misuro velocità, accessibilità da tastiera, contrasto e comportamento con i dati veri.',
    output: 'Elenco delle verifiche con esito, correzioni fatte e misure prima e dopo.',
    artefact: 'checks',
  },
  {
    n: '05',
    title: 'Consegna e supporto',
    body: 'Pubblico il progetto, trasferisco accessi e documentazione e resto disponibile per modifiche concordate. Il progetto resta intestato a te.',
    output: 'Sito in linea, accessi trasferiti, documentazione e canale di supporto.',
    artefact: 'deploy',
  },
]
