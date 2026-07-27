import { loadContentDocuments } from './content-utils.js'

const documents = await loadContentDocuments()
const errors = documents.flatMap((document) => document.errors)
const slugs = new Map()
const codes = new Map()

documents.forEach(({ item, file }) => {
  const relativeFile = file.replace(`${process.cwd()}\\`, '')
  if (slugs.has(item.slug)) errors.push(`${relativeFile}: slug duplicado com ${slugs.get(item.slug)}`)
  if (codes.has(item.code)) errors.push(`${relativeFile}: código duplicado com ${codes.get(item.code)}`)
  slugs.set(item.slug, relativeFile)
  codes.set(item.code, relativeFile)
})

const featured = documents.filter(({ item }) => item.status === 'published' && item.featured)
if (featured.length > 1) errors.push('apenas uma publicação pode usar featured: true')

if (errors.length) {
  console.error(`Conteúdo inválido:\n- ${errors.join('\n- ')}`)
  process.exitCode = 1
} else {
  console.log(`${documents.length} publicação(ões) validada(s) com sucesso.`)
}
