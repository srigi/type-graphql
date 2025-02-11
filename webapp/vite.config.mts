import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
  },
  plugins: [preact(), tailwindcss()],
  root: 'src',
  server: {
    ...(process.env.WEBAPP_HOST && { allowedHosts: [process.env.WEBAPP_HOST] }),
    host: '127.0.0.1',
    port: process.env.WEB_PORT != null ? +process.env.WEB_PORT : 8000,
  },
});
