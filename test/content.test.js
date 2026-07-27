import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import {
  buildCaderno,
  normalizeYouTubeId,
  parseCadernoSource,
  validateCaderno,
} from '../src/lib/articleSchema.js'
import { selectContentDocuments } from '../scripts/generate-content.js'

test('normaliza URLs suportadas do YouTube sem usar API', () => {
  assert.equal(normalizeYouTubeId('https://www.youtube.com/watch?v=M7lc1UVf-VE'), 'M7lc1UVf-VE')
  assert.equal(normalizeYouTubeId('https://youtu.be/M7lc1UVf-VE'), 'M7lc1UVf-VE')
  assert.equal(normalizeYouTubeId('https://www.youtube.com/embed/M7lc1UVf-VE'), 'M7lc1UVf-VE')
  assert.equal(normalizeYouTubeId('https://notyoutube.com/watch?v=M7lc1UVf-VE'), '')
  assert.equal(normalizeYouTubeId('https://youtube.com.example.com/watch?v=M7lc1UVf-VE'), '')
  assert.equal(normalizeYouTubeId('endereço inválido'), '')
})

test('mantém o conteúdo inicial como rascunho privado válido', async () => {
  const source = await readFile(new URL('../src/content/cadernos/primeiro-video.md', import.meta.url), 'utf8')
  const parsed = parseCadernoSource(source, 'primeiro-video.md')
  const errors = validateCaderno(parsed, 'primeiro-video.md')
  const item = buildCaderno(parsed)

  assert.deepEqual(errors, [])
  assert.equal(item.status, 'draft')
  assert.equal(item.code, 'VID/001')
  assert.equal(item.video.id, '')
  assert.ok(item.headings.length >= 3)
})

test('mantém o primeiro estudo dos Cadernos publicado e em destaque', async () => {
  const source = await readFile(new URL('../src/content/cadernos/da-necessidade-ao-teste.md', import.meta.url), 'utf8')
  const parsed = parseCadernoSource(source, 'da-necessidade-ao-teste.md')
  const errors = validateCaderno(parsed, 'da-necessidade-ao-teste.md')
  const item = buildCaderno(parsed)

  assert.deepEqual(errors, [])
  assert.equal(item.status, 'published')
  assert.equal(item.publishedAt, '2026-07-27')
  assert.equal(item.code, 'EST/001')
  assert.equal(item.featured, true)
  assert.equal(item.cover, 'interaction-map')
  assert.ok(item.headings.length >= 10)
})

test('impede a publicação de vídeo sem ID válido', () => {
  const document = {
    metadata: {
      title: 'Vídeo de validação editorial',
      slug: 'video-validacao',
      summary: 'Resumo suficientemente descritivo para validar a publicação editorial.',
      type: 'video',
      sequence: 2,
      topics: ['teste'],
      publishedAt: '2026-07-26',
      status: 'published',
      featured: false,
      video: { id: 'invalido' },
    },
    body: 'Este corpo possui palavras suficientes para representar um conteúdo editorial completo durante a validação automatizada da publicação antes do build.',
  }

  assert.ok(validateCaderno(document).some((error) => /ID ou URL válida/.test(error)))
})

test('exclui rascunhos e caminhos locais da geração de produção', () => {
  const documents = [
    { item: { slug: 'publicado', status: 'published', publishedAt: '2026-07-20', sourcePath: 'privado/publicado.md' } },
    { item: { slug: 'rascunho', status: 'draft', publishedAt: null, sourcePath: 'privado/rascunho.md' } },
  ]

  const production = selectContentDocuments(documents, { today: '2026-07-26' })
  const development = selectContentDocuments(documents, { includeDrafts: true, today: '2026-07-26' })

  assert.deepEqual(production.map(({ slug }) => slug), ['publicado'])
  assert.deepEqual(development.map(({ slug }) => slug), ['publicado', 'rascunho'])
  assert.ok(production.every((item) => !('sourcePath' in item)))
})

test('player usa incorporação privada e não ativa reprodução automática', async () => {
  const source = await readFile(new URL('../src/components/cadernos/VideoPlayer.jsx', import.meta.url), 'utf8')

  assert.match(source, /https:\/\/www\.youtube-nocookie\.com\/embed\//)
  assert.match(source, /referrerPolicy="strict-origin-when-cross-origin"/)
  assert.match(source, /loading="lazy"/)
  assert.doesNotMatch(source, /autoplay=1/)
})
