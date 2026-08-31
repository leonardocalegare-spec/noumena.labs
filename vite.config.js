import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const developmentCspCompatibility = {
  name: 'development-csp-compatibility',
  apply: 'serve',
  transformIndexHtml(html) {
    return html.replace(/\s*<meta http-equiv="Content-Security-Policy"[^>]*>\s*/, '\n    ')
  },
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [developmentCspCompatibility, react()],
  }
})
