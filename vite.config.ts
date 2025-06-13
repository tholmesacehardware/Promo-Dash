import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // Ensure this import is correct
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), // Ensure react() is correctly called here
    // The componentTagger plugin should only be included if you are actively using it
    // If you are not using lovable-tagger, you can remove this line:
    // mode === 'development' && componentTagger(),
  ].filter(Boolean), // .filter(Boolean) correctly handles conditional plugins
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
