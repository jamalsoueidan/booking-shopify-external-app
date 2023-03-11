import "@jamalsoueidan/bsf.polyfills.json";
import { FetchProvider } from "@jamalsoueidan/pkg.frontend";
import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Application from "./application";
import { useFetch } from "./hooks/use-fetch";
import { QueryProvider } from "./providers/QueryProvider";

export const FetchProviderWrapper = () => {
  const fetch = useFetch();
  return (
    <FetchProvider fetch={fetch}>
      <Application />
    </FetchProvider>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <QueryProvider>
      <FetchProviderWrapper />
    </QueryProvider>
  </React.StrictMode>,
);
