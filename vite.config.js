import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false, // Disable minification
  },
  rollupOptions: {
    treeshake: false,  // Disable tree-shaking
  },
  base: '/'
  // server: {
  //   historyApiFallback: true, // ✅ ensures SPA routing fallback
  // },
})