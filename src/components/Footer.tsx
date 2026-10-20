import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { Channels } from './Channels'
import { configuredChannels, legal, navigation, site } from '../data/site'
import { useSectionLink } from '../hooks/useSectionLink'
import './Footer.css'

/**
 * Piè di pagina condiviso (home, schede progetto, 404).
 * Tre gruppi e una riga di chiusura. Niente icone senza destinazione,
 * niente collegamenti a pagine che non esistono: quello che non è
 * verificato non compare.
 */
export function Footer() {
  const goToSection = useSectionLink()
  const year = new Date().getFullYear()
  const channels = configuredChannels()

  return (
    <footer className="footer">
      <div className="board footer__inner">
        {/* Identità */}
        <div className="footer__brand">
          <Link
            to="/"
            className="footer__logo"
            onClick={goToSection('/#top')}
            aria-label="CRM LAB, vai alla home"
          >
            <img
              src="/img/logo-crmlab.png"
              alt=""
              width={288}
              height={136}
              className="footer__logo-img"
            />
          </Link>
          <p className="footer__desc">
            Siti web e strumenti digitali su misura per attività e professionisti.
          </p>
          <a href="/#contatti" className="link footer__link" onClick={goToSection('/#contatti')}>
            Contatti
            <Icon name="arrow" size={14} />
          </a>
        </div>

        {/* Navigazione: solo sezioni che esistono davvero */}
        <nav className="footer__group" aria-label="Navigazione nel piè di pagina">
          <h2 className="footer__heading">Naviga</h2>
          <ul className="footer__list">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={goToSection(item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contatti: nessun recapito inventato */}
        <div className="footer__group">
          <h2 className="footer__heading">Scrivimi</h2>
          <ul className="footer__list">
            <li>
              <a href="/#contatti" onClick={goToSection('/#contatti')}>
                Modulo di contatto
              </a>
            </li>
            {site.phone && (
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              </li>
            )}
            {site.location && <li className="footer__plain">{site.location}</li>}
          </ul>
          {channels.length > 0 && <Channels className="footer__channels" configuredOnly />}
        </div>
      </div>

      <div className="board footer__bottom">
        <p>© {year} CRM LAB</p>
        <p>WALLT è un’applicazione dello studio in uso al suo indirizzo pubblico; gli altri tre progetti sono concept dimostrativi, non lavori commissionati.</p>
        {(legal.privacy || legal.cookiePolicy || legal.cookiePrefs) && (
          <ul className="footer__legal">
            {legal.privacy && (
              <li>
                <Link to={legal.privacy}>Informativa privacy</Link>
              </li>
            )}
            {legal.cookiePolicy && (
              <li>
                <Link to={legal.cookiePolicy}>Informativa cookie</Link>
              </li>
            )}
            {legal.cookiePrefs && (
              <li>
                <button type="button" className="footer__prefs" data-cookie-prefs>
                  Preferenze cookie
                </button>
              </li>
            )}
          </ul>
        )}
        {site.legal && <p>{site.legal}</p>}
      </div>
    </footer>
  )
}
