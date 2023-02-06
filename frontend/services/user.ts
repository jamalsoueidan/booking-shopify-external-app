import { ApiResponse, UserSettingsResponse, UserSettingsUpdateBodyRequest } from "@jamalsoueidan/bsb.types";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { useFetch } from "../hooks/useFetch";

export const useUserSetting = () => {
  const { get } = useFetch();
  const { data, isLoading } = useQuery<ApiResponse<UserSettingsResponse>>({
    enabled: !!localStorage.getItem("token"),
    queryFn: () => get(`settings`),
    queryKey: ["settings"],
  });

  return {
    data: data?.payload,
    isLoading,
  };
};

type UseUserSettingUpdateFetch = (body: UserSettingsUpdateBodyRequest) => Promise<ApiResponse<UserSettingsResponse>>;

export const useUserSettingUpdate = () => {
  const { put, mutate } = useFetch();

  const update: UseUserSettingUpdateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<UserSettingsResponse> = await put("settings", body);
      await mutate(["settings"]);
      return response;
    },
    [put, mutate],
  );

  return {
    update,
  };
};
