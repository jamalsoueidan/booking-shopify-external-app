import { useQuery } from "react-query";
import { useFetch } from "../hooks/useFetch";

export const useStaff = () => {
  const { get } = useFetch();
  const { data, isLoading } = useQuery<ApiResponse<Staff>>({
    queryKey: ["user"],
    queryFn: () => get(`current-staff`),
    enabled: !!localStorage.getItem("token"),
  });

  return {
    data: data?.payload,
    isLoading,
  };
};

export const useUserSetting = () => {
  const { get } = useFetch();
  const { data, isLoading } = useQuery<ApiResponse<SettingsResponse>>({
    queryKey: ["settings"],
    queryFn: () => get(`settings`),
    enabled: !!localStorage.getItem("token"),
  });

  return {
    data: data?.payload,
    isLoading,
  };
};
