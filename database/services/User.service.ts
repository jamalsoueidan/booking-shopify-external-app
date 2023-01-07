import UserModel from "@models/User.model";
import bcrypt from "bcryptjs";
import generator from "generate-password";

export const createNewPassword = async (staff: Staff) => {
  const password = generator.generate({
    length: 8,
    numbers: true,
    symbols: false,
    uppercase: false,
  });

  let user = await UserModel.findOne({ staff: staff._id });
  if (!user) {
    user = new UserModel();
    user.shop = staff.shop;
    user.staff = staff._id;
    user.phone = staff.phone;
    user.email = staff.email;
  }
  user.password = password;
  user.save();
  return password;
};

interface FindUserByPhoneAndPasswordProps extends ShopQuery {
  phone: string;
  password: string;
}

export const findUserByPhoneAndPassword = async ({
  shop,
  phone,
  password,
}: FindUserByPhoneAndPasswordProps) => {
  const user = await UserModel.findOne({ shop, phone });
  if (user) {
    return await bcrypt.compare(password, user.password);
  }
  return false;
};
