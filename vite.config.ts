import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // La porta può essere imposta dall'ambiente (anteprima, CI); altrimenti resta la 5173.
  const env = loadEnv(mode, '.', '')
  return {
    plugins: [react()],
    server: { port: Number(env.PORT) || 5173 },
    build: { target: 'es2020', cssTarget: 'chrome100' },
  }
})
