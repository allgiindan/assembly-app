import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const configPath = path.resolve(process.cwd(), 'public/config.js')
  const configContents = `window.APP_CONFIG = ${JSON.stringify({
    SUPABASE_URL: env.VITE_SUPABASE_URL || '',
    SUPABASE_ANON_KEY: env.VITE_SUPABASE_ANON_KEY || '',
  }, null, 2)};\n`

  fs.writeFileSync(configPath, configContents, 'utf8')

  return {
    plugins: [react()],
    base: '/',
  }
})