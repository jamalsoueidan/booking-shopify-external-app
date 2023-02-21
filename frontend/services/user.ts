import { ApiResponse, StaffSettingsResponse, StaffSettingsUpdateBodyRequest } from "@jamalsoueidan/pkg.bsb-types";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { useFetch } from "../hooks/use-fetch";

export const useUserSetting = () => {
  const { get } = useFetch();
  const { data, isLoading } = useQuery<ApiResponse<StaffSettingsResponse>>({
    enabled: !!localStorage.getItem("token"),
    queryFn: () => get(`settings`),
    queryKey: ["settings"],
  });

  return {
    data: data?.payload,
    isLoading,
  };
};

type UseUserSettingUpdateFetch = (body: StaffSettingsUpdateBodyRequest) => Promise<ApiResponse<StaffSettingsResponse>>;

export const useUserSettingUpdate = () => {
  const { put, mutate } = useFetch();

  const update: UseUserSettingUpdateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<StaffSettingsResponse> = await put("settings", body);
      await mutate(["settings"]);
      return response;
    },
    [put, mutate],
  );

  return {
    update,
  };
};
