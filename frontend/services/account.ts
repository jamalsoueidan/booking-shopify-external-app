import {
  ApiResponse,
  Staff,
  StaffBodyUpdate,
  StaffSettingsResponse,
  StaffSettingsUpdateBodyRequest,
} from "@jamalsoueidan/pkg.backend-types";
import { useFetch } from "@jamalsoueidan/pkg.frontend";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useAccountSetting = () => {
  const { get } = useFetch();
  const { data, isLoading } = useQuery<ApiResponse<StaffSettingsResponse>>({
    enabled: !!localStorage.getItem("token"),
    queryFn: () => get({ url: `settings` }),
    queryKey: ["settings"],
  });

  return {
    data: data?.payload,
    isLoading,
  };
};

type UseUserSettingUpdateFetch = (body: StaffSettingsUpdateBodyRequest) => Promise<ApiResponse<StaffSettingsResponse>>;

export const useAccountSettingUpdate = () => {
  const { put, mutate } = useFetch();

  const update: UseUserSettingUpdateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<StaffSettingsResponse> = await put({ body, url: "settings" });
      await mutate(["settings"]);
      return response;
    },
    [put, mutate],
  );

  return {
    update,
  };
};

export const useAccount = () => {
  const { get } = useFetch();
  const { data } = useQuery<ApiResponse<Staff>>(["account"], () => get<ApiResponse<Staff>>({ url: "account" }));
  return { data: data?.payload };
};

type UseStaffUpdateFetch = (body: StaffBodyUpdate) => Promise<ApiResponse<Staff>>;

export const useAccountUpdate = () => {
  const { put, mutate } = useFetch();

  const update: UseStaffUpdateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<Staff> = await put({ body, url: "account" });
      await mutate(["account"]);
      return response;
    },
    [put, mutate],
  );

  return {
    update,
  };
};
