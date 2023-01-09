import * as BookingService from "@services/Booking.service";
import * as StaffService from "@services/Staff.service";

interface GetBookingQuery extends ShopQuery, GetBookingsRequest {}

export const getBooking = async ({
  query,
  session,
}: ControllerProps<GetBookingQuery>) => {
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
  }

  return BookingService.getBookings({ ...query, staff: allStaff });
};

export const getStaff = ({ query, session }: ControllerProps) => {
  return StaffService.getAllByGroup({
    shop: query.shop,
    group: session.group,
  });
};
