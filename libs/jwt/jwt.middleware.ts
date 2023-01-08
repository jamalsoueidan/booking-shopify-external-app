import jwt from "jsonwebtoken";

export const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: User) => {
      if (err) return res.sendStatus(403);
      req.query.shop = user.shop;
      req.session = {
        ...user,
      };

      next();
    }
  );
};
