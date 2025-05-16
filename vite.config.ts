import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    server: {
      host: '0.0.0.0'
    },
    root: "./src",
    base: "",
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
