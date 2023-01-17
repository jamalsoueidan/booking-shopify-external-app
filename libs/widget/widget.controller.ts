import {
  BookingServiceGetForWidget,
  CartServiceGetByStaff,
  ScheduleServiceGetByStaffAndTag,
  UserModel,
  WidgetDateQuery,
  WidgetSchedule,
  WidgetServiceCalculator,
  WidgetServiceGetProduct,
  WidgetServiceGetStaff,
  WidgetStaff,
  WidgetStaffQuery,
} from "@jamalsoueidan/bsb.bsb-pkg";

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
  return WidgetServiceGetStaff({
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

  const product = await WidgetServiceGetProduct({
    shop,
    productId: +productId,
    staff,
  });

  const schedules = await ScheduleServiceGetByStaffAndTag({
    tag: product.staff.map((s) => s.tag),
    staff: product.staff.map((s) => s.staff),
    start,
    end,
  });

  const bookings = await BookingServiceGetForWidget({
    shop,
    staff: product.staff.map((s) => s.staff),
    start: new Date(start),
    end: new Date(end),
  });

  const carts = await CartServiceGetByStaff({
    shop,
    staff: product.staff.map((s) => s.staff),
    start: new Date(start),
    end: new Date(end),
  });

  return WidgetServiceCalculator({ schedules, bookings, carts, product });
};

export const settings = () => {
  return UserModel.findOne({}, "language status timeZone");
};
