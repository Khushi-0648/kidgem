import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/wp-json': {
        target: 'https://kidzgem.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
