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
  phone?: string;
  email?: string;
  password: string;
}

export const findUser = async ({
  shop,
  phone,
  email,
  password,
}: FindUserByPhoneAndPasswordProps) => {
  const user = await UserModel.findOne({
    shop,
    $or: [{ phone }, { email }],
  });
  if (user) {
    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      return user;
    }
  }
  return false;
};
