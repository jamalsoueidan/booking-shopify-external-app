import React from "react";
import ReactDOM from "react-dom/client";
import ApplicationRoot from "./ApplicationRoot";

import "@shopify/polaris/build/esm/styles.css";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <ApplicationRoot />
  </React.StrictMode>
);
