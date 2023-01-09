import { useFetch } from "@hooks/useFetch";
import { useQuery } from "react-query";

export const useBookings = ({ start, end, staff }: GetBookingsRequest) => {
  const { get } = useFetch();

  const { data, isLoading } = useQuery<ApiResponse<Array<GetBookingsResponse>>>(
    {
      queryKey: ["bookings", { start, end, staff }],
      queryFn: () =>
        get(
          `booking?start=${start}&end=${end}${staff ? "&staff=" + staff : ""}`
        ),
      enabled: !!start && !!end,
    }
  );

  return {
    data: data?.payload,
    isLoading,
  };
};

interface UseBookingGetProps {
  id: string;
}

export const useBookingGet = ({ id }: UseBookingGetProps) => {
  const { get } = useFetch();

  const { data } = useQuery<ApiResponse<GetBookingsResponse>>({
    queryKey: ["booking", id],
    queryFn: () => get(`booking/${id}`),
  });

  return {
    data: data?.payload,
  };
};

export const useBookingGetStaff = () => {
  const { get } = useFetch();

  const { data, isLoading } = useQuery<ApiResponse<Array<Staff>>>({
    queryKey: ["booking", "staff"],
    queryFn: () => get(`booking/staff`),
  });

  return {
    data: data?.payload,
    isLoading,
  };
};
