import { AppControllerProps, CustomerServiceSearch, CustomerServiceSearchProps } from "@jamalsoueidan/pkg.bsb";

export const get = ({ query }: AppControllerProps<CustomerServiceSearchProps>) => {
  const { shop, name } = query;
  return CustomerServiceSearch({ shop, name });
};
