import { useCallback } from "react";
import { useQuery } from "react-query";
import { useFetch } from "../hooks/useFetch";

export const useUserSetting = () => {
  const { get } = useFetch();
  const { data, isLoading } = useQuery<ApiResponse<SettingsResponse>>({
    enabled: !!localStorage.getItem("token"),
    queryFn: () => get(`settings`),
    queryKey: ["settings"],
  });

  return {
    data: data?.payload,
    isLoading,
  };
};

type UseUserSettingUpdateFetch = (body: SettingsUpdateBodyRequest) => Promise<ApiResponse<SettingsResponse>>;

export const useUserSettingUpdate = () => {
  const { put, mutate } = useFetch();

  const update: UseUserSettingUpdateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<SettingsResponse> = await put("settings", body);
      await mutate(["settings"]);
      return response;
    },
    [put, mutate],
  );

  return {
    update,
  };
};
