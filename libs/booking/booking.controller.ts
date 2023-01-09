import mongoose from "mongoose";
import * as StaffService from "@services/Staff.service";
import * as BookingService from "@services/Booking.service";

interface GetBookingQuery
  extends ShopQuery,
    Pick<GetBookingsQuery, "start" | "end"> {
  _id?: string;
}

export const getBooking = async ({
  query,
  session,
}: ControllerProps<GetBookingQuery>) => {
  let staff = await StaffService.getIdsbyGroup({
    shop: session.shop,
    group: session.group,
  });

  return BookingService.getBookings({ ...query, staff });
};

interface GetBookingByStaffQuery extends GetBookingQuery {
  staff?: string;
}

export const getBookingByStaff = async ({
  query,
  session,
}: ControllerProps<GetBookingByStaffQuery>) => {
  const { staff } = query;
  const isAllowed = await StaffService.isAllowed({
    ...session, // session includes staff, so must be first
    staff,
  });

  if (!isAllowed) {
    throw new Error("not allowed to access this user");
  }

  return BookingService.getBookings({
    ...query,
    staff: [staff],
  });
};

export const getStaff = ({ query, session }: ControllerProps) => {
  return StaffService.getAllByGroup({
    shop: query.shop,
    group: session.group,
  });
};
