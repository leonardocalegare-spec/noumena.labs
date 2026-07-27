import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadContentDocuments, projectRoot } from './content-utils.js'

export function selectContentDocuments(documents, { includeDrafts = false, today = new Date().toISOString().slice(0, 10) } = {}) {
  return documents
    .filter(({ item }) => {
      if (item.status === 'archived') return false
      if (includeDrafts) return true
      return item.status === 'published' && item.publishedAt <= today
    })
    .map(({ item }) => {
      const safeItem = { ...item }
      delete safeItem.sourcePath
      return safeItem
    })
}

export async function generateContent({ includeDrafts = false } = {}) {
  const documents = await loadContentDocuments()
  const errors = documents.flatMap((document) => document.errors)
  if (errors.length) throw new Error(errors.join('\n'))

  const selected = selectContentDocuments(documents, { includeDrafts })
  const generatedDirectory = path.join(projectRoot, 'src', 'generated')
  const generatedFile = path.join(generatedDirectory, 'cadernos.js')
  const source = `// Arquivo gerado. Use os comandos content:* em vez de editar manualmente.\nexport const generatedCadernos = Object.freeze(${JSON.stringify(selected, null, 2)})\n`

  await mkdir(generatedDirectory, { recursive: true })
  await writeFile(generatedFile, source, 'utf8')
  console.log(`${selected.length} publicação(ões) preparada(s) para ${includeDrafts ? 'desenvolvimento' : 'produção'}.`)
}

const isDirectExecution = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
if (isDirectExecution) {
  generateContent({ includeDrafts: process.argv.includes('--include-drafts') }).catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
