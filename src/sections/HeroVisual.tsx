import './HeroVisual.css'

/** Scena decorativa composta in HTML e SVG, così i dispositivi si integrano nella hero. */
export function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-visual__light" />

      <div className="hero-visual__dashboard">
        <div className="hero-visual__dash-top"><span className="hero-visual__mark" /><span /><span /></div>
        <div className="hero-visual__dash-body">
          <aside className="hero-visual__sidebar"><i /><i /><i /><i /><i /><i /></aside>
          <div className="hero-visual__dash-content">
            <b className="hero-visual__dash-title">Panoramica</b>
            <div className="hero-visual__stats"><div><small>Fatturato</small><b>€ 8.230</b><em>+12%</em></div><div><small>Progetti</small><b>1.245</b><em>+8%</em></div></div>
            <div className="hero-visual__chart">
              <svg viewBox="0 0 300 92" preserveAspectRatio="none" aria-hidden="true"><path className="hero-visual__chart-fill" d="M0 72 C24 62 30 68 51 53 S80 61 102 43 S130 57 151 31 S181 44 204 26 S238 34 257 17 S280 25 300 6 V92 H0Z" /><path className="hero-visual__chart-line" d="M0 72 C24 62 30 68 51 53 S80 61 102 43 S130 57 151 31 S181 44 204 26 S238 34 257 17 S280 25 300 6" /></svg>
            </div>
            <div className="hero-visual__dash-lower"><div><small>Attività recenti</small><i /><i /><i /></div><div><small>Obiettivi</small><span className="hero-visual__ring">78%</span></div></div>
          </div>
        </div>
      </div>

      <div className="hero-visual__laptop">
        <div className="hero-visual__screen">
          <div className="hero-visual__nav"><b>studio<span>•</span></b><div>Home&nbsp;&nbsp;&nbsp; Servizi&nbsp;&nbsp;&nbsp; Progetti&nbsp;&nbsp;&nbsp; Chi siamo</div><small>Contattaci</small></div>
          <div className="hero-visual__landing">
            <div className="hero-visual__copy"><span>STUDIO DIGITALE</span><strong>Soluzioni digitali<br />per aziende<br />che vogliono crescere.</strong><p>Siti web, e-commerce e automazioni AI<br />per semplificare i processi e aumentare i risultati.</p><small>Scopri i nostri servizi&nbsp; →</small></div>
            <svg className="hero-visual__waves" viewBox="0 0 420 190" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="hero-wave" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#687080" /><stop offset=".5" stopColor="#171b23" /><stop offset="1" stopColor="#07090d" /></linearGradient></defs><path d="M0 129 78 98 155 112 218 44 271 13 330 71 420 40V190H0Z" fill="url(#hero-wave)" /><path d="m0 141 78-27 77 12 63-53 53-25 59 45 90-24" fill="none" stroke="#9aa3b4" strokeOpacity=".24" strokeWidth="1" /></svg>
          </div>
          <div className="hero-visual__tiles"><div>⌘<b>Sviluppo Web</b><small>Siti web moderni<br />e performanti.</small></div><div>▧<b>E-commerce</b><small>Negozi online<br />su misura.</small></div><div>◇<b>Automazioni</b><small>Processi più semplici<br />e più veloci.</small></div><div>◎<b>Consulenza</b><small>Strategia e supporto<br />continuo.</small></div></div>
        </div>
        <div className="hero-visual__laptop-base"><span /></div>
      </div>

      <div className="hero-visual__phone">
        <div className="hero-visual__phone-island" />
        <div className="hero-visual__phone-nav"><b>studio<span>•</span></b><i>☰</i></div>
        <div className="hero-visual__phone-copy"><strong>Soluzioni digitali<br />per aziende<br />che vogliono crescere.</strong><p>Siti web e automazioni AI per semplificare i processi.</p><small>Scopri i nostri servizi&nbsp; →</small></div>
        <div className="hero-visual__phone-card"><b>⌘　Sviluppo Web</b><small>Siti web moderni e performanti.</small></div>
      </div>
    </div>
  )
}
