import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: 'tests/build',
    lib: {
      entry: 'tests/ui-entry.jsx',
      name: 'LevelUpTestBundle',
      formats: ['iife'],
      fileName: () => 'ui.js'
    }
  }
})
