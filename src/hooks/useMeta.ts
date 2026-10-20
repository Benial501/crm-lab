import { useEffect } from 'react'

type Meta = { title: string; description: string; canonical?: string }

const setTag = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/** Aggiorna title, description e canonical al cambio di pagina. */
export function useMeta({ title, description, canonical }: Meta) {
  useEffect(() => {
    document.title = title
    setTag('meta[name="description"]', 'content', description)
    setTag('meta[property="og:title"]', 'content', title)
    setTag('meta[property="og:description"]', 'content', description)
    if (canonical) setTag('link[rel="canonical"]', 'href', canonical)
  }, [title, description, canonical])
}
