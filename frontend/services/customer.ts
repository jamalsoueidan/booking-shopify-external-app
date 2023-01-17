import { useFetch } from "@hooks";
import { CustomerQuery } from "@jamalsoueidan/bsb.bsb-pkg";

export const useCustomer = () => {
  const { get } = useFetch();

  return {
    find: async (value: string) => {
      const response: ApiResponse<Array<CustomerQuery>> = await get(
        `customers?name=${value}`
      );
      return response.payload;
    },
  };
};
