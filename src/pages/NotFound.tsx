import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useMeta } from '../hooks/useMeta'

export function NotFound() {
  useMeta({
    title: 'Pagina non trovata — CRM LAB',
    description: 'La pagina cercata non esiste o è stata spostata.',
  })

  return (
    <section className="band notfound">
      <div className="board">
        <h1 className="t-display notfound__title">Questa pagina non esiste.</h1>
        <p className="t-lead notfound__text">
          L’indirizzo è sbagliato oppure la pagina è stata spostata. Dalla home trovi i progetti, i
          servizi, il listino e i contatti.
        </p>
        <Link to="/" className="btn notfound__btn">
          Torna alla home
          <Icon name="arrow" size={16} className="btn__arrow" />
        </Link>
      </div>
    </section>
  )
}
