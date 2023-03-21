import { AppSession, Staff, StaffRole } from "@jamalsoueidan/pkg.backend";
import jwt from "jsonwebtoken";

export const createToken = (staff: Pick<Staff, "_id" | "shop" | "role" | "group">) => {
  return jwt.sign(
    {
      staff: staff._id.toString(),
      shop: staff.shop,
      role: staff.role,
      group: staff.group,
      isOwner: staff.role === StaffRole.owner,
      isAdmin: staff.role === StaffRole.admin,
      isUser: staff.role === StaffRole.user,
    } as AppSession,
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" },
  );
};
