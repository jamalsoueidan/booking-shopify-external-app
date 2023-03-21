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
    token = createToken({
      _id: staff?._id || "2388932983892",
      shop: staff?.shop || "testeriphone.myshopify.com",
      role: staff?.role || StaffRole.owner,
      group: staff?.group || "all",
    });
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
