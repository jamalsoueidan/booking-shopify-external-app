import { useQuery } from "react-query";
import { useFetch } from "../hooks/useFetch";

export const useBookings = () => {
  const { get } = useFetch();
  const { data, isLoading } = useQuery<ApiResponse<any>>({
    queryKey: ["bookings"],
    queryFn: () => get(`booking`),
  });

  return {
    data: data?.payload,
    isLoading,
  };
};
