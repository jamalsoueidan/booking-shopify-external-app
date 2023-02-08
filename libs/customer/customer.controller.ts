import { AppControllerProps, CustomerServiceFind } from "@jamalsoueidan/bsb.bsb-pkg";

interface GetQuery {
  name: string;
}

export const get = ({ query }: AppControllerProps<GetQuery>) => {
  const { shop, name } = query;
  return CustomerServiceFind({ shop, name });
};
