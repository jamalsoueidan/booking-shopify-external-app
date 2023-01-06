import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

const proxyOptions = {
  target: `http://127.0.0.1:8000`,
  changeOrigin: false,
  secure: true,
  ws: false,
};

export default defineConfig({
  root: path.join(__dirname, "."),
  build: {
    sourcemap: true,
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
