import { useMemo, useState } from 'react'
import { DemoChrome } from './DemoChrome'
import { useMeta } from '../hooks/useMeta'
import './shop.css'

type Product = {
  id: string
  name: string
  origin: string
  notes: string
  roast: 'Filtro' | 'Espresso'
  price: number
  tone: string
}

const products: Product[] = [
  { id: 'kochere', name: 'Kochere', origin: 'Etiopia · Yirgacheffe', notes: 'Bergamotto, tè nero, pesca bianca', roast: 'Filtro', price: 14, tone: '#d9a441' },
  { id: 'la-esperanza', name: 'La Esperanza', origin: 'Colombia · Huila', notes: 'Cacao, arancia rossa, nocciola', roast: 'Espresso', price: 13, tone: '#b5482f' },
  { id: 'kiamugumo', name: 'Kiamugumo', origin: 'Kenya · Kirinyaga', notes: 'Ribes nero, pomodoro, canna', roast: 'Filtro', price: 16, tone: '#7b3f52' },
  { id: 'finca-el-roble', name: 'Finca el Roble', origin: 'Guatemala · Huehuetenango', notes: 'Miele, mandorla, mela cotta', roast: 'Espresso', price: 12, tone: '#8a6a36' },
  { id: 'wush-wush', name: 'Wush Wush', origin: 'Etiopia · Bench Maji', notes: 'Litchi, gelsomino, zucchero filato', roast: 'Filtro', price: 21, tone: '#5c7a4a' },
  { id: 'abbonamento', name: 'Abbonamento mensile', origin: 'Selezione del torrefattore', notes: 'Due sacchetti al mese, spedizione inclusa', roast: 'Espresso', price: 26, tone: '#2f3b4a' },
]

const filters = ['Tutti', 'Filtro', 'Espresso'] as const

export function ShopDemo() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('Tutti')
  const [cart, setCart] = useState<Record<string, number>>({})

  useMeta({
    title: 'Orso Nero — Demo CRM LAB',
    description: 'Concept di e-commerce per una torrefazione indipendente, realizzato da CRM LAB.',
  })

  const shown = useMemo(
    () => (filter === 'Tutti' ? products : products.filter((p) => p.roast === filter)),
    [filter],
  )

  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = Object.entries(cart).reduce(
    (sum, [id, qty]) => sum + (products.find((p) => p.id === id)?.price ?? 0) * qty,
    0,
  )

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }))

  return (
    <>
      <DemoChrome name="Orso Nero" kind="e-commerce per un brand indipendente" />
      <div className="demo sh">
        <header className="sh__bar">
          <span className="sh__mark">Orso Nero</span>
          <nav className="sh__nav" aria-label="Navigazione del negozio">
            <a href="#caffe">Caffè</a>
            <a href="#abbonamento">Abbonamento</a>
            <a href="#torrefazione">La torrefazione</a>
          </nav>
          <p className="sh__cart" aria-live="polite">
            Carrello<span className="sh__cart-count">{count}</span>
            <span className="sh__cart-total">{count > 0 ? `${total},00 €` : '—'}</span>
          </p>
        </header>

        <section className="sh__hero">
          <div className="sh__hero-text">
            <h1>Tostiamo il martedì. Parte il mercoledì.</h1>
            <p className="sh__lede">
              Microtorrefazione a Trieste. Sei caffè alla volta, nessun magazzino: quello che compri è
              stato tostato meno di otto giorni fa.
            </p>
            <a href="#caffe" className="sh__btn">
              Vedi i caffè in tostatura
            </a>
          </div>
          <div className="sh__hero-art" aria-hidden="true">
            <span className="sh__bag sh__bag--1" />
            <span className="sh__bag sh__bag--2" />
            <span className="sh__bag sh__bag--3" />
          </div>
        </section>

        <section className="sh__shop" id="caffe">
          <div className="sh__shop-head">
            <h2 className="sh__h2">In tostatura adesso</h2>
            <div className="sh__filters" role="group" aria-label="Filtra per metodo">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`sh__filter${filter === f ? ' sh__filter--on' : ''}`}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <ul className="sh__grid">
            {shown.map((p) => (
              <li key={p.id} className="sh__product" id={p.id === 'abbonamento' ? 'abbonamento' : undefined}>
                <div className="sh__product-art" style={{ background: p.tone }} aria-hidden="true">
                  <span className="sh__label">
                    <span className="sh__label-name">{p.name}</span>
                    <span className="sh__label-roast">{p.roast}</span>
                  </span>
                </div>
                <div className="sh__product-body">
                  <p className="sh__origin">{p.origin}</p>
                  <h3>{p.name}</h3>
                  <p className="sh__notes">{p.notes}</p>
                  <div className="sh__product-foot">
                    <span className="sh__price">{p.price},00 €</span>
                    <button type="button" className="sh__add" onClick={() => add(p.id)}>
                      Aggiungi
                      {cart[p.id] ? <span className="sh__qty">{cart[p.id]}</span> : null}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="sh__story" id="torrefazione">
          <h2 className="sh__h2 sh__h2--light">Perché solo sei caffè</h2>
          <p className="sh__story-text">
            Un catalogo corto è una scelta commerciale, non un limite: possiamo comprare lotti piccoli,
            pagarli il giusto e tostarli finché sono buoni, invece di tenere venti referenze ferme in
            magazzino. Quando un lotto finisce, sparisce dal sito.
          </p>
          <dl className="sh__numbers">
            <div>
              <dt>Lotti all’anno</dt>
              <dd>24</dd>
            </div>
            <div>
              <dt>Giorni dalla tostatura</dt>
              <dd>max 8</dd>
            </div>
            <div>
              <dt>Spedizione in Italia</dt>
              <dd>4,90 €</dd>
            </div>
          </dl>
        </section>

        <footer className="sh__foot">
          <p>Orso Nero — concept dimostrativo CRM LAB</p>
          <p>Prodotti, prezzi e disponibilità sono di esempio. Il carrello non porta a un pagamento reale.</p>
        </footer>
      </div>
    </>
  )
}
