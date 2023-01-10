import CustomerService from "@services/Customer.service";

interface GetQuery {
  shop: string;
  name: string;
}

export const get = ({ query }: { query: GetQuery }) => {
  const { shop, name } = query;
  return CustomerService.findCustomer({ shop, name });
};
