/* eslint-disable no-undef */
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { checker } from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

const proxyOptions = {
  changeOrigin: false,
  secure: true,
  target: `http://127.0.0.1:8000`,
  ws: false,
};

let build = {};
if (process.env.npm_lifecycle_event === "build") {
  build = {
    rollupOptions: {
      output: {
        manualChunks: {
          axios: ["axios"],
          date: ["date-fns-tz", "date-fns"],
          react: ["react", "react-router-dom", "react-dom", "react-query"],
          shopify: ["@shopify/polaris"],
        },
      },
      plugins: [dynamicImportVars({})],
    },
  };
}

export default defineConfig({
  build: {
    sourcemap: false,
    ...build,
  },
  define: {
    ENV: process.env.ENV,
  },
  plugins: [react(), checker({ typescript: true }), splitVendorChunkPlugin(), visualizer(), tsconfigPaths()],
  root: path.join(__dirname, "."),
  server: {
    host: "localhost",
    port: 3000,
    proxy: {
      "^/(\\?.*)?$": proxyOptions,
      "^/api(/|(\\?.*)?$)": proxyOptions,
    },
  },
});
