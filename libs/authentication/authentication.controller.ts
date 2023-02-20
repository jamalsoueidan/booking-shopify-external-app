import {
  ControllerProps,
  ShopQuery,
  SmsDkApiSend,
  StaffUserLoginBodyRequest,
  StaffUserLoginResponse,
  StaffUserReceivePasswordBodyRequest,
  StaffUserReceivePasswordResponse,
} from "@jamalsoueidan/pkg.bsb";
import { createToken } from "@libs/jwt/jwt.helper";
import * as StaffService from "@services/Staff.service";
import * as UserService from "@services/User.service";

export const receivePassword = async ({
  query,
  body,
}: ControllerProps<ShopQuery, StaffUserReceivePasswordBodyRequest>): Promise<StaffUserReceivePasswordResponse> => {
  const staff = await StaffService.findBy({
    shop: query.shop,
    phone: body.phone,
  });

  if (staff) {
    const password = await UserService.createNewPassword(staff);

    SmsDkApiSend({
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

export const login = async ({
  query,
  body,
}: ControllerProps<ShopQuery, StaffUserLoginBodyRequest>): Promise<StaffUserLoginResponse> => {
  const staff = await UserService.findUser({
    shop: query.shop,
    identification: body.identification,
    password: body.password,
  });

  if (staff) {
    // check if staff is still active
    return { token: createToken(staff) };
  }
  throw new Error("your information is wrong");
};
