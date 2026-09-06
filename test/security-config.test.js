import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { parse } from 'yaml'

const requiredHeaders = [
  'Content-Security-Policy',
  'Strict-Transport-Security',
  'X-Content-Type-Options',
  'X-Frame-Options',
  'Referrer-Policy',
  'Permissions-Policy',
  'Cross-Origin-Opener-Policy',
]

test('configuração da Vercel aplica os headers essenciais', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'))
  const headers = new Map(config.headers[0].headers.map(({ key, value }) => [key, value]))

  requiredHeaders.forEach((header) => assert.ok(headers.has(header), `${header} ausente`))
  assert.equal(headers.get('X-Frame-Options'), 'DENY')
  assert.equal(headers.get('X-Content-Type-Options'), 'nosniff')
})

test('CSP bloqueia execução e incorporação não autorizadas', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'))
  const csp = config.headers[0].headers.find(({ key }) => key === 'Content-Security-Policy').value

  assert.match(csp, /default-src 'self'/)
  assert.match(csp, /frame-ancestors 'none'/)
  assert.match(csp, /frame-src https:\/\/www\.youtube-nocookie\.com/)
  assert.match(csp, /object-src 'none'/)
  assert.match(csp, /form-action 'none'/)
  assert.doesNotMatch(csp, /unsafe-inline|unsafe-eval/)
  assert.doesNotMatch(csp, /fonts\.googleapis|fonts\.gstatic/)
  assert.doesNotMatch(csp, /frame-src \*/)
})

test('GitHub Pages recebe no HTML as políticas compatíveis com metadados', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  const csp = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)" \/>/)?.[1]

  assert.ok(csp, 'CSP por metadado ausente')
  assert.match(csp, /default-src 'self'/)
  assert.match(csp, /frame-src https:\/\/www\.youtube-nocookie\.com/)
  assert.match(csp, /object-src 'none'/)
  assert.doesNotMatch(csp, /frame-ancestors/)
  assert.match(html, /<meta name="referrer" content="strict-origin-when-cross-origin" \/>/)
})

test('arquivo de headers estáticos permanece sincronizado', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'))
  const staticHeaders = await readFile(new URL('../public/_headers', import.meta.url), 'utf8')

  config.headers[0].headers.forEach(({ key, value }) => {
    assert.ok(staticHeaders.includes(`${key}: ${value}`), `${key} divergente em public/_headers`)
  })
})

test('workflows usam Actions imutáveis e menor privilégio no deploy', async () => {
  const workflowFiles = [
    new URL('../.github/workflows/deploy-pages.yml', import.meta.url),
    new URL('../.github/workflows/security.yml', import.meta.url),
  ]
  const workflows = await Promise.all(workflowFiles.map(async (file) => parse(await readFile(file, 'utf8'))))
  const actionReferences = workflows.flatMap((workflow) =>
    Object.values(workflow.jobs)
      .flatMap((job) => job.steps)
      .map((step) => step.uses)
      .filter((uses) => uses?.startsWith('actions/')),
  )

  actionReferences.forEach((uses) => {
    const reference = uses.split('@')[1]
    assert.match(reference, /^[0-9a-f]{40}$/, `${uses} não está fixada por SHA completo`)
  })

  const deployWorkflow = workflows[0]
  assert.deepEqual(deployWorkflow.permissions, { contents: 'read' })
  assert.deepEqual(deployWorkflow.jobs.deploy.permissions, {
    pages: 'write',
    'id-token': 'write',
  })
})

test('workflow do GitHub Pages gera o site na raiz do domínio próprio', async () => {
  const workflow = parse(await readFile(new URL('../.github/workflows/deploy-pages.yml', import.meta.url), 'utf8'))
  const buildStep = workflow.jobs.build.steps.find(({ name }) => name === 'Build for GitHub Pages')

  assert.ok(buildStep)
  assert.ok(!buildStep.env?.VITE_BASE_PATH || buildStep.env.VITE_BASE_PATH === '/')
})

test('hash CSP corresponde ao JSON-LD inline', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  const script = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'))
  const csp = config.headers[0].headers.find(({ key }) => key === 'Content-Security-Policy').value
  const hash = createHash('sha256').update(script).digest('base64')

  assert.ok(csp.includes(`'sha256-${hash}'`))
})

test('fontes são servidas pela própria origem', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  const styles = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8')

  assert.doesNotMatch(html, /fonts\.googleapis|fonts\.gstatic/)
  assert.match(styles, /url\('\/fonts\/dm-sans-latin\.woff2'\)/)
  assert.match(styles, /url\('\/fonts\/space-grotesk-latin\.woff2'\)/)
})

test('SEO usa a URL pública atual e expõe arquivos de descoberta', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  const robots = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8')
  const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
  const publicUrl = 'https://noumenalabs.com.br/'

  assert.match(html, new RegExp(`<link rel="canonical" href="${publicUrl}"`))
  assert.match(html, new RegExp(`<meta property="og:url" content="${publicUrl}"`))
  assert.match(robots, /Sitemap: .*\/sitemap\.xml/)
  assert.match(sitemap, new RegExp(`<loc>${publicUrl}</loc>`))
})

test('links em nova aba não compartilham o contexto da página', async () => {
  const files = await Promise.all([
    readFile(new URL('../src/pages/HomePage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/CadernoPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/cadernos/VideoPlayer.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Header.jsx', import.meta.url), 'utf8'),
  ])
  const links = [...files.join('\n').matchAll(/<a\s[^>]*target="_blank"[^>]*>/g)].map(([link]) => link)

  assert.ok(links.length > 0)
  assert.ok(links.every((link) => /rel="noreferrer"/.test(link)))
})

test('rodapé mantém a marca e os contatos sem a apresentação do fundador', async () => {
  const app = await readFile(new URL('../src/pages/HomePage.jsx', import.meta.url), 'utf8')

  assert.match(app, /<footer id="sobre">/)
  assert.match(app, /className="container brand-contact"/)
  assert.match(app, /<BrandMark className="brand-contact-mark" \/>/)
  assert.match(app, />\s*LinkedIn <Icon name="linkedin"/)
  assert.match(app, />\s*WhatsApp <Icon name="whatsapp"/)
  assert.doesNotMatch(app, /Prazer, eu sou o Leonardo\.|Leonardo Henrique Calegare/)
  assert.doesNotMatch(app, /noumena_manifesto\.txt|className="about section-pad"/)
})

test('navegação mobile ocupa a tela e mantém acesso por teclado', async () => {
  const app = await readFile(new URL('../src/pages/HomePage.jsx', import.meta.url), 'utf8')
  const header = await readFile(new URL('../src/components/Header.jsx', import.meta.url), 'utf8')
  const styles = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8')

  assert.match(app, /className="skip-link" href="#conteudo-principal"/)
  assert.match(app, /<main\b[^>]*id="conteudo-principal" tabIndex="-1">/)
  assert.match(header, /open \? ' menu-active' : ''/)
  assert.match(styles, /\.site-header\.menu-active[^}]*backdrop-filter: none/)
  assert.match(styles, /\.nav \{[^}]*min-height: 100dvh/)
})

test('arquivos de ambiente e chaves privadas não entram no Git', async () => {
  const gitignore = await readFile(new URL('../.gitignore', import.meta.url), 'utf8')

  assert.match(gitignore, /^\.env\*$/m)
  assert.match(gitignore, /^\.vercel$/m)
  assert.match(gitignore, /^\*\.pem$/m)
  assert.match(gitignore, /^\*\.key$/m)
  assert.match(gitignore, /^AGENTS\.md$/m)
  assert.match(gitignore, /^\/docs\/superpowers\/$/m)
  assert.match(gitignore, /^\/output\/$/m)
  assert.match(gitignore, /^\/tmp\/$/m)
})
