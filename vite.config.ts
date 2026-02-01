import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    port: parseInt(process.env.PORT || "5173"),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: [], // Add problematic deps here if needed
    force: false, // Set to true to force re-optimization
  },
  build: {
    sourcemap: false,
  },
});