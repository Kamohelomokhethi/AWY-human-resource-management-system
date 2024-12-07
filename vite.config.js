import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/AWY-human-resource-management-system/", 
  build: {
    outDir: 'dist', 
    assetsDir: 'assets', 
  },
  server: {
    port: 5173, 
    open: true,
  },
})
