import { AppSession, IStaffDocument } from "@jamalsoueidan/pkg.bsb";
import jwt from "jsonwebtoken";

export const createToken = (staff: IStaffDocument) => {
  return jwt.sign(
    {
      staff: staff._id.toString(),
      shop: staff.shop,
      role: staff.role,
      group: staff.group,
    } as AppSession,
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" },
  );
};
