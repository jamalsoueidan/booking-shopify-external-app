import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

export interface IUserModel extends Omit<User, "_id">, Document {}

const UserSchema = new Schema({
  shop: {
    type: String,
    required: true,
    index: true,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
    unique: true,
  },
  email: { type: String, index: true, required: true },
  phone: { type: String, index: true, required: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

export default mongoose.model<IUserModel>("User", UserSchema, "User");
