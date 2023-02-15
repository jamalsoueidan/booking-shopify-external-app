import "@jamalsoueidan/bsf.polyfills.json";
import { QueryProvider } from "@providers/QueryProvider";
import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import ApplicationRoot from "./Application";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <QueryProvider>
      <ApplicationRoot />
    </QueryProvider>
  </React.StrictMode>,
);
