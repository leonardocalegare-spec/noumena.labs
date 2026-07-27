import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { stringify } from 'yaml'
import { parseCadernoSource, validateCaderno } from '../src/lib/articleSchema.js'
import { contentDirectory } from './content-utils.js'
import { generateContent } from './generate-content.js'

const [status, slug] = process.argv.slice(2)
if (!['published', 'archived'].includes(status) || !slug) {
  console.error('Uso: node scripts/content-status.js <published|archived> <slug>')
  process.exit(1)
}

const file = path.join(contentDirectory, `${slug}.md`)
const source = await readFile(file, 'utf8')
const parsed = parseCadernoSource(source, file)
const today = new Date().toISOString().slice(0, 10)
parsed.metadata.status = status
parsed.metadata.updatedAt = today
if (status === 'published' && !parsed.metadata.publishedAt) parsed.metadata.publishedAt = today

const errors = validateCaderno(parsed, file)
if (errors.length) {
  console.error(`Publicação não alterada:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

await writeFile(file, `---\n${stringify(parsed.metadata).trim()}\n---\n\n${parsed.body}\n`, 'utf8')
await generateContent({ includeDrafts: true })
console.log(`${slug} atualizado para ${status}.`)
