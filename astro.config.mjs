// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://bogota.ninja',
  
  // Server: SSR por defecto (puedes hacer páginas estáticas con export const prerender = true)
  output: 'server',
  adapter: vercel(),
  
  integrations: [
    react(),
    sitemap({
      // Excluir páginas privadas / utilitarias
      filter: (page) => ![
        'https://bogota.ninja/dashboard/',
        'https://bogota.ninja/login/',
        'https://bogota.ninja/sesion/',
        'https://bogota.ninja/hola/',
        'https://bogota.ninja/unsubscribe/',
      ].includes(page),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true,
        interval: 100
      }
    }
  }
});