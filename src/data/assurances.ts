/* ---------------------------------------------------------------
   «Prima di iniziare» — le condizioni di lavoro, in forma breve.
   Non sostituisce il metodo: dice soltanto come si imposta il rapporto
   prima della prima riga di codice. Nessuna promessa di assistenza
   illimitata, nessuna clausola di rimborso, nessun impegno di
   disponibilità continua: quello che vale è scritto nel preventivo.
   --------------------------------------------------------------- */

export type Assurance = { title: string; body: string }

export const assurances: Assurance[] = [
  {
    title: 'Si parte dagli obiettivi',
    body: 'Prima guardo cosa serve e cosa deve ottenere il progetto. Definiamo il perimetro insieme, senza dare nulla per scontato.',
  },
  {
    title: 'Il preventivo è il punto di riferimento',
    body: 'Indica le attività comprese, quelle escluse, i tempi e i cicli di revisione previsti. È scritto e si legge prima di cominciare.',
  },
  {
    title: 'Le aggiunte si valutano prima',
    body: 'Se durante il lavoro serve qualcosa che non era previsto, te lo propongo e concordo prima di procedere.',
  },
  {
    title: 'I costi esterni sono dichiarati',
    body: 'Dominio, hosting, licenze e servizi di terzi hanno costi propri, esplicitati a parte: non sono compresi nel prezzo di realizzazione.',
  },
  {
    title: 'Consegna e assistenza sono scritte',
    body: 'Che cosa viene consegnato, quali accessi passano a te e quale assistenza è prevista si definiscono nel preventivo, caso per caso.',
  },
  {
    title: 'Il pagamento avviene con bonifico',
    body: 'Le istruzioni per il pagamento vengono comunicate direttamente nel rapporto con il cliente. Sul sito non si paga nulla.',
  },
]
