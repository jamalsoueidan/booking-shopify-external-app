import { AppSession, StaffModel, StaffRole } from "@jamalsoueidan/pkg.backend";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { createToken } from "./jwt.helper";

export const jwtMiddleware = async (req, res: Response, next) => {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  // for bit.dev
  if (process.env.ENV === "development" && !token) {
    const staff = await StaffModel.findOne({ role: StaffRole.owner });
    if (staff) {
      token = createToken(staff);
    }
  }

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, token: AppSession) => {
    if (err) {
      return res.status(403).send({ success: false, error: "denied access" });
    }

    req.query.shop = token.shop;
    req.session = {
      ...token,
      isAdmin: token.role === StaffRole.admin,
      isOwner: token.role === StaffRole.owner,
      isUser: token.role === StaffRole.user,
    };

    next();
  });
};
