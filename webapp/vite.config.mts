import path from 'node:path';
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
    'process.env.WEBAPP_CLOUDINARY_CLOUD_NAME': JSON.stringify(process.env.WEBAPP_CLOUDINARY_CLOUD_NAME),
  },
  plugins: [preact(), tailwindcss()],
  root: 'src',
  resolve: {
    alias: {
      '~gql': path.resolve(__dirname, 'src/.gql'),
      '~': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    ...(process.env.WEBAPP_ALLOWED_HOSTS && { allowedHosts: process.env.WEBAPP_ALLOWED_HOSTS.split(',') }),
    host: process.env.WEBAPP_HOST || '127.0.0.1',
    port: Number(process.env.WEBAPP_PORT || 3000),
  },
});
