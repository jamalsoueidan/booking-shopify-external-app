import { Product, ProductServiceUpdateBodyStaffProperty } from "@jamalsoueidan/pkg.backend-types";
import { DynamicList } from "@shopify/react-form/build/ts/hooks/list/dynamiclist";
import { createContext } from "react";

export type FormContext = {
  product: Product<ProductServiceUpdateBodyStaffProperty>;
  field: DynamicList<ProductServiceUpdateBodyStaffProperty>;
};

export default createContext<FormContext>({} as any);
