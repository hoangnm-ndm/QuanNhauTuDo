export const roleMiddleware =
  (...roles) =>
  (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const hasRole = roles.includes(userRole);

    if (!hasRole) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }

    next();
  };
