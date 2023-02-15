import { useFetch } from "@hooks/use-fetch";
import { ApiResponse, Staff } from "@jamalsoueidan/bsb.types";
import { useQuery } from "react-query";

export const useGroup = () => {
  const { get } = useFetch();

  const { data, isLoading } = useQuery<ApiResponse<Array<Staff>>>({
    queryFn: () => get(`group`),
    queryKey: ["group"],
    suspense: true,
  });

  return {
    data: data?.payload,
    isLoading,
  };
};
