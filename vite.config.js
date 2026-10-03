import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
export default defineConfig(({isSsrBuild}) => ({
  root: resolve('src'),
  publicDir: resolve('public'),
  plugins: [react()],
  build: {
    outDir: resolve(isSsrBuild ? '.build-ssr' : 'dist'),
    emptyOutDir: true,
    copyPublicDir: !isSsrBuild,
    target: 'es2022',
    sourcemap: false,
    rollupOptions: isSsrBuild ? {output:{entryFileNames:'entry-server.js'}} : undefined,
  },
  server: {host:'127.0.0.1',port:5188,strictPort:true},
  preview: {host:'127.0.0.1',port:5188,strictPort:true},
}));
