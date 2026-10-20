/* ---------------------------------------------------------------
   Domande frequenti.
   Le risposte restano coerenti con il listino (src/data/pricing.ts):
   se cambia un pacchetto, va riletta la risposta che lo riguarda.
   --------------------------------------------------------------- */

export type FaqItem = { q: string; a: string }

export const faq: FaqItem[] = [
  {
    q: 'Che cosa comprende il prezzo?',
    a: 'Le attività elencate nella voce di listino scelta: pagine, impostazione grafica, adattamento a telefono e desktop, il canale di contatto concordato, i cicli di revisione previsti e la pubblicazione sull’ambiente concordato. Ogni voce dichiara anche che cosa resta fuori. Il preventivo conferma il perimetro prima dell’avvio.',
  },
  {
    q: 'Come avviene il pagamento?',
    a: 'Il pagamento viene concordato prima dell’inizio del progetto e può essere effettuato tramite bonifico bancario.',
  },
  {
    q: 'Viene rilasciato un documento per il pagamento?',
    a: 'Sì. Per ogni compenso viene rilasciata regolare ricevuta relativa alla prestazione effettuata. Attualmente CRM LAB opera senza Partita IVA per prestazioni occasionali; di conseguenza viene emessa una ricevuta e non una fattura.',
  },
  {
    q: 'Posso richiedere una fattura?',
    a: 'Al momento non è prevista l’emissione di fattura. Per i lavori svolti viene rilasciata una ricevuta relativa alla prestazione effettuata. Le condizioni e la documentazione del pagamento vengono comunque chiarite con il cliente prima dell’avvio del progetto.',
  },
  {
    q: 'Che cosa devo fornire?',
    a: 'Testi e immagini dei contenuti, le informazioni sull’attività e i riferimenti di contatto da pubblicare. Se servono accessi a dominio, hosting o servizi già in uso, li chiediamo in fase di analisi. Dove non indicato diversamente, la scrittura estesa dei testi e la produzione fotografica non sono comprese.',
  },
  {
    q: 'Come vengono concordati i tempi?',
    a: 'La stima nasce dall’analisi iniziale e viene scritta nel preventivo insieme al perimetro. Dipende anche da quando arrivano contenuti e riscontri: i passaggi che richiedono una tua risposta spostano la data di consegna, e te lo comunico mentre succede.',
  },
  {
    q: 'Quante revisioni sono incluse?',
    a: 'Il numero di cicli è indicato nella voce di listino: uno per la landing page, due per il sito aziendale e per il sito con contenuti aggiornabili. Per le voci su preventivo si concorda nell’offerta. Una revisione è una raccolta di richieste, non una modifica alla volta.',
  },
  {
    q: 'Posso aggiornare i contenuti?',
    a: 'Dipende da come è costruito il sito. La landing page e il sito aziendale vengono consegnati senza pannello di gestione: le modifiche si concordano a parte. Il sito con contenuti aggiornabili comprende un tipo di contenuto che gestisci tu, con accesso editoriale e istruzioni per pubblicare.',
  },
  {
    q: 'Chi gestisce dominio e hosting?',
    a: 'I costi di dominio, hosting, licenze e servizi esterni sono indicati a parte e non sono compresi nel prezzo di realizzazione. Possono essere intestati a te, ed è la soluzione che consiglio. Se gli accessi sono già tuoi, lavoro su quelli.',
  },
  {
    q: 'Cosa succede dopo la consegna?',
    a: 'Alla consegna passano il materiale concordato e gli accessi previsti dal preventivo, con le istruzioni essenziali per l’uso. L’assistenza successiva non è automatica: si definisce nel preventivo, per durata e perimetro.',
  },
  {
    q: 'Si può migliorare un sito già esistente?',
    a: 'Sì. Si parte guardando com’è fatto il sito attuale, su cosa gira e quali accessi ci sono. Da lì si valuta se conviene intervenire sull’esistente o rifarlo, e il perimetro dell’intervento finisce nel preventivo come per un progetto nuovo.',
  },
]
