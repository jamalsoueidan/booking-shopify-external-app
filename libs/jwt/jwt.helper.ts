import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: User) => {
      if (err) return res.sendStatus(403);
      req.query.shop = user.shop;
      req.staff = user.staff;
      req.user = user._id;
      req.shop = user.shop;
      next();
    }
  );
};

export const createToken = (user: User) => {
  return jwt.sign(
    { _id: user._id, staff: user.staff, shop: user.shop },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};
