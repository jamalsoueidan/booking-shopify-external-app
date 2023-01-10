import { beginningOfDay, closeOfDay } from "@helpers/date";
import ScheduleModel, { IScheduleModel } from "@models/Schedule.model";
import mongoose, { Types } from "mongoose";

interface GetByDateRangeProps {
  shop: string;
  staff: string;
  start: string;
  end: string;
}

export const getByDateRange = async ({
  shop,
  staff,
  start,
  end,
}: GetByDateRangeProps) => {
  return await ScheduleModel.find({
    staff: new mongoose.Types.ObjectId(staff),
    start: {
      $gte: beginningOfDay(start),
    },
    end: {
      $lt: closeOfDay(end),
    },
    shop,
  });
};

export interface GetByStaffAndTagReturn extends Omit<IScheduleModel, "staff"> {
  staff: {
    _id: string;
    fullname: string;
  };
}

interface GetByStaffAndTagProps {
  tag: string[];
  staff: Types.ObjectId[];
  start: string;
  end: string;
}

export const getByStaffAndTag = async ({
  tag,
  staff,
  start,
  end,
}: GetByStaffAndTagProps): Promise<Array<GetByStaffAndTagReturn>> => {
  return await ScheduleModel.aggregate([
    {
      $match: {
        tag: {
          $in: tag,
        },
        staff: {
          $in: staff,
        },
        start: {
          $gte: beginningOfDay(start),
        },
        end: {
          $lt: closeOfDay(end),
        },
      },
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
      },
    },
    {
      $match: {
        "staff.active": true,
      },
    },
    {
      $project: {
        "staff.email": 0,
        "staff.active": 0,
        "staff.shop": 0,
        "staff.phone": 0,
        "staff.position": 0,
        "staff.__v": 0,
      },
    },
  ]);
};
