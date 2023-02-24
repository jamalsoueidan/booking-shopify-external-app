import { useFetch } from "@hooks/use-fetch";
import "@jamalsoueidan/bsf.polyfills.json";
import { FetchProvider } from "@jamalsoueidan/pkg.bsf";
import { QueryProvider } from "@providers/QueryProvider";
import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Application } from "./application";

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
