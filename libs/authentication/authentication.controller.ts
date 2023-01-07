import smsdkApi from "@libs/smsdk/smsdk.api";
import * as StaffService from "@services/Staff.service";
import * as UserService from "@services/User.service";
import jwt from "jsonwebtoken";

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

interface LoginEmailBody {
  email?: string;
  phone?: string;
  password: string;
}

interface LoginEmailProps {
  query: ShopQuery;
  body: LoginEmailBody;
}

export const loginEmail = async ({ query, body }: LoginEmailProps) => {
  const user = await UserService.findUser({
    ...query,
    ...body,
  });
  if (user) {
    return jwt.sign(
      { userId: user._id, staffId: user.staff },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  }
  throw new Error("email or password wrong");
};
