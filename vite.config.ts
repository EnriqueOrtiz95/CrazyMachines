import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: './index.html', // default
      },
    },
    chunkSizeWarningLimit: 1600,
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    }
  }
})
