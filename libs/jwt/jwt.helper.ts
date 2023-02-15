import { AppSession, IUserDocument } from "@jamalsoueidan/pkg.bsb";
import jwt from "jsonwebtoken";

export const createToken = (user: IUserDocument, group: string) => {
  return jwt.sign(
    {
      _id: user._id,
      staff: user.staff.toString(),
      shop: user.shop,
      role: user.role,
      group,
    } as AppSession,
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};
