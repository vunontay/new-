import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  htmlIncludePlugin,
  htmlTransformIndexHtml,
  renameHtmlPlugin,
} from "./tools/build";
const plugins_dev = [htmlTransformIndexHtml(), react()];
const plugins_product = [
  react(),
  htmlIncludePlugin(),
  htmlTransformIndexHtml(),
  renameHtmlPlugin(),
];

export default defineConfig(({ mode }) => {
  console.log(mode);
  return {
    root: ".",
    plugins: mode === "development" ? plugins_dev : plugins_product,
    build: {
      outDir: "./dist/default",
      emptyOutDir: true,
      input: "./index.html",
      rollupOptions: {
        output: {
          entryFileNames: "default.js",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith(".css")) {
              return `default.css`;
            }
          },
        },
      },
    },
    server: {
      port: 3000,
    },
    
  };
});
