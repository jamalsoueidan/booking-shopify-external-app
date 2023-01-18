import {
  BookingSchema,
  CartSchema,
  CollectionSchema,
  CustomerSchema,
  NotificationSchema,
  NotificationTemplateSchema,
  ProductSchema,
  ScheduleSchema,
  SettingSchema,
  ShopifySessionsSchema,
  StaffSchema,
  UserSchema,
} from "@jamalsoueidan/bsb.bsb-pkg";
import mongoose from "mongoose";

export const connection = async () => {
  try {
    console.log("Trying connecting to MongoDB...");
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI, () => {
      mongoose.model("Booking", BookingSchema);
      mongoose.model("Cart", CartSchema);
      mongoose.model("Collection", CollectionSchema);
      mongoose.model("Customer", CustomerSchema);
      mongoose.model("NotificationTemplate", NotificationTemplateSchema);
      mongoose.model("Notification", NotificationSchema);
      mongoose.model("Product", ProductSchema);
      mongoose.model("Schedule", ScheduleSchema);
      mongoose.model("Setting", SettingSchema);
      mongoose.model("ShopifySessions", ShopifySessionsSchema);
      mongoose.model("Staff", StaffSchema);
      mongoose.model("User", UserSchema);
      console.log("MongoDB is Connected");
    });
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
  }
};
