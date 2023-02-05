import { ShopQuery, SmsApiSend, UserLoginBodyRequest, UserLoginResponse, UserReceivePasswordBodyRequest, UserReceivePasswordResponse } from "@jamalsoueidan/bsb.bsb-pkg";
import { createToken } from "@libs/jwt/jwt.helper";
import * as StaffService from "@services/Staff.service";
import * as UserService from "@services/User.service";

interface ReceivePasswordProps {
  query: ShopQuery;
  body: UserReceivePasswordBodyRequest;
}

export const receivePassword = async ({
  query,
  body,
}: ReceivePasswordProps): Promise<UserReceivePasswordResponse> => {
  const staff = await StaffService.findBy({
    shop: query.shop,
    phone: body.phone,
  });

  if (staff) {
    const password = await UserService.createNewPassword(staff);

    SmsApiSend({
      receiver: staff.phone,
      message: `Din adgangskode: ${password}`,
    });

    console.log("password", password);

    return {
      message: "Check your phone",
    };
  } else {
    throw new Error("phone number not exist");
  }
};

interface LoginProps {
  query: ShopQuery;
  body: UserLoginBodyRequest;
}

export const login = async ({
  query,
  body,
}: LoginProps): Promise<UserLoginResponse> => {
  const user = await UserService.findUser({
    shop: query.shop,
    identification: body.identification,
    password: body.password,
  });

  if (user) {
    // check if staff is still active
    const staff = await StaffService.findBy({
      shop: query.shop,
      _id: user.staff,
    });
    if (staff) {
      return { token: createToken(user, staff.group) };
    }
  }
  throw new Error("your information is wrong");
};
