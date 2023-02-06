import { useFetch } from "@hooks";
import { ApiResponse, Product } from "@jamalsoueidan/bsb.types";
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
