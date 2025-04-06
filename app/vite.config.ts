import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": process.env.VITE_API_URL || "https://b06b-188-27-128-167.ngrok-free.app",
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
