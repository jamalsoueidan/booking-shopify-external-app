import { CustomerServiceFind } from "@jamalsoueidan/bsb.bsb-pkg";

interface GetQuery {
  shop: string;
  name: string;
}

export const get = ({ query }: { query: GetQuery }) => {
  const { shop, name } = query;
  return CustomerServiceFind({ shop, name });
};
