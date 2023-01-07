import { createToken } from "@libs/jwt/jwt.helper";
import smsdkApi from "@libs/smsdk/smsdk.api";
import * as StaffService from "@services/Staff.service";
import * as UserService from "@services/User.service";

interface ReceivePasswordProps {
  query: ShopQuery;
  body: ReceivePasswordBody;
}

export const receivePassword = async ({
  query,
  body,
}: ReceivePasswordProps): Promise<ReceivePasswordResponse> => {
  const staff = await StaffService.findStaffByPhone({
    shop: query.shop,
    phone: body.phone,
  });
  if (staff) {
    const password = await UserService.createNewPassword(staff);
    if (process.env.NODE_ENV === "production") {
      smsdkApi.send({
        receiver: staff.phone,
        message: `Din adgangskode: ${password}`,
      });
    } else {
      console.log("password", password);
    }

    return {
      message: "Check your phone",
    };
  } else {
    throw new Error("phone number not exist");
  }
};

interface LoginProps {
  query: ShopQuery;
  body: LoginBody;
}

export const login = async ({
  query,
  body,
}: LoginProps): Promise<LoginResponse> => {
  const user = await UserService.findUser({
    ...query,
    ...body,
  });
  if (user) {
    return { token: createToken(user) };
  }
  throw new Error("your information is wrong");
};
