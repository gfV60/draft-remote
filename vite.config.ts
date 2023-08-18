import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: "https://int-rls-gateway.controlpanel.pro",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    open: "/",
    port:3000
  },
  plugins: [
    react(),
    federation({
      remoteType: "var",
      name: "rls-manual-ui",
      exposes: {
        './App': './src/App.tsx'
      },
      filename: "rls-manual-ui.js",
      shared: ['react', 'react-dom', '@domains/mf-events'],
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts'
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    outDir: "./build"
  },
})
