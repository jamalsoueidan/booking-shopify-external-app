import { AppControllerProps, CustomerServiceFind, ShopQuery } from "@jamalsoueidan/bsb.bsb-pkg";

interface GetQuery extends ShopQuery{
  name: string;
}

export const get = ({ query }: AppControllerProps<GetQuery>) => {
  const { shop, name } = query;
  return CustomerServiceFind({ shop, name });
};
