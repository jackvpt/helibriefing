// vite.config.js
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 5180,
    strictPort: true, // échoue si le port est pris, au lieu d'en prendre un autre en silence
  },
})
