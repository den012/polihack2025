import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://fad0-5-2-197-133.ngrok-free.app"
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
