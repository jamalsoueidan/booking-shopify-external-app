import {
  ApiResponse,
  Booking,
  BookingServiceCreateProps,
  BookingServiceGetAllProps,
  BookingServiceUpdateProps,
} from "@jamalsoueidan/pkg.bsb-types";
import { useFetch } from "@jamalsoueidan/pkg.bsf";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useBookings = (params: Omit<BookingServiceGetAllProps, "staff"> & { staff?: string }) => {
  const { get } = useFetch();

  const { data, isLoading } = useQuery<ApiResponse<Array<Booking>>>({
    enabled: !!params.start && !!params.end,
    queryFn: () => get({ url: "bookings", params }),
    queryKey: ["bookings", params],
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

  const { data } = useQuery<ApiResponse<Booking>>({
    queryFn: () => get({ url: `bookings/${id}` }),
    queryKey: ["booking", id],
  });

  return {
    data: data?.payload,
  };
};

export const useBookingUpdate = ({ id }: { id: BookingServiceUpdateProps["query"]["_id"] }) => {
  const { put, mutate } = useFetch();

  const update = useCallback(
    async (body: BookingServiceUpdateProps["body"]) => {
      await put({ url: `bookings/${id}`, body });
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

export const useBookingCreate = () => {
  const { post, mutate } = useFetch();

  const create = useCallback(
    async (body: BookingServiceCreateProps) => {
      await post({ url: "bookings", body });
      await mutate(["bookings"]);
      await mutate(["widget", "availability"]);
    },
    [post, mutate],
  );

  return {
    create,
  };
};
