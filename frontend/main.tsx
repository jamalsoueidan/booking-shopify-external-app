import React from "react";
import ReactDOM from "react-dom/client";
import ApplicationRoot from "./Application";

import { QueryProvider } from "@providers/QueryProvider";
import "@shopify/polaris/build/esm/styles.css";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <QueryProvider>
      <ApplicationRoot />
    </QueryProvider>
  </React.StrictMode>
);
