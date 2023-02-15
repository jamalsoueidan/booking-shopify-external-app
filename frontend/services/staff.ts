import { useFetch } from "@hooks/use-fetch";
import { ApiResponse, Staff, StaffBodyUpdate } from "@jamalsoueidan/bsb.types";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useStaff = () => {
  const { get } = useFetch();

  const { data } = useQuery<ApiResponse<Staff>>(["staff"], () => get<ApiResponse<Staff>>("staff"));

  return { data: data?.payload };
};

type UseStaffUpdateFetch = (body: StaffBodyUpdate) => Promise<ApiResponse<Staff>>;

export const useStaffUpdate = () => {
  const { put, mutate } = useFetch();

  const update: UseStaffUpdateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<Staff> = await put("staff", body);
      await mutate(["staff"]);
      return response;
    },
    [put, mutate],
  );

  return {
    update,
  };
};
