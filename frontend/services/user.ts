import {
  ApiResponse,
  StaffUserSettingsResponse,
  StaffUserSettingsUpdateBodyRequest,
} from "@jamalsoueidan/pkg.bsb-types";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { useFetch } from "../hooks/use-fetch";

export const useUserSetting = () => {
  const { get } = useFetch();
  const { data, isLoading } = useQuery<ApiResponse<StaffUserSettingsResponse>>({
    enabled: !!localStorage.getItem("token"),
    queryFn: () => get(`settings`),
    queryKey: ["settings"],
  });

  return {
    data: data?.payload,
    isLoading,
  };
};

type UseUserSettingUpdateFetch = (
  body: StaffUserSettingsUpdateBodyRequest,
) => Promise<ApiResponse<StaffUserSettingsResponse>>;

export const useUserSettingUpdate = () => {
  const { put, mutate } = useFetch();

  const update: UseUserSettingUpdateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<StaffUserSettingsResponse> = await put("settings", body);
      await mutate(["settings"]);
      return response;
    },
    [put, mutate],
  );

  return {
    update,
  };
};
