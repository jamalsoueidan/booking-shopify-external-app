export const hasPermission = (role: number) => (req, res, next) => {
  if (req.session.role < role) {
    next();
  }
  next();
};
