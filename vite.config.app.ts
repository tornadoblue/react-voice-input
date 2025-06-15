import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { devErrorAndNavigationPlugin } from "./vite.config"; // Import the existing plugin

export default defineConfig({
  plugins: [
    react(),
    // Include the devErrorAndNavigationPlugin if you want its features (like shim injection)
    // for the app build as well. This is usually for development, so you might
    // choose to omit it for a production app build if it's not needed.
    // For consistency with the dev environment, let's include it.
    devErrorAndNavigationPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // This alias ensures that when the app imports 'react-voice-input',
      // it resolves to the local source code, which is usually what you want
      // for a test/example app within the same monorepo/project.
      "react-voice-input": path.resolve(__dirname, "./src/index.ts"),
    },
  },
  build: {
    // No 'lib' section here, so Vite builds it as a standard application
    // using index.html as the entry point.
    sourcemap: true, // Optional: generate sourcemaps for the application build
    outDir: "dist_app", // Optional: specify a different output directory for the app
                        // to avoid conflicts with the library's 'dist' folder.
                        // If not specified, it defaults to 'dist'.
  },
  // Ensure the server block is not carried over if it's not needed for app-specific config
  // server: { ... } // This is usually for dev, not for build config unless specific needs
});