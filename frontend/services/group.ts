import { useFetch } from "@hooks/useFetch";
import { useQuery } from "react-query";

export const useGroup = () => {
  const { get } = useFetch();

  const { data, isLoading } = useQuery<ApiResponse<Array<Staff>>>({
    queryKey: ["group"],
    queryFn: () => get(`group`),
    suspense: true,
  });

  return {
    data: data?.payload,
    isLoading,
  };
};
