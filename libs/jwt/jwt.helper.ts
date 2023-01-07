import jwt from "jsonwebtoken";

export const createToken = (user: User) => {
  return jwt.sign(
    { _id: user._id, staff: user.staff, shop: user.shop },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};
