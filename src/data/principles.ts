/* ---------------------------------------------------------------
   I principi di lavoro, mostrati dentro la sezione «Chi siamo».
   Dicono come ci comportiamo: sono l'alternativa onesta alle recensioni
   finché non ci sono testimonianze reali (vedi testimonials.ts).
   --------------------------------------------------------------- */

export type Principle = { title: string; body: string }

export const principles: Principle[] = [
  {
    title: 'Prima il problema, poi lo strumento',
    body: 'Capisco come lavori oggi prima di proporre una tecnologia. A volte la risposta giusta è più piccola di quella che ti aspetti.',
  },
  {
    title: 'Niente promesse che non possiamo mantenere',
    body: 'Definisco cosa posso fare, in quanto tempo e a quali condizioni. Se una cosa non conviene, te lo dico prima di cominciare.',
  },
  {
    title: 'Il progetto resta tuo',
    body: 'Codice, account e dati sono intestati a te. Documentiamo quello che consegniamo, così puoi farlo proseguire a chiunque.',
  },
  {
    title: 'L’AI dove serve, non dappertutto',
    body: 'La uso quando riduce lavoro manuale in modo misurabile. Dove bastano regole semplici, scelgo regole semplici.',
  },
]
