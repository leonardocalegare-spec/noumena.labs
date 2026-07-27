import { parse } from 'yaml'

export const contentTypes = {
  video: { label: 'Vídeo', prefix: 'VID' },
  study: { label: 'Estudo', prefix: 'EST' },
  learning: { label: 'Aprendizado', prefix: 'APR' },
}

const youtubeIdPattern = /^[\w-]{11}$/

export function normalizeYouTubeId(value = '') {
  const candidate = String(value).trim()
  if (!candidate) return ''
  if (youtubeIdPattern.test(candidate)) return candidate

  try {
    const url = new URL(candidate)
    if (url.hostname === 'youtu.be') {
      return url.pathname.split('/').filter(Boolean)[0] || ''
    }

    if (url.hostname === 'youtube.com' || url.hostname.endsWith('.youtube.com')) {
      if (url.pathname === '/watch') return url.searchParams.get('v') || ''
      const [, kind, id] = url.pathname.split('/')
      if (['embed', 'shorts', 'live'].includes(kind)) return id || ''
    }
  } catch {
    return ''
  }

  return ''
}

export function parseCadernoSource(source, file = 'conteúdo') {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    throw new Error(`${file}: front matter YAML ausente`)
  }

  const metadata = parse(match[1]) || {}
  return { metadata, body: match[2].trim() }
}

export function validateCaderno({ metadata, body }, file = 'conteúdo') {
  const errors = []
  const add = (message) => errors.push(`${file}: ${message}`)

  if (!metadata.title || String(metadata.title).trim().length < 8) add('title deve ter pelo menos 8 caracteres')
  if (!metadata.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.slug)) add('slug deve usar letras minúsculas, números e hífens')
  if (!metadata.summary || String(metadata.summary).trim().length < 30) add('summary deve ter pelo menos 30 caracteres')
  if (!contentTypes[metadata.type]) add('type deve ser video, study ou learning')
  if (!Number.isInteger(metadata.sequence) || metadata.sequence < 1) add('sequence deve ser um número inteiro positivo')
  if (!['draft', 'published', 'archived'].includes(metadata.status)) add('status deve ser draft, published ou archived')
  if (!Array.isArray(metadata.topics) || metadata.topics.length === 0) add('topics deve conter ao menos um tema')
  if (typeof metadata.featured !== 'boolean') add('featured deve ser true ou false')
  if (!body || body.split(/\s+/).length < 20) add('o corpo deve conter pelo menos 20 palavras')

  if (metadata.status === 'published' && !/^\d{4}-\d{2}-\d{2}$/.test(metadata.publishedAt || '')) {
    add('publishedAt é obrigatório no formato AAAA-MM-DD')
  }

  if (metadata.updatedAt && !/^\d{4}-\d{2}-\d{2}$/.test(metadata.updatedAt)) {
    add('updatedAt deve usar o formato AAAA-MM-DD')
  }

  if (metadata.type === 'video') {
    const videoId = normalizeYouTubeId(metadata.video?.id || metadata.video?.url)
    if (metadata.status === 'published' && !youtubeIdPattern.test(videoId)) {
      add('um vídeo publicado precisa de um ID ou URL válida do YouTube')
    }
  }

  return errors
}

export function createHeadingId(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function extractHeadings(markdown) {
  let insideCodeBlock = false

  return markdown.split(/\r?\n/).flatMap((line) => {
    if (line.startsWith('```')) {
      insideCodeBlock = !insideCodeBlock
      return []
    }
    if (insideCodeBlock) return []

    const match = line.match(/^(#{2,3})\s+(.+)$/)
    if (!match) return []
    const text = match[2].replace(/[*_`[\]]/g, '').trim()
    return [{ level: match[1].length, text, id: createHeadingId(text) }]
  })
}

export function buildCaderno({ metadata, body }, sourcePath = '') {
  const type = contentTypes[metadata.type]
  const wordCount = body.split(/\s+/).filter(Boolean).length
  const youtubeId = normalizeYouTubeId(metadata.video?.id || metadata.video?.url)

  return {
    ...metadata,
    body,
    sourcePath,
    code: `${type.prefix}/${String(metadata.sequence).padStart(3, '0')}`,
    typeLabel: type.label,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 220)),
    headings: extractHeadings(body),
    video: metadata.type === 'video'
      ? { ...metadata.video, id: youtubeId }
      : undefined,
  }
}

export function formatPublicationDate(value) {
  if (!value) return 'Rascunho'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}
