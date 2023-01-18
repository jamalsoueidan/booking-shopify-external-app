import { StaffModel } from "@jamalsoueidan/bsb.bsb-pkg";
import mongoose from "mongoose";

export const connection = async () => {
  try {
    console.log("Trying connecting to MongoDB...");
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI, async () => {
      const staff = await StaffModel.findOne({ postal: 8000, active: true });
      console.log(staff);
      console.log("MongoDB is Connected");
    });
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
  }
};
