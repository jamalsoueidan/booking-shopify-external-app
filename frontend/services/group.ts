import { ApiResponse, Staff } from "@jamalsoueidan/pkg.bsb-types";
import { useFetch } from "@jamalsoueidan/pkg.bsf";
import { useQuery } from "react-query";

export const useGroup = () => {
  const { get } = useFetch();

  const { data, isLoading } = useQuery<ApiResponse<Array<Staff>>>({
    queryFn: () => get({ url: `group` }),
    queryKey: ["group"],
    suspense: true,
  });

  return {
    data: data?.payload,
    isLoading,
  };
};
