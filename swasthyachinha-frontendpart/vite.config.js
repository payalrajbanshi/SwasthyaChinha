import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss()],
  server: {
    host: true, // allow network access
    port: 5173, // your dev server port
    allowedHosts: ['.trycloudflare.com'] // allow Cloudflare Tunnel
  },
})
