/* Prepara il video di presentazione del progetto «Ordini da asporto» e le
   schermate che la scheda mostra, ricavandole dai fotogrammi del filmato.

   Sorgente: il montaggio a 1920×1080 (fuori dal repository, vedi .gitignore).
   Esito:    public/video/asporto-presentazione.mp4 e public/img/asporto-*.

   Uso: node scripts/frames-asporto.mjs [percorso/del/montaggio.mp4]       */
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const SRC = process.argv[2] || 'video/video-prenotazioni.mp4'
const IMG = 'public/img'
const VID = 'public/video'
const TMP = '/tmp/crm-asporto'

/* I momenti del filmato in cui si vede una schermata intera, nell'ordine in
   cui compaiono nella scheda. `full` è il fotogramma preso per intero: vale
   per la copertina, dove non c'è una finestra da ritagliare. */
const shots = [
  { t: 15, name: 'asporto-cliente' },
  { t: 95, name: 'asporto-prodotto' },
  { t: 128, name: 'asporto-checkout' },
  { t: 160, name: 'asporto-ordini' },
  { t: 188, name: 'asporto-comanda' },
  { t: 200, name: 'asporto-menu' },
  { t: 212, name: 'asporto-orari' },
]
const cover = { t: 297, name: 'asporto-cover-logo', full: true, widths: [640, 960, 1280] }
const WIDTHS = [800, 1200, 1600]

rmSync(TMP, { recursive: true, force: true })
mkdirSync(TMP, { recursive: true })
mkdirSync(IMG, { recursive: true })
mkdirSync(VID, { recursive: true })

const ff = (args) => execFileSync('ffmpeg', ['-v', 'error', ...args], { stdio: 'inherit' })

/* Il montaggio pesa quasi 60 MB: per il sito basta la metà della risoluzione,
   alla stessa qualità del video di WALLT. */
ff(['-i', SRC, '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-crf', '30', '-preset', 'slow',
  '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  '-c:a', 'aac', '-b:a', '96k', join(VID, 'asporto-presentazione.mp4'), '-y'])

/* Dentro ogni fotogramma la schermata è l'unico rettangolo chiaro sul fondo
   scuro: la si trova cercando le righe e le colonne con una lunga fila di
   pixel luminosi, così il ritaglio esclude il titolo e i sottotitoli. */
function windowBox(gray) {
  const a = readFileSync(gray)
  const W = 1920, H = 1080
  const lit = (i) => a[i] > 90
  const longRun = (next, len, min) => {
    let best = 0, cur = 0
    for (let i = 0; i < len; i++) { cur = lit(next(i)) ? cur + 1 : 0; if (cur > best) best = cur }
    return best > min
  }
  const cols = [], rows = []
  for (let x = 0; x < W; x++) if (longRun((y) => y * W + x, H, 300)) cols.push(x)
  for (let y = 0; y < H; y++) if (longRun((x) => y * W + x, W, 400)) rows.push(y)
  return { x: cols[0], y: rows[0], w: cols[cols.length - 1] - cols[0] + 1, h: rows[rows.length - 1] - rows[0] + 1 }
}

for (const shot of [...shots, cover]) {
  const raw = join(TMP, `${shot.name}.png`)
  if (shot.full) {
    ff(['-ss', String(shot.t), '-i', SRC, '-frames:v', '1', raw, '-y'])
  } else {
    const gray = join(TMP, `${shot.name}.gray`)
    ff(['-ss', String(shot.t), '-i', SRC, '-frames:v', '1', '-pix_fmt', 'gray', '-f', 'rawvideo', gray, '-y'])
    const b = windowBox(gray)
    ff(['-ss', String(shot.t), '-i', SRC, '-frames:v', '1',
      '-vf', `crop=${b.w}:${b.h}:${b.x}:${b.y}`, raw, '-y'])
  }
  for (const w of shot.widths || WIDTHS) {
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '80', '--resampleWidth', String(w),
      raw, '--out', join(IMG, `${shot.name}-${w}.jpg`)], { stdio: 'ignore' })
    execFileSync('cwebp', ['-q', '80', '-resize', String(w), '0', raw, '-o', join(IMG, `${shot.name}-${w}.webp`)],
      { stdio: 'ignore' })
  }
  console.log('fatto:', shot.name)
}
