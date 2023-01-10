import * as BookingService from "@services/Booking.service";
import * as CartService from "@services/Cart.service";
import * as WidgetService from "@services/Widget.service";
import * as ScheduleService from "@services/Schedule.service";
import helpers from "./widget.helpers";
import UserModel from "@models/User.model";

export interface AvailabilityReturn extends WidgetSchedule {}

interface StaffQuery extends WidgetStaffQuery {
  shop: string;
}

export const staff = ({
  query,
}: {
  query: StaffQuery;
}): Promise<Array<WidgetStaff>> => {
  const { productId, shop } = query;
  return WidgetService.getStaff({
    shop,
    productId: +productId,
  });
};

interface AvailabilityQuery extends Omit<WidgetDateQuery, "staff"> {
  staff?: string;
  shop: string;
}

export const availability = async ({
  query,
}: {
  query: AvailabilityQuery;
}): Promise<Array<WidgetSchedule>> => {
  const { staff, start, end, shop, productId } = query;

  const product = await WidgetService.getProduct({
    shop,
    productId: +productId,
    staff,
  });

  const schedules = await ScheduleService.getByStaffAndTag({
    tag: product.staff.map((s) => s.tag),
    staff: product.staff.map((s) => s.staff),
    start,
    end,
  });

  const bookings = await BookingService.getBookingsForWidget({
    shop,
    staff: product.staff.map((s) => s.staff),
    start: new Date(start),
    end: new Date(end),
  });

  const carts = await CartService.getCartsByStaff({
    shop,
    staff: product.staff.map((s) => s.staff),
    start: new Date(start),
    end: new Date(end),
  });

  return helpers.calculate({ schedules, bookings, carts, product });
};

export const settings = () => {
  return UserModel.findOne({}, "language status timeZone");
};
