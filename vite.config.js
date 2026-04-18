import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';

function manualChunks(id) {
  if (!id.includes('node_modules')) return undefined;

  if (id.includes('react-router-dom') || id.includes('/react/') || id.includes('/react-dom/')) {
    return 'react';
  }

  if (
    id.includes('/i18next/') ||
    id.includes('/react-i18next/') ||
    id.includes('/i18next-browser-languagedetector/')
  ) {
    return 'i18n';
  }

  if (
    id.includes('/react-hook-form/') ||
    id.includes('/zod/') ||
    id.includes('/@hookform/resolvers/')
  ) {
    return 'form';
  }

  return undefined;
}

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
    ViteImageOptimizer({
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 80 },
      avif: { cqLevel: 33 },
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
              },
            },
          },
          'sortAttrs',
          {
            name: 'removeAttributesBySelector',
            params: {
              selector: "[fill='#000']",
              attributes: 'fill',
            },
          },
        ],
      },
    }),
    viteCompression({
      algorithm: 'brotliCompress',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.png',
        'apple-touch-icon.png',
        'icon-192.png',
        'icon-512.png',
      ],
      manifest: false,
    }),
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
});
