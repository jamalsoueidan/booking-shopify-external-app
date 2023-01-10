/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/index.d.ts" />
/// <reference path="../@types/staff.d.ts" />
/// <reference path="../@types/user.d.ts" />
/// <reference path="../@types/booking.d.ts" />
/// <reference path="../@types/customer.d.ts" />
/// <reference path="../@types/product.d.ts" />
/// <reference path="../@types/schedule.d.ts" />
/// <reference path="../@types/widget.d.ts" />

declare module "*";
declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}
