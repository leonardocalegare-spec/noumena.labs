import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { loadContentDocuments, projectRoot } from './content-utils.js'

const distDirectory = path.join(projectRoot, 'dist')
const indexPath = path.join(distDirectory, 'index.html')
const siteUrl = (process.env.SITE_URL || 'https://leonardocalegare-spec.github.io/noumena.labs/').replace(/\/?$/, '/')
const today = new Date().toISOString().slice(0, 10)
const documents = await loadContentDocuments()
const published = documents
  .map(({ item }) => item)
  .filter((item) => item.status === 'published' && item.publishedAt <= today)

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function replaceMetadata(html, { title, description, url, type = 'website' }) {
  const safeTitle = escapeHtml(title)
  const safeDescription = escapeHtml(description)
  const safeUrl = escapeHtml(url)

  return html
    .replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${safeDescription}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${safeUrl}" />`)
    .replace(/<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="${type}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${safeTitle}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${safeDescription}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${safeUrl}" />`)
}

async function createRoute(relativePath, metadata) {
  const directory = path.join(distDirectory, relativePath)
  await mkdir(directory, { recursive: true })
  const html = replaceMetadata(await readFile(indexPath, 'utf8'), metadata)
  await writeFile(path.join(directory, 'index.html'), html, 'utf8')
}

await createRoute('cadernos', {
  title: 'Cadernos Noumena — Estudos, dicas e projetos',
  description: 'Estudos, dicas, experimentos e decisões de projeto compartilhados pela Noumena Labs.',
  url: `${siteUrl}cadernos/`,
})

await Promise.all(published.map((item) => createRoute(path.join('cadernos', item.slug), {
  title: `${item.title} — Cadernos Noumena`,
  description: item.summary,
  url: `${siteUrl}cadernos/${item.slug}/`,
  type: 'article',
})))

const sitemapEntries = [
  { loc: siteUrl, priority: '1.0' },
  { loc: `${siteUrl}cadernos/`, priority: '0.8' },
  ...published.map((item) => ({
    loc: `${siteUrl}cadernos/${item.slug}/`,
    priority: item.featured ? '0.8' : '0.7',
    lastmod: item.updatedAt || item.publishedAt,
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.map((entry) => `  <url>\n    <loc>${entry.loc}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}\n    <priority>${entry.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`
await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap, 'utf8')

console.log(`Rotas editoriais geradas: ${published.length + 1}`)
