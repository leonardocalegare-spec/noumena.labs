import { useEffect } from 'react'

function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

export default function PageMeta({ title, description, canonicalPath, type = 'website' }) {
  useEffect(() => {
    const canonical = new URL(canonicalPath, window.location.origin).href
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', canonical)
    setMeta('meta[property="og:type"]', 'content', type)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', canonical)
  }, [canonicalPath, description, title, type])

  return null
}
