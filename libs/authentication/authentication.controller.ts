import {
  ControllerProps,
  ShopQuery,
  SmsDkApiSend,
  StaffLoginBodyRequest,
  StaffLoginResponse,
  StaffReceivePasswordBodyRequest,
  StaffReceivePasswordResponse,
  StaffServiceCreateNewPassword,
  StaffServiceLogin,
} from "@jamalsoueidan/pkg.bsb";
import { createToken } from "@libs/jwt/jwt.helper";
import * as StaffService from "@services/Staff.service";

export const receivePassword = async ({
  query,
  body,
}: ControllerProps<ShopQuery, StaffReceivePasswordBodyRequest>): Promise<StaffReceivePasswordResponse> => {
  const staff = await StaffService.findBy({
    shop: query.shop,
    phone: body.phone,
  });

  if (staff) {
    const password = await StaffServiceCreateNewPassword(staff);

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
}: ControllerProps<ShopQuery, StaffLoginBodyRequest>): Promise<StaffLoginResponse> => {
  const staff = await StaffServiceLogin({
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
