import mongoose from "mongoose";

export const connection = async () => {
  try {
    console.log("Trying connecting to MongoDB...");
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
  }
};
