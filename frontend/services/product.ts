import { useFetch } from "@hooks";
import { useQuery } from "react-query";

export const useProducts = () => {
  const { get } = useFetch();

  const { data } = useQuery<ApiResponse<Array<Product>>>({
    queryKey: ["products"],
    queryFn: () => get("products"),
  });

  return {
    data: data?.payload,
  };
};
