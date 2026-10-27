/* Prepara il video di presentazione e le schermate dei progetti «Linea
   Outdoor» e «Casale Aurora», ricavando tutto dal montaggio narrato.

   Sorgente: i montaggi a 1920×1080 in video/ (fuori dal repository, vedi
             .gitignore).
   Esito:    public/video/<slug>-presentazione.mp4, la copertina
             public/img/<slug>-cover-* e le schermate public/img/<slug>-*.

   Uso: node scripts/frames-siti.mjs [linea-outdoor|casale-aurora]          */
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const IMG = 'public/img'
const VID = 'public/video'
const TMP = '/tmp/crm-siti'

/* I momenti del filmato in cui la schermata è ferma e leggibile, nell'ordine
   in cui compaiono nella scheda. `cover` è il fotogramma della copertina,
   `coverRows` quante righe del sito tenerne: sotto c'è solo fondo pagina. */
const sites = {
  'linea-outdoor': {
    src: 'video/linea-outdoor-90s.mp4',
    cover: 0.5,
    coverRows: 1000,
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
    cover: 1,
    // Sotto il motore di ricerca comincia la sezione dopo: la si lascia fuori.
    coverRows: 940,
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
}
const WIDTHS = [800, 1200, 1600]
const COVER_WIDTHS = [640, 960, 1280]

/* In fondo a ogni fotogramma c'è la fascia scura dei sottotitoli: il sito
   occupa le prime 1000 righe, ed è quello che si ritaglia. */
const SITE = 'crop=1920:1000:0:0'

const ff = (args) => execFileSync('ffmpeg', ['-v', 'error', ...args], { stdio: 'inherit' })
const magick = (args) => execFileSync('magick', args, { encoding: 'utf8' })

function variants(raw, name, widths) {
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

  /* La copertina è la prima schermata del sito, in 16:9 come il riquadro
     del video: sotto le righe del sito si allunga il fondo pagina, invece
     di lasciare la fascia dei sottotitoli. */
  const top = join(tmp, 'cover-site.png')
  ff(['-ss', String(site.cover), '-i', site.src, '-frames:v', '1',
    '-vf', `crop=1920:${site.coverRows}:0:0`, top, '-y'])
  const fondo = magick([top, '-format', `%[pixel:p{960,${site.coverRows - 2}}]`, 'info:']).trim()
  const cover = join(tmp, 'cover.png')
  magick([top, '-background', fondo, '-gravity', 'north', '-extent', '1920x1080', cover])
  variants(cover, `${slug}-cover`, COVER_WIDTHS)

  for (const shot of site.shots) {
    const raw = join(tmp, `${shot.name}.png`)
    ff(['-ss', String(shot.t), '-i', site.src, '-frames:v', '1', '-vf', SITE, raw, '-y'])
    variants(raw, `${slug}-${shot.name}`, WIDTHS)
    console.log('fatto:', `${slug}-${shot.name}`)
  }
}
