import { BookingModel, NotificationModel, ShopQuery } from "@jamalsoueidan/pkg.backend";

interface CanModifiyProps extends ShopQuery {
  staff: string;
  id?: string;
  lineItemId?: number;
  orderId?: number;
}
export const canModifiy = async (filter: CanModifiyProps) => {
  const notification = await NotificationModel.findOne(filter).lean();

  if (!notification) {
    return false;
  }

  const booking = await BookingModel.findOne({
    orderId: notification.orderId,
    lineItemId: notification.lineItemId,
  });

  return filter.staff === booking.staff.toString();
};
