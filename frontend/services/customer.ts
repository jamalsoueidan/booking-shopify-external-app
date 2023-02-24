import { ApiResponse, CustomerQuery } from "@jamalsoueidan/pkg.bsb-types";
import { useFetch } from "@jamalsoueidan/pkg.bsf";

export const useCustomer = () => {
  const { get } = useFetch();

  return {
    find: async (name: string) => {
      const response: ApiResponse<Array<CustomerQuery>> = await get({ url: `customers`, params: { name } });
      return response.payload;
    },
  };
};
