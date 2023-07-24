import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false
      },
      '/images': {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false
      },
    },
  },
})

