/* eslint-disable @typescript-eslint/triple-slash-reference */

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}

declare global {
  interface process {
    //types of envs
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
  }
}
