/* ---------------------------------------------------------------
   Modulo contatti → email.
   Serverless Function di Vercel: riceve il modulo, lo valida e lo
   inoltra via email con Resend (https://resend.com).

   Trattamento dei dati (GDPR):
   - non salva nulla: niente database, niente file, niente log del
     contenuto. Il messaggio esiste solo nell'email che arriva;
   - inoltra solo i campi del modulo (minimizzazione), non IP né
     user agent;
   - l'invio avviene su HTTPS verso Resend, responsabile del
     trattamento indicato nell'informativa.

   Variabili d'ambiente (Vercel → Settings → Environment Variables):
     RESEND_API_KEY   chiave API di Resend
     CONTACT_TO       casella che riceve le richieste
                      (facoltativa: di base support@crm-lab.it)
     CONTACT_FROM     mittente su un dominio verificato in Resend,
                      es. "CRM LAB <modulo@crm-lab.it>"
   --------------------------------------------------------------- */

type Payload = { name?: unknown; email?: unknown; topic?: unknown; message?: unknown; website?: unknown }

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })

const text = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export async function POST(request: Request): Promise<Response> {
  const { RESEND_API_KEY, CONTACT_FROM } = process.env
  const CONTACT_TO = process.env.CONTACT_TO || 'support@crm-lab.it'
  if (!RESEND_API_KEY || !CONTACT_FROM) {
    return json(503, { error: 'Servizio di invio non configurato.' })
  }

  // Solo richieste dal sito stesso.
  const origin = request.headers.get('origin')
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json(403, { error: 'Origine non consentita.' })
  }

  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return json(400, { error: 'Richiesta non valida.' })
  }

  // Campo trappola pieno: è un bot. Rispondiamo ok senza inviare nulla.
  if (text(body.website, 200)) return json(200, { ok: true })

  const name = text(body.name, 120)
  const email = text(body.email, 200)
  const topic = text(body.topic, 120)
  const message = text(body.message, 5000)

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || message.length < 20) {
    return json(422, { error: 'Campi mancanti o non validi.' })
  }

  const rows = [
    ['Nome', name],
    ['Email', email],
    ['Argomento', topic || 'Da chiarire insieme'],
  ]

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: CONTACT_TO.split(',').map((address) => address.trim()),
      reply_to: email,
      subject: `Nuova richiesta dal sito — ${name}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message}`,
      html: `<table>${rows
        .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
        .join('')}</table><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  })

  // In caso di errore si registra solo lo stato, mai il contenuto del messaggio.
  if (!response.ok) {
    console.error(`Invio email non riuscito: HTTP ${response.status}`)
    return json(502, { error: 'Invio non riuscito.' })
  }

  return json(200, { ok: true })
}
