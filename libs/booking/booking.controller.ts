import {
  AppControllerProps,
  BookingModel,
  BookingServiceCreate,
  BookingServiceCreateProps,
  BookingServiceGetAll,
  BookingServiceGetAllProps,
  BookingServiceGetById,
  BookingServiceUpdate,
  BookingServiceUpdateBodyProps,
} from "@jamalsoueidan/pkg.bsb";
import * as StaffService from "@services/Staff.service";

export const getBookings = async ({ query, session }: AppControllerProps<Omit<BookingServiceGetAllProps, "staff">>) => {
  const allStaff = await StaffService.getStaffIdsbyGroup({
    shop: session.shop,
    group: session.group,
  });

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

  return BookingServiceGetById({
    _id: query.id,
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
