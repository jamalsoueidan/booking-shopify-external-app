import { CustomerServiceFind } from "@jamalsoueidan/booking-shopify-backend.mongo.pkg";

interface GetQuery {
  shop: string;
  name: string;
}

export const get = ({ query }: { query: GetQuery }) => {
  const { shop, name } = query;
  return CustomerServiceFind({ shop, name });
};
