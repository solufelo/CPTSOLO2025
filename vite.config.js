import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
    }),
    tailwindcss(),
  ],
  build: {
    sourcemap: false, // Disable source maps in production
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit (default is 500)
    rollupOptions: {
      external: [
        // Exclude Node.js-only packages from browser bundle
        'googleapis',
        'google-auth-library',
        'gcp-metadata',
        'google-logging-utils',
      ],
      output: {
        // Let Vite handle chunk splitting automatically for React 19 compatibility
        // Manual chunking can cause React/React-DOM loading order issues
        // Vite's automatic splitting is optimized for React 19
      },
    },
  },
  resolve: {
    // Prevent importing Node.js packages in browser
    alias: {
      '@': path.resolve(__dirname, './src'),
      'googleapis': false,
      'google-auth-library': false,
    },
  },
  define: {
    // Define process.env for browser compatibility
    'process.env': {},
    'process': { env: {} },
  },
  server: {
    host: true, // Expose to all network interfaces
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
})
