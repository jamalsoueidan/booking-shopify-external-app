import * as BookingService from "@services/Booking.service";
import * as StaffService from "@services/Staff.service";

interface GetBookingsQuery extends ShopQuery, GetBookingsRequest {}

export const getBookings = async ({
  query,
  session,
}: ControllerProps<GetBookingsQuery>) => {
  let allStaff = await StaffService.getIdsbyGroup({
    shop: session.shop,
    group: session.group,
  });

  const { staff } = query;
  if (staff) {
    const isAllowed = await StaffService.isAllowed({
      ...session, // session includes staff, so must be first
      staff,
    });

    if (!isAllowed) {
      throw new Error("not allowed to access this user");
    }
    allStaff = [staff];
  }

  return BookingService.getBookings({ ...query, staff: allStaff });
};

interface GetBookingByIdQuery extends ShopQuery {
  id: string;
}

export const getBookingById = async ({
  query,
}: ControllerProps<GetBookingByIdQuery>) => {
  return BookingService.getBookingById({ ...query });
};
