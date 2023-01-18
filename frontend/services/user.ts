import { useCallback } from "react";
import { useQuery } from "react-query";
import { useFetch } from "../hooks/useFetch";

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

type UseUserSettingUpdateFetch = (
  body: SettingsUpdateBodyRequest
) => Promise<ApiResponse<SettingsResponse>>;

export const useUserSettingUpdate = () => {
  const { put, mutate } = useFetch();

  const update: UseUserSettingUpdateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<SettingsResponse> = await put(
        "settings",
        body
      );
      await mutate(["settings"]);
      return response;
    },
    [put, mutate]
  );

  return {
    update,
  };
};
