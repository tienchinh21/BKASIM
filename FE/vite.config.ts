import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
    root: "./src",
    base: "",
    plugins: [
      react(),
      {
        name: "override-config",
        config: () => ({
          build: {
            target: "esnext"
          }
        })
      }

    ],
    esbuild: {
      target: 'esnext',
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
