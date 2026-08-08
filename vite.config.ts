import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), imagetools()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    // Long-lived immutable filenames so .htaccess can cache assets for a year
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    host: "0.0.0.0",
  },
  preview: {
    port: Number(process.env.PORT) || 4173,
    host: "0.0.0.0",
  },
});
