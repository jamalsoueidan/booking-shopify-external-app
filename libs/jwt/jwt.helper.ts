import { AppSession, IStaffDocument } from "@jamalsoueidan/pkg.bsb";
import jwt from "jsonwebtoken";

export const createToken = (staff: IStaffDocument) => {
  return jwt.sign(
    {
      _id: staff._id,
      shop: staff.shop,
      role: staff.user.role,
      group: staff.group,
    } as AppSession,
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" },
  );
};
