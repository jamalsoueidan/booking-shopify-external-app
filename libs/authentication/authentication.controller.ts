import { createToken } from "@libs/jwt/jwt.helper";
import { SmsApiSend } from "@jamalsoueidan/booking-shopify-backend.api.pkg";
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
  const staff = await StaffService.findBy({
    shop: query.shop,
    phone: body.phone,
  });
  if (staff) {
    const password = await UserService.createNewPassword(staff);
    if (process.env.NODE_ENV === "production") {
      SmsApiSend({
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
