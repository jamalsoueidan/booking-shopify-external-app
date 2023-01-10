import { beginningOfDay, closeOfDay } from "@helpers/date";
import BookingModel from "@models/Booking.model";
import mongoose, { Types } from "mongoose";

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
  id?: string;
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

export interface GetBookingsByStaffProps
  extends ShopQuery,
    Pick<Booking, "start" | "end"> {
  staff: Types.ObjectId[];
}

export const getBookingsForWidget = ({
  shop,
  start,
  end,
  staff,
}: GetBookingsByStaffProps) => {
  return BookingModel.aggregate<Booking>([
    {
      $match: {
        shop,
        staff: {
          $in: staff,
        },
        $or: [
          {
            start: {
              $gte: beginningOfDay(start),
            },
          },
          {
            end: {
              $gte: beginningOfDay(start),
            },
          },
        ],
      },
    },
    {
      $match: {
        $or: [
          {
            start: {
              $lt: closeOfDay(end),
            },
          },
          {
            end: {
              $lt: closeOfDay(end),
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        shop: 0,
        productId: 0,
      },
    },
  ]);
};
