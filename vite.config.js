import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/peroli/" : "/", // Adaptación del publicPath
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist", // Directorio de salida del build
    sourcemap: false, // Si necesitas habilitar mapas de origen para depuración, cámbialo a true
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  server: {
    host: true, // Permitir que el servidor dev escuche en la red local
    port: 3000, // Cambia el puerto si lo deseas
  },
});
