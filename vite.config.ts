import { defineConfig, Plugin, HtmlTagDescriptor } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import dts from "vite-plugin-dts";

export function devErrorAndNavigationPlugin(): Plugin {
  let stacktraceJsContent: string | null = null;
  let dyadShimContent: string | null = null;

  return {
    name: "dev-error-and-navigation-handler",
    apply: "serve",

    configResolved() {
      const stackTraceLibPath = path.join(
        "node_modules",
        "stacktrace-js",
        "dist",
        "stacktrace.min.js",
      );
      if (stackTraceLibPath) {
        try {
          stacktraceJsContent = fs.readFileSync(stackTraceLibPath, "utf-8");
        } catch (error) {
          console.error(
            `[dyad-shim] Failed to read stacktrace.js from ${stackTraceLibPath}:`,
            error,
          );
          stacktraceJsContent = null;
        }
      } else {
        console.error(`[dyad-shim] stacktrace.js not found.`);
      }

      const dyadShimPath = path.join("dyad-shim.js");
      if (dyadShimPath) {
        try {
          dyadShimContent = fs.readFileSync(dyadShimPath, "utf-8");
        } catch (error) {
          console.error(
            `[dyad-shim] Failed to read dyad-shim from ${dyadShimPath}:`,
            error,
          );
          dyadShimContent = null;
        }
      } else {
        console.error(`[dyad-shim] dyad-shim.js not found.`);
      }
    },

    transformIndexHtml(html) {
      const tags: HtmlTagDescriptor[] = [];

      if (stacktraceJsContent) {
        tags.push({
          tag: "script",
          injectTo: "head-prepend",
          children: stacktraceJsContent,
        });
      } else {
        tags.push({
          tag: "script",
          injectTo: "head-prepend",
          children:
            "console.warn('[dyad-shim] stacktrace.js library was not injected.');",
        });
      }

      if (dyadShimContent) {
        tags.push({
          tag: "script",
          injectTo: "head-prepend",
          children: dyadShimContent,
        });
      } else {
        tags.push({
          tag: "script",
          injectTo: "head-prepend",
          children: "console.warn('[dyad-shim] dyad shim was not injected.');",
        });
      }

      return { html, tags };
    },
  };
}

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    devErrorAndNavigationPlugin(),
    dts({
      insertTypesEntry: true,
      // Optional: Explicitly specify the entry point for DTS generation if issues persist.
      // entryRoot: path.resolve(__dirname, "src"), 
      // Optional: Specify output directory for .d.ts files if it needs to differ or be more explicit.
      // outputDir: path.resolve(__dirname, "dist/types"), 
      // Optional: if you want to copy other .d.ts files (e.g. if you had manually created some)
      // copyDtsFiles: true 
    }),
  ],
  build: {
    // lib: { // Temporarily commented out to build the app
    //   entry: path.resolve(__dirname, "src/index.ts"),
    //   name: "ReactVoiceInput", // PascalCase of package name
    //   formats: ["es", "cjs", "umd"],
    //   fileName: (format) => `react-voice-input.${format}.js`,
    // },
    // rollupOptions: { // Temporarily commented out
    //   external: ['react', 'react-dom', 'lucide-react', 'sonner', '@radix-ui/react-slot'],
    //   output: {
    //     globals: {
    //       react: "React",
    //       'react-dom': "ReactDOM",
    //       'lucide-react': "LucideReact",
    //       'sonner': "Sonner",
    //       '@radix-ui/react-slot': 'RadixReactSlot'
    //     },
    //   },
    // },
    sourcemap: true, 
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react-voice-input": path.resolve(__dirname, "./src/index.ts"), // Keep this for app to find the library source
    },
  },
}));