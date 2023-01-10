import { useFetch } from "@hooks/useFetch";
import { useCallback } from "react";
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
    suspense: true,
  });

  return {
    data: data?.payload,
    isLoading,
  };
};

type UseBookingCreateFetch = (
  body: BookingBodyCreateRequest
) => Promise<ApiResponse<GetBookingsResponse>>;

export const useBookingCreate = () => {
  const { post, mutate } = useFetch();

  const create: UseBookingCreateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<GetBookingsResponse> = await post(
        "/api/admin/bookings",
        body
      );
      await mutate(["bookings"]);
      await mutate(["widget", "availability"]);
      return response;
    },
    [post, mutate]
  );

  return {
    create,
  };
};

interface UseBookingUpdateProps {
  id: string;
}

type UseBookingUpdateFetch = (body: BookingBodyUpdateRequest) => void;

export const useBookingUpdate = ({ id }: UseBookingUpdateProps) => {
  const { put, mutate } = useFetch();

  const update: UseBookingUpdateFetch = useCallback(
    async (body) => {
      await put("/api/admin/bookings/" + id, body);
      await mutate(["booking", id]);
    },
    [put, mutate]
  );

  return {
    update,
  };
};
