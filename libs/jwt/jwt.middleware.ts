import { AppSession, StaffRole } from "@jamalsoueidan/pkg.backend";
import { Response } from "express";
import jwt from "jsonwebtoken";

export const jwtMiddleware = (req, res: Response, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

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
