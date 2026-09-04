import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readProjectFile = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('hero mantém metadados e contratos comerciais aprovados', async () => {
  const [html, home, packageJson] = await Promise.all([
    readProjectFile('index.html'),
    readProjectFile('src/pages/HomePage.jsx'),
    readProjectFile('package.json'),
  ])

  assert.match(html, /<title>Noumena Labs \| Sites e soluções para pequenos negócios<\/title>/)
  assert.match(html, /<link rel="icon" href="\/favicon\.svg" type="image\/svg\+xml" \/>/)
  assert.match(home, /className="hero-visual" aria-hidden="true"/)
  assert.match(home, /Conversar sobre meu projeto/)
  assert.match(home, /Entender como podemos ajudar/)
  assert.match(home, /SISTEMA <b>ATIVO<\/b>/)
  assert.doesNotMatch(packageJson, /three|framer-motion|gsap|lottie/i)
})

test('núcleo mantém a marca estável e anima somente o halo', async () => {
  const styles = await readProjectFile('src/styles.css')
  const heroMarkRule = styles.match(/\.hero-mark\s*\{([^}]*)\}/)?.[1] ?? ''

  assert.doesNotMatch(heroMarkRule, /animation:/)
  assert.match(styles, /\.core::before\s*\{[^}]*animation:\s*core-halo/s)
  assert.match(styles, /@keyframes core-halo/)
  assert.match(styles, /\.core\s*\{[^}]*radial-gradient/s)
})

test('órbitas usam movimentos lentos, independentes e sem animação JavaScript', async () => {
  const [styles, home] = await Promise.all([
    readProjectFile('src/styles.css'),
    readProjectFile('src/pages/HomePage.jsx'),
  ])
  const heroVisual = home.match(/function HeroVisual\(\)[\s\S]*?(?=function HomePage)/)?.[0] ?? ''

  assert.match(styles, /\.ring-one\s*\{[^}]*animation:\s*orbit-forward\s+30s/s)
  assert.match(styles, /\.ring-two\s*\{[^}]*animation:\s*orbit-reverse\s+38s/s)
  assert.match(styles, /\.signal-field::after\s*\{[^}]*animation:\s*signal-scan\s+46s/s)
  assert.match(styles, /\.satellite\s*\{[^}]*animation:\s*satellite-orbit/s)
  assert.match(styles, /\.code-dot\s*\{[^}]*animation:\s*status-pulse/s)
  assert.match(heroVisual, /className="hero-visual"/)
  assert.doesNotMatch(heroVisual, /requestAnimationFrame|<canvas|WebGL/i)
})
