import { ApiResponse, NotificationBody, NotificationQuery } from "@jamalsoueidan/pkg.bsb-types";
import { useFetch } from "@jamalsoueidan/pkg.bsf";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useNotification = (params: NotificationQuery) => {
  const { get } = useFetch();

  const { data, isLoading } = useQuery<ApiResponse<Array<Notification>>>({
    enabled: !!params.orderId && !!params.lineItemId,
    queryFn: () => get({ url: "/api/admin/notifications", params } as any),
    queryKey: ["notification", params],
  });

  return {
    data: data?.payload || [],
    isLoading: isLoading,
  };
};

type UseSendCustomerNotificaionCreate = (body: NotificationBody) => Promise<ApiResponse<Notification>>;

export const useSendCustomNotification = ({ orderId, lineItemId }: NotificationQuery) => {
  const { post } = useFetch();
  const send: UseSendCustomerNotificaionCreate = useCallback(
    (body) => post({ url: `/api/admin/notifications`, body: { ...body, lineItemId, orderId } }),
    [lineItemId, orderId, post],
  );

  return {
    send,
  };
};

interface UseResendNotificationBody {
  id: string;
}

type UseResendNotificaionCreate = ({ id }: UseResendNotificationBody) => Promise<ApiResponse<Notification>>;

export const useResendNotification = () => {
  const { post } = useFetch();
  const resend: UseResendNotificaionCreate = useCallback(
    ({ id }) => post({ url: `/api/admin/notifications/${id}` }),
    [post],
  );

  return {
    resend,
  };
};
