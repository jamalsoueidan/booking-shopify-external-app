import {
  ApiResponse,
  WidgetSchedule,
  WidgetServiceAvailabilityProps,
  WidgetServiceGetStaffProps,
  WidgetStaff,
} from "@jamalsoueidan/pkg.bsb-types";
import { useFetch } from "@jamalsoueidan/pkg.bsf";
import { useQuery } from "react-query";

export const useWidgetStaff = (params: WidgetServiceGetStaffProps) => {
  const { get, mutate } = useFetch();

  const { data } = useQuery<ApiResponse<Array<WidgetStaff>>>({
    enabled: params.productId > 0,
    queryFn: async () => {
      mutate(["widget", "availability"]);
      return get({ url: "widget/staff", params });
    },
    queryKey: ["widget", "staff", params],
  });

  return { data: data?.payload };
};

export const useWidgetDate = (params: WidgetServiceAvailabilityProps) => {
  const { get } = useFetch();
  const { data } = useQuery<ApiResponse<Array<WidgetSchedule>>>({
    enabled: !!params.staff && !!params.productId && !!params.start && !!params.end,
    queryFn: () => get({ url: "widget/availability", params } as any),
    queryKey: ["widget", "availability", params],
  });

  return { data: data?.payload };
};
