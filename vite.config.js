import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", 
<<<<<<< HEAD
  build: {
    outDir: 'dist', 
    assetsDir: 'assets', 
  },
  server: {
    port: 5173, 
    open: true,
  },
=======
 
>>>>>>> fcb0f06b7c2e45c98c6c101f9beb621951fe916d
})
