import { useFetch } from "@hooks/use-fetch";
import { ApiResponse, Product } from "@jamalsoueidan/pkg.bsb-types";
import { useQuery } from "react-query";

export const useProducts = () => {
  const { get } = useFetch();

  const { data } = useQuery<ApiResponse<Array<Product>>>({
    queryFn: () => get("products"),
    queryKey: ["products"],
  });

  return {
    data: data?.payload,
  };
};
