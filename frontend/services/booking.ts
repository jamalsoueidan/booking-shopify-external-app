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
          `bookings?start=${start}&end=${end}${staff ? "&staff=" + staff : ""}`
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
    queryFn: () => get(`bookings/${id}`),
  });

  return {
    data: data?.payload,
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
        "bookings",
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
      await put("bookings/" + id, body);
      await mutate(["booking", id]);
      await mutate(["widget", "availability"]);
    },
    [put, mutate]
  );

  return {
    update,
  };
};
