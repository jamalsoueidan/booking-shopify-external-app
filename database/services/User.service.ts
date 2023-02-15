import { ShopQuery, Staff, UserModel } from "@jamalsoueidan/pkg.bsb";
import bcrypt from "bcryptjs";
import generator from "generate-password";
import mongoose from "mongoose";

export const createNewPassword = async (staff: Staff) => {
  const password = generator.generate({
    length: 8,
    numbers: true,
    symbols: false,
    uppercase: false,
  });

  // user not exists
  let user = await UserModel.findOne({
    staff: staff._id,
  });

  if (!user) {
    user = new UserModel();
    user.shop = staff.shop;
    user.staff = new mongoose.Types.ObjectId(staff._id);
  }

  user.phone = staff.phone;
  user.email = staff.email;
  user.password = password;
  user.save();
  return password;
};

interface FindUserByPhoneAndPasswordProps extends ShopQuery {
  identification: string;
  password: string;
}

export const findUser = async ({
  shop,
  identification,
  password,
}: FindUserByPhoneAndPasswordProps) => {
  const user = await UserModel.findOne({
    shop,
    $or: [{ phone: identification }, { email: identification }],
  });

  if (user) {
    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      return user;
    }
  }
};
