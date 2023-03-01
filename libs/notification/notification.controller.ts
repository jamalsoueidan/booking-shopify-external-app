import {
  AppControllerProps,
  NotificationBody,
  NotificationQuery,
  NotificationServiceCancel,
  NotificationServiceGet,
  NotificationServiceResend,
  NotificationServiceSendCustom,
} from "@jamalsoueidan/pkg.backend";

import * as NotificationService from "@services/Notification.service";

export const get = ({ query, session }: AppControllerProps<NotificationQuery>) => {
  return NotificationServiceGet({ ...query, shop: session.shop });
};

export const sendCustom = async ({ query, body, session }: AppControllerProps<NotificationQuery, NotificationBody>) => {
  const canModify = await NotificationService.canModifiy({
    orderId: query.orderId,
    lineItemId: query.lineItemId,
    ...session,
  });

  if (!canModify) {
    throw Error("denied access");
  }

  return NotificationServiceSendCustom({
    ...query,
    ...body,
    shop: session.shop,
  });
};

export const resend = async ({ query, session }: AppControllerProps<{ id: string }>) => {
  const canModify = await NotificationService.canModifiy({
    id: query.id,
    ...session,
  });

  if (!canModify) {
    throw Error("denied access");
  }

  return NotificationServiceResend({ id: query.id, shop: session.shop });
};

export const cancel = async ({ query, session }: AppControllerProps<{ id: string }>) => {
  const canModify = await NotificationService.canModifiy({
    id: query.id,
    ...session,
  });

  if (!canModify) {
    throw Error("denied access");
  }

  return NotificationServiceCancel({ id: query.id, shop: session.shop });
};
