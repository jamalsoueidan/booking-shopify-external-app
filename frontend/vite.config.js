import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";

const proxyOptions = {
  target: `http://127.0.0.1:8000`,
  changeOrigin: false,
  secure: true,
  ws: false,
};

let build = {};
console.log(process.env.npm_lifecycle_event);
if (process.env.npm_lifecycle_event === "build") {
  build = {
    rollupOptions: {
      plugins: [dynamicImportVars({})],
      output: {
        manualChunks: {
          react: ["react", "react-router-dom", "react-dom", "react-query"],
          shopify: ["@shopify/polaris"],
          date: ["date-fns-tz", "date-fns"],
          axios: ["axios"],
        },
      },
    },
  };
}

export default defineConfig({
  root: path.join(__dirname, "."),
  build: {
    sourcemap: false,
    ...build,
  },
  plugins: [
    react(),
    checker({ typescript: true }),
    splitVendorChunkPlugin(),
    visualizer(),
    tsconfigPaths(),
  ],
  server: {
    host: "localhost",
    port: 3000,
    proxy: {
      "^/(\\?.*)?$": proxyOptions,
      "^/api(/|(\\?.*)?$)": proxyOptions,
    },
  },
});
