import { access, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { stringify } from 'yaml'
import { contentTypes, normalizeYouTubeId } from '../src/lib/articleSchema.js'
import { contentDirectory, loadContentDocuments, slugify } from './content-utils.js'
import { generateContent } from './generate-content.js'

const prompt = createInterface({ input, output })
const typeAliases = { video: 'video', vídeo: 'video', estudo: 'study', study: 'study', aprendizado: 'learning', learning: 'learning' }

try {
  const typeAnswer = (await prompt.question('Tipo (vídeo, estudo ou aprendizado): ')).trim().toLowerCase()
  const type = typeAliases[typeAnswer]
  if (!type) throw new Error('Tipo inválido.')

  const title = (await prompt.question('Título: ')).trim()
  const summary = (await prompt.question('Resumo: ')).trim()
  const topics = (await prompt.question('Temas separados por vírgula: '))
    .split(',')
    .map((topic) => topic.trim())
    .filter(Boolean)
  const slugAnswer = (await prompt.question(`Slug (${slugify(title)}): `)).trim()
  const slug = slugify(slugAnswer || title)
  if (title.length < 8) throw new Error('O título precisa ter pelo menos 8 caracteres.')
  if (summary.length < 30) throw new Error('O resumo precisa ter pelo menos 30 caracteres.')
  if (!topics.length) throw new Error('Informe ao menos um tema.')
  if (!slug) throw new Error('Não foi possível gerar um slug válido.')
  const documents = await loadContentDocuments()
  const nextSequence = Math.max(
    0,
    ...documents.filter(({ item }) => item.type === type).map(({ item }) => item.sequence),
  ) + 1

  const metadata = {
    title,
    slug,
    summary,
    type,
    sequence: nextSequence,
    topics,
    publishedAt: null,
    updatedAt: null,
    status: 'draft',
    featured: false,
  }

  if (type === 'video') {
    const videoUrl = (await prompt.question('URL do YouTube (pode deixar vazia no rascunho): ')).trim()
    const videoId = normalizeYouTubeId(videoUrl)
    if (videoUrl && !videoId) throw new Error('URL do YouTube inválida.')
    metadata.video = { id: videoId, duration: '' }
  }

  const file = path.join(contentDirectory, `${slug}.md`)
  await access(file).then(
    () => { throw new Error(`Já existe uma publicação em ${file}`) },
    () => undefined,
  )

  const template = `---\n${stringify(metadata).trim()}\n---\n\n## Ponto de partida\n\nExplique o contexto e a pergunta que orientou este conteúdo.\n\n## Desenvolvimento\n\nRegistre o processo, os exemplos e as decisões mais importantes.\n\n## Aprendizados\n\nApresente o que mudou depois do estudo, vídeo ou experiência.\n\n## Referências\n\nListe as fontes consultadas antes de publicar.\n`
  await writeFile(file, template, 'utf8')
  await generateContent({ includeDrafts: true })
  console.log(`Rascunho criado: ${path.relative(process.cwd(), file)}`)
  console.log(`Código reservado: ${contentTypes[type].prefix}/${String(nextSequence).padStart(3, '0')}`)
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
} finally {
  prompt.close()
}
