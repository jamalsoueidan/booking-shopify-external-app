import * as StaffService from "@services/Staff.service";
import * as UserService from "@services/User.service";

interface LoginPasswordBody {
  phone: string;
}

interface LoginPhoneProps {
  query: ShopQuery;
  body: LoginPasswordBody;
}

export const loginPhone = async ({ query, body }: LoginPhoneProps) => {
  const staff = await StaffService.findStaffByPhone({
    shop: query.shop,
    phone: body.phone,
  });
  if (staff) {
    return UserService.createNewPassword(staff);
  } else {
    throw new Error("phone number not exist");
  }
};

interface CreateProps {
  query: ShopQuery;
  body: BookingBodyCreate;
}

export const loginEmail = ({ query, body }: CreateProps) => {
  const shop = query.shop;
  return "iojsad";
};

interface ValidatePhonePasswordBody {
  phone: string;
  password: string;
}

interface ValidatePhonePasswordProps {
  query: ShopQuery;
  body: ValidatePhonePasswordBody;
}

export const validatePhonePassword = ({
  query,
  body,
}: ValidatePhonePasswordProps) => {
  return UserService.findUserByPhoneAndPassword({ ...query, ...body });
};
