/* Prepara il video di presentazione e le schermate dei progetti «Linea
   Outdoor», «Casale Aurora» e «ATELIER», ricavando tutto dal montaggio
   narrato.

   Sorgente: i montaggi a 1920×1080 in video/ (fuori dal repository, vedi
             .gitignore).
   Esito:    public/video/<slug>-presentazione.mp4 e le schermate
             public/img/<slug>-*. Per Linea Outdoor e Casale Aurora la
             copertina del video non nasce qui: è un'immagine a sé, in
             desing-references/originals/<slug>-cover.webp. Per ATELIER la
             copertina è il primo fotogramma del video, già senza titoli né
             sottotitoli.

   Uso: node scripts/frames-siti.mjs [linea-outdoor|casale-aurora|atelier]  */
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const IMG = 'public/img'
const VID = 'public/video'
const TMP = '/tmp/crm-siti'

/* In fondo a ogni fotogramma dei montaggi da 90 secondi c'è la fascia scura
   dei sottotitoli: il sito occupa le prime 1000 righe, ed è quello che si
   ritaglia. */
const SITE = 'crop=1920:1000:0:0'

/* I momenti del filmato in cui la schermata è ferma e leggibile, nell'ordine
   in cui compaiono nella scheda. */
const sites = {
  'linea-outdoor': {
    src: 'video/linea-outdoor-90s.mp4',
    shots: [
      { t: 0.5, name: 'home' },
      { t: 12, name: 'soluzioni' },
      { t: 17, name: 'pergola' },
      { t: 24, name: 'progetto' },
      { t: 39, name: 'richiesta' },
      { t: 54, name: 'riepilogo' },
      { t: 73, name: 'titolare' },
      { t: 76, name: 'mobile' },
    ],
  },
  'casale-aurora': {
    src: 'video/casale-aurora-90s.mp4',
    shots: [
      { t: 1, name: 'home' },
      { t: 12, name: 'alloggi' },
      { t: 17, name: 'camera' },
      { t: 25.5, name: 'galleria' },
      { t: 43, name: 'disponibilita' },
      { t: 50, name: 'prezzo' },
      { t: 70, name: 'prenotazioni' },
      { t: 76, name: 'mobile' },
    ],
  },
  /* Qui il sito sta in un riquadro a 1824×912 (x 48, y 78), con il titolo
     del capitolo sopra e i sottotitoli sotto. Il ritaglio rientra di 4 px
     per lasciare fuori gli angoli arrotondati: resta un 2:1 pulito. */
  atelier: {
    src: 'video/atelier-estesa.mp4',
    crop: 'crop=1816:908:52:82',
    cover: 0,
    shots: [
      { t: 0.5, name: 'home' },
      { t: 41, name: 'prodotto' },
      { t: 54, name: 'cassa' },
      { t: 85, name: 'panoramica' },
      { t: 88, name: 'ordine' },
      { t: 132, name: 'spedizione' },
      { t: 166, name: 'nuovo-capo' },
      { t: 186, name: 'magazzino' },
      { t: 202, name: 'report' },
      { t: 236, name: 'statistiche' },
      { t: 248, name: 'posta' },
      { t: 256, name: 'banco' },
    ],
  },
}
const WIDTHS = [800, 1200, 1600]
const COVER_WIDTHS = [640, 960, 1280]

const ff = (args) => execFileSync('ffmpeg', ['-v', 'error', ...args], { stdio: 'inherit' })

function variants(raw, name, widths = WIDTHS) {
  for (const w of widths) {
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '80', '--resampleWidth', String(w),
      raw, '--out', join(IMG, `${name}-${w}.jpg`)], { stdio: 'ignore' })
    execFileSync('cwebp', ['-q', '80', '-resize', String(w), '0', raw, '-o', join(IMG, `${name}-${w}.webp`)],
      { stdio: 'ignore' })
  }
}

const only = process.argv[2]
mkdirSync(IMG, { recursive: true })
mkdirSync(VID, { recursive: true })

for (const [slug, site] of Object.entries(sites)) {
  if (only && only !== slug) continue
  const tmp = join(TMP, slug)
  rmSync(tmp, { recursive: true, force: true })
  mkdirSync(tmp, { recursive: true })

  /* Per il sito basta la metà della risoluzione, alla stessa qualità dei
     video di WALLT e di «Ordini da asporto». */
  ff(['-i', site.src, '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-crf', '30', '-preset', 'slow',
    '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    '-c:a', 'aac', '-b:a', '96k', join(VID, `${slug}-presentazione.mp4`), '-y'])

  if (site.cover !== undefined) {
    const raw = join(tmp, 'cover.png')
    ff(['-ss', String(site.cover), '-i', site.src, '-frames:v', '1', raw, '-y'])
    variants(raw, `${slug}-cover`, COVER_WIDTHS)
    console.log('fatto:', `${slug}-cover`)
  }

  for (const shot of site.shots) {
    const raw = join(tmp, `${shot.name}.png`)
    ff(['-ss', String(shot.t), '-i', site.src, '-frames:v', '1', '-vf', site.crop ?? SITE, raw, '-y'])
    variants(raw, `${slug}-${shot.name}`)
    console.log('fatto:', `${slug}-${shot.name}`)
  }
}
