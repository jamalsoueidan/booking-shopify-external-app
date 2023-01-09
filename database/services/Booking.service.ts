import { beginningOfDay, closeOfDay } from "@helpers/date";
import BookingModel from "@models/Booking.model";
import mongoose from "mongoose";

interface GetBookingProps extends ShopQuery, Omit<GetBookingsRequest, "staff"> {
  staff?: string[];
}

export const getBookings = ({
  _id,
  shop,
  start,
  end,
  staff,
}: GetBookingProps) => {
  return BookingModel.aggregate([
    {
      $match: {
        ...(_id ? { _id: new mongoose.Types.ObjectId(_id) } : {}),
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
  ]);
};
