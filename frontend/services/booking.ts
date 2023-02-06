import { useFetch } from "@hooks/useFetch";
import { ApiResponse, BookingBodyCreateRequest, BookingBodyUpdateRequest, BookingRequest, BookingResponse } from "@jamalsoueidan/bsb.types";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useBookings = ({ start, end, staff }: BookingRequest) => {
  const { get } = useFetch();

  const { data, isLoading } = useQuery<ApiResponse<Array<BookingResponse>>>({
    enabled: !!start && !!end,
    queryFn: () => get(`bookings?start=${start}&end=${end}${staff ? "&staff=" + staff : ""}`),
    queryKey: ["bookings", { end, staff, start }],
  });

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

  const { data } = useQuery<ApiResponse<BookingResponse>>({
    queryFn: () => get(`bookings/${id}`),
    queryKey: ["booking", id],
  });

  return {
    data: data?.payload,
  };
};

type UseBookingCreateFetch = (body: BookingBodyCreateRequest) => Promise<ApiResponse<BookingResponse>>;

export const useBookingCreate = () => {
  const { post, mutate } = useFetch();

  const create: UseBookingCreateFetch = useCallback(
    async (body) => {
      const response: ApiResponse<BookingResponse> = await post("bookings", body);
      await mutate(["bookings"]);
      await mutate(["widget", "availability"]);
      return response;
    },
    [post, mutate],
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
      await mutate(["bookings"]);
      await mutate(["booking", id]);
      await mutate(["widget", "availability"]);
    },
    [put, id, mutate],
  );

  return {
    update,
  };
};
