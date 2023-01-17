import { useFetch } from "@hooks";
import { StaffBodyUpdate } from "@jamalsoueidan/bsb.bsb-pkg";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useStaff = () => {
  const { get } = useFetch();

  const { data } = useQuery<ApiResponse<Staff>>(["staff"], () => get("staff"));

  return { data: data?.payload };
};

type UseStaffUpdateFetch = (
  body: StaffBodyUpdate
) => Promise<ApiResponse<Staff>>;

export const useStaffUpdate = () => {
  const { put, mutate } = useFetch();

  const update: UseStaffUpdateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<Staff> = await put("staff", body);
      await mutate(["staff"]);
      return response;
    },
    [put, mutate]
  );

  return {
    update,
  };
};
