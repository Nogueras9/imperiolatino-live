import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/imperiolatino-live/',
  plugins: [react()],
  ssr: {
    external: [],
  },
})
