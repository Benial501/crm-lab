/* ---------------------------------------------------------------
   Testimonianze reali.
   L'elenco è volutamente vuoto: non pubblichiamo recensioni simulate.
   Aggiungendo una voce verificata (con autorizzazione della persona
   citata) la homepage mostra la sezione "Dicono di noi" al posto
   della sezione "Come lavoriamo davvero".
   --------------------------------------------------------------- */

export type Testimonial = {
  quote: string
  author: string
  role: string
}

export const testimonials: Testimonial[] = []
