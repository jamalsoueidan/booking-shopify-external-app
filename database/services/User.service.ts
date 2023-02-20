import { IStaffDocument, ShopQuery, StaffModel } from "@jamalsoueidan/pkg.bsb";
import bcrypt from "bcryptjs";
import generator from "generate-password";

export const createNewPassword = async (staff: IStaffDocument) => {
  const password = generator.generate({
    length: 8,
    numbers: true,
    symbols: false,
    uppercase: false,
  });

  // user not exists
  staff.user.password = password;
  staff.save();
  return password;
};

interface FindUserByPhoneAndPasswordProps extends ShopQuery {
  identification: string;
  password: string;
}

export const findUser = async ({ shop, identification, password }: FindUserByPhoneAndPasswordProps) => {
  const staff = await StaffModel.findOne({
    shop,
    active: true,
    $or: [{ phone: identification }, { email: identification }],
  });

  if (staff) {
    const correctPassword = await bcrypt.compare(password, staff.user.password);
    if (correctPassword) {
      return staff;
    }
  }
};
