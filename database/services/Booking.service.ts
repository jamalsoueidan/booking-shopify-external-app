import { beginningOfDay, closeOfDay } from "@helpers/date";
import { BookingModel } from "@jamalsoueidan/bsb.bsb-pkg";
import mongoose from "mongoose";

interface GetBookingsProps
  extends ShopQuery,
    Omit<GetBookingsRequest, "staff"> {
  staff?: string[];
}

export const getBookings = ({ shop, start, end, staff }: GetBookingsProps) => {
  return BookingModel.aggregate([
    {
      $match: {
        shop,
        start: {
          $gte: beginningOfDay(start),
        },
        end: {
          $lt: closeOfDay(end),
        },
        staff: { $in: staff.map((s) => new mongoose.Types.ObjectId(s)) },
      },
    },
    ...lookupBooking,
  ]);
};

interface GetBookingByIdProps extends ShopQuery {
  id: string;
  staff?: string[];
}

export const getBookingById = ({ id, shop, staff }: GetBookingByIdProps) => {
  return BookingModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
        shop,
        staff: { $in: staff.map((s) => new mongoose.Types.ObjectId(s)) },
      },
    },
    ...lookupBooking,
  ]);
};

const lookupBooking = [
  {
    $lookup: {
      from: "Customer",
      localField: "customerId",
      foreignField: "customerId",
      as: "customer",
    },
  },
  {
    $unwind: "$customer",
  },
  {
    $lookup: {
      from: "Staff",
      localField: "staff",
      foreignField: "_id",
      as: "staff",
    },
  },
  {
    $unwind: {
      path: "$staff",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: "Product",
      localField: "productId",
      foreignField: "productId",
      as: "product",
    },
  },
  {
    $unwind: {
      path: "$product",
      preserveNullAndEmptyArrays: true,
    },
  },
];
