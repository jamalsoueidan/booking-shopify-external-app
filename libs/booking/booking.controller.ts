import {
  AppControllerProps,
  BookingModel,
  BookingServiceCreate,
  BookingServiceCreateProps,
  BookingServiceGetAll,
  BookingServiceGetAllProps,
  BookingServiceUpdate,
  BookingServiceUpdateBodyProps,
} from "@jamalsoueidan/pkg.bsb";
import * as BookingService from "@services/Booking.service";
import * as StaffService from "@services/Staff.service";

export const getBookings = async ({
  query,
  session,
}: AppControllerProps<Omit<BookingServiceGetAllProps, "staff"> & { staff: string }>) => {
  let allStaff;

  const { staff } = query;
  // if picked one staff from booking-staff instead of all staff.
  if (staff) {
    const isAllowed = await StaffService.isAllowed({
      shop: session.shop,
      group: session.group,
      staff, // we need staff from query
    });

    if (!isAllowed) {
      throw new Error("not allowed");
    }
    allStaff = [staff];
  } else {
    // if picked to see all events for all staff
    allStaff = await StaffService.getStaffIdsbyGroup({
      shop: session.shop,
      group: session.group,
    });
  }

  return BookingServiceGetAll({
    ...query,
    shop: session.shop,
    staff: allStaff,
  });
};

interface GetBookingByIdQuery {
  id: string;
}

export const getBookingById = async ({ query, session }: AppControllerProps<GetBookingByIdQuery>) => {
  let allStaff = await StaffService.getStaffIdsbyGroup({
    shop: session.shop,
    group: session.group,
  });

  return BookingService.getBookingById({
    id: query.id,
    shop: session.shop,
    staff: allStaff,
  });
};

export const create = ({ body, session }: AppControllerProps<any, BookingServiceCreateProps>) => {
  const { staff, shop } = session;
  //TODO: handle supervisor
  // if session.roles > 1, then
  return BookingServiceCreate({ ...body, staff, shop });
};

export const update = ({ query, body, session }: AppControllerProps<{ id: string }, BookingServiceUpdateBodyProps>) => {
  const { id } = query;
  const { staff, shop } = session;
  //TODO: handle supervisor
  // if session.roles > 1, then
  const booking = BookingModel.findOne({ _id: id, shop, staff });
  if (!booking) {
    throw new Error("not allowed");
  }

  return BookingServiceUpdate({ shop, _id: id }, { ...body, staff });
};
