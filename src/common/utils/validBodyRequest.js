import createError from "./createError.js";

const validBodyRequest = (schema) => (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    req.body = data;
    next();
  } catch (error) {
    return next(createError(400, "Valid body", error.message));
  }
};

export default validBodyRequest;
