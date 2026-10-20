import { Link } from 'react-router-dom'

/**
 * Barra che accompagna ogni demo.
 * Serve a non lasciare dubbi: quello che si sta guardando è un concept
 * realizzato da CRM LAB, non il sito di un cliente. Resta in cima,
 * fuori dal documento della demo, e riporta alla home.
 */
export function DemoChrome({ name, kind }: { name: string; kind: string }) {
  return (
    <div className="demobar">
      <p className="demobar__text">
        <strong>Demo CRM LAB</strong>
        <span>
          {name} — {kind}. Progetto dimostrativo: nomi, testi, prezzi e numeri sono di esempio.
        </span>
      </p>
      <Link to="/" className="demobar__back">
        Torna a CRM LAB
      </Link>
    </div>
  )
}
