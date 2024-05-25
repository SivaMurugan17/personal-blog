import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig(() => {
  return {
    base: '/',
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      }
    },
    server:{
      open: true,
      port: 3000
    }
  };
});