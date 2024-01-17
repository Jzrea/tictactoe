import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const HOST = "http://127.0.0.1:3000";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: HOST,
        // target: ``,
        // changeOrigin: true,
      },
    },
  },
});
