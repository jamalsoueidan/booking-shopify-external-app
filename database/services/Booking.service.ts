import { BookingModel, ShopQuery } from "@jamalsoueidan/pkg.bsb";
import mongoose from "mongoose";

interface GetBookingByIdProps extends ShopQuery {
  id: string;
  staff?: string[];
}

export const getBookingById = async ({ id, shop, staff }: GetBookingByIdProps) => {
  const bookings = await BookingModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
        shop,
        staff: { $in: staff.map((s) => new mongoose.Types.ObjectId(s)) },
      },
    },
    ...lookupBooking,
  ]);

  return bookings.length > 0 ? bookings[0] : null;
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
