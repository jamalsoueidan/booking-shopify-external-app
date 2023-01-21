import {
  BookingBodyCreate,
  BookingBodyUpdate,
  BookingModel,
  BookingServiceCreate,
  BookingServiceUpdate,
} from "@jamalsoueidan/bsb.bsb-pkg";
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
      throw new Error("not allowed");
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

export const create = ({
  body,
  session,
}: ControllerProps<any, BookingBodyCreate>) => {
  const { staff, shop } = session;
  //TODO: handle supervisor
  // if session.roles > 1, then
  return BookingServiceCreate({ ...body, staff, shop });
};

export const update = ({
  query,
  body,
  session,
}: ControllerProps<{ id: string }, BookingBodyUpdate>) => {
  const { id } = query;
  const { staff, shop } = session;
  //TODO: handle supervisor
  // if session.roles > 1, then
  const booking = BookingModel.findOne({ _id: id, shop, staff });
  if (booking) {
    return BookingServiceUpdate({
      filter: { shop, _id: id },
      body: { ...body, staff },
    });
  } else {
    throw new Error("not allowed");
  }
};
