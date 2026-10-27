/* Cattura le schermate reali della demo Orso Nero e le prepara in WebP + JPEG
   alle larghezze dichiarate in src/data/projects.ts. */
import { chromium } from 'playwright'
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const BASE = process.argv[2] || 'http://localhost:52379'
const OUT = 'public/img'
const TMP = '/tmp/crm-shots'
mkdirSync(OUT, { recursive: true })
rmSync(TMP, { recursive: true, force: true })
mkdirSync(TMP, { recursive: true })

const jobs = [
  { url: '/demo/orso-nero', name: 'demo-shop-desktop', w: 1440, h: 900, scrollTo: 0, widths: [800, 1200, 1600] },
  { url: '/demo/orso-nero', name: 'demo-shop-scroll', w: 1440, h: 900, scrollTo: 820, widths: [800, 1200, 1600] },
  { url: '/demo/orso-nero', name: 'demo-shop-detail', w: 1440, h: 900, scrollTo: 1750, widths: [800, 1200, 1600] },
  { url: '/demo/orso-nero', name: 'demo-shop-mobile', w: 390, h: 823, scrollTo: 700, widths: [390, 780] },
]

const browser = await chromium.launch()
for (const job of jobs) {
  const page = await browser.newPage({ viewport: { width: job.w, height: job.h }, deviceScaleFactor: 2 })
  await page.goto(BASE + job.url, { waitUntil: 'networkidle' })
  // La barra "Demo CRM LAB" serve nel sito, non dentro la miniatura.
  await page.addStyleTag({ content: '.demobar{display:none !important}' })
  if (job.scrollTo) await page.evaluate((y) => window.scrollTo(0, y), job.scrollTo)
  await page.waitForTimeout(500)
  const raw = join(TMP, `${job.name}.png`)
  await page.screenshot({ path: raw })
  await page.close()

  for (const w of job.widths) {
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '80', '--resampleWidth', String(w),
      raw, '--out', join(OUT, `${job.name}-${w}.jpg`)], { stdio: 'ignore' })
    execFileSync('cwebp', ['-q', '80', '-resize', String(w), '0', raw, '-o', join(OUT, `${job.name}-${w}.webp`)],
      { stdio: 'ignore' })
  }
  console.log('fatto:', job.name)
}
await browser.close()
