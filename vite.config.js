import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
export default defineConfig(({ isSsrBuild }) => ({
  root: resolve("src"),
  publicDir: resolve("public"),
  plugins: [react()],
  build: {
    outDir: resolve(isSsrBuild ? ".build-ssr" : "dist"),
    emptyOutDir: true,
    copyPublicDir: !isSsrBuild,
    target: "es2022",
    sourcemap: false,
    rolldownOptions: isSsrBuild
      ? { output: { entryFileNames: "entry-server.js" } }
      : {
          output: {
            codeSplitting: {
              groups: [
                {
                  name: "react",
                  test: /node_modules\/(react|react-dom|scheduler)\//,
                  priority: 30,
                },
                {
                  name: "motion",
                  test: /node_modules\/(motion|motion-dom|motion-utils|framer-motion)\//,
                  priority: 20,
                },
                {
                  name: "router",
                  test: /node_modules\/(react-router|react-router-dom)\//,
                  priority: 20,
                },
              ],
            },
          },
        },
  },
  server: { host: "127.0.0.1", port: 5188, strictPort: true },
  preview: { host: "127.0.0.1", port: 5188, strictPort: true },
}));
