import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildCaderno, parseCadernoSource, validateCaderno } from '../src/lib/articleSchema.js'

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const contentDirectory = path.join(projectRoot, 'src', 'content', 'cadernos')

export async function loadContentDocuments(directory = contentDirectory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => path.join(directory, entry.name))

  return Promise.all(
    files.map(async (file) => {
      const source = await readFile(file, 'utf8')
      const relativeFile = path.relative(projectRoot, file)
      const parsed = parseCadernoSource(source, relativeFile)
      const errors = validateCaderno(parsed, relativeFile)

      return {
        file,
        parsed,
        errors,
        item: errors.length === 0 ? buildCaderno(parsed, relativeFile) : null,
      }
    }),
  )
}

export function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
