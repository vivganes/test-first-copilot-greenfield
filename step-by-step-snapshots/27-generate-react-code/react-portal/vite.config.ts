import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This defines the port React itself runs on
    port: 5173,
    strictPort: true,
    proxy: {
      // Directs any request starting with "/api" to your .NET backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
