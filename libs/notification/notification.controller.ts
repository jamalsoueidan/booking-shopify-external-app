import {
  NotificationBody,
  NotificationQuery,
  NotificationServiceCancel,
  NotificationServiceGet,
  NotificationServiceResend,
  NotificationServiceSendCustom,
} from "@jamalsoueidan/bsb.bsb-pkg";

import * as NotificationService from "@services/Notification.service";

export enum ControllerMethods {
  get = "get",
  sendCustom = "sendCustom",
  resend = "resend",
  cancel = "cancel",
}

interface GetQuery extends NotificationQuery {}

export const get = ({ query, session }: ControllerProps<GetQuery>) => {
  return NotificationServiceGet({ ...query, shop: session.shop });
};

interface SendCustomProps extends NotificationQuery, NotificationBody {}

export const sendCustom = async ({
  query,
  body,
  session,
}: ControllerProps<SendCustomProps, NotificationBody>) => {
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

export const resend = async ({
  query,
  session,
}: ControllerProps<{ id: string }>) => {
  const canModify = await NotificationService.canModifiy({
    id: query.id,
    ...session,
  });

  if (!canModify) {
    throw Error("denied access");
  }

  return NotificationServiceResend({ id: query.id, shop: session.shop });
};

export const cancel = async ({
  query,
  session,
}: ControllerProps<{ id: string }>) => {
  const canModify = await NotificationService.canModifiy({
    id: query.id,
    ...session,
  });

  if (!canModify) {
    throw Error("denied access");
  }

  return NotificationServiceCancel({ id: query.id, shop: session.shop });
};
