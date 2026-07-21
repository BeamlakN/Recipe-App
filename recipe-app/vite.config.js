import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Explicitly set base to '/' to ensure paths are generated correctly for Vercel
  base: '/', 
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // Ensure this matches your actual filename in the public folder!
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'], 
      manifest: {
        name: 'RecipeChef - Digital Cookbook',
        short_name: 'RecipeChef',
        description: 'Search, save, and shop for your favorite food recipes.',
        theme_color: '#f97316',
        background_color: '#fffaf8',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://www.themealdb.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    })
  ],
  // Clean up console logs for production (as we discussed before)
  esbuild: {
    drop: ['console', 'debugger'],
  }
})