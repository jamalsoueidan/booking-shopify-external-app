import {
  AppControllerProps,
  BookingBodyCreateRequest,
  BookingBodyUpdateRequest,
  BookingModel,
  BookingRequest,
  BookingServiceCreate,
  BookingServiceUpdate,
  ShopQuery
} from "@jamalsoueidan/bsb.bsb-pkg";
import * as BookingService from "@services/Booking.service";
import * as StaffService from "@services/Staff.service";


interface GetBookingsQuery extends ShopQuery, BookingRequest {}

export const getBookings = async ({
  query,
  session,
}: AppControllerProps<GetBookingsQuery>) => {
  let allStaff;

  const { staff } = query;
  // if picked one staff from booking-staff instead of all staff.
  if (staff) {
    const isAllowed = await StaffService.isAllowed({
      ...session, // session includes staff, so must be first
      staff,
    });

    if (!isAllowed) {
      throw new Error("not allowed");
    }
    allStaff = [staff];
  } else {
    // if picked to see all events for all staff
    allStaff = await StaffService.getIdsbyGroup({
      shop: session.shop,
      group: session.group,
    });
  }

  return BookingService.getBookings({
    ...query,
    shop: session.shop,
    staff: allStaff,
  });
};

interface GetBookingByIdQuery extends ShopQuery {
  id: string;
}

export const getBookingById = async ({
  query,
  session,
}: AppControllerProps<GetBookingByIdQuery>) => {
  let allStaff = await StaffService.getIdsbyGroup({
    shop: session.shop,
    group: session.group,
  });

  return BookingService.getBookingById({
    id: query.id,
    shop: session.shop,
    staff: allStaff,
  });
};

export const create = ({
  body,
  session,
}: AppControllerProps<any, BookingBodyCreateRequest>) => {
  const { staff, shop } = session;
  //TODO: handle supervisor
  // if session.roles > 1, then
  return BookingServiceCreate({ ...body, staff, shop });
};

export const update = ({
  query,
  body,
  session,
}: AppControllerProps<{ id: string }, BookingBodyUpdateRequest>) => {
  const { id } = query;
  const { staff, shop } = session;
  //TODO: handle supervisor
  // if session.roles > 1, then
  const booking = BookingModel.findOne({ _id: id, shop, staff });
  if (!booking) {
    throw new Error("not allowed");
  }

  return BookingServiceUpdate({
    filter: { shop, _id: id },
    body: { ...body, staff },
  });
};
