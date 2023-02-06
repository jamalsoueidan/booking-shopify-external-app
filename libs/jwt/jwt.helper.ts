import { IUserDocument } from "@jamalsoueidan/bsb.bsb-pkg";
import { Session } from "index.types";
import jwt from "jsonwebtoken";

export const createToken = (user: IUserDocument, group: string) => {
  return jwt.sign(
    {
      _id: user._id,
      staff: user.staff.toString(),
      shop: user.shop,
      role: user.role,
      group,
    } as Session,
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};
