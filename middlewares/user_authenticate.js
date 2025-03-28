import pkg from "jsonwebtoken";
const { verify } = pkg;

import User from "../db/models/user.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const customer_authenticate = catchAsync(async (req, res, next) => {
  // Get the token from headers
  let token = "";

  // Check for bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Check if token is valid
  const tokenDetail = verify(token, process.env.JWT_SECRET_KEY);

  const freshUser = await User.findByPk(tokenDetail.id); // User or carwasher login

  if (!freshUser) {
    throw new AppError("User does not exist", 201);
  }

  // Attach User details to request
  req.user = freshUser;
  return next();
});

export default customer_authenticate;
