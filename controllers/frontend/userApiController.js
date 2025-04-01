import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import db from "../../config/db.js";
import sequelize from "../../config/database.js";
import { generateToken } from "../../helpers/jwt_helper.js";
import { body, validationResult } from "express-validator";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { compare } from "bcrypt";
import bcrypt from "bcrypt";
import User from "../../db/models/user.js";
import jwt from "jsonwebtoken";

// POST user create
const create_user = catchAsync(async (req, res) => {
  // Apply validation rules

  //   console.log(req.body);
  await Promise.all([
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .run(req),

    body("password").notEmpty().withMessage("Password is required").run(req),
  ]);

  // Handle validation result
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error_message = errors.array()[0].msg;
    throw new AppError(error_message, 422, errors);
  }

  const { name, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    let creation = await User.create({
      name: name.toLowerCase(),
      status: "1",
      password: hashPassword,
    });

    if (creation) {
      const token = generateToken({
        id: creation.id,
      });

      return res.status(200).json({
        status: true,
        message: "user create successfully",
        token: token,
      });
    } else {
      res.status(200).json({
        code: 5,
        status: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    // Handle errors
    throw new AppError(err.message, 422, errors);
  }
});

// POST user Login
const Login = catchAsync(async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw AppError("Please provide name and password", 400);
  } else {
    const result = await User.findOne({
      where: { name: name.toLowerCase() },
    });

    if (!result || !(await compare(password, result.password))) {
      throw new AppError("Invalid Credentials", 400);
    } else {
      if (result.status != 1) {
        throw new AppError("Sorry, User is Inactivated", 400);
      }

      const token = generateToken({
        id: result.id,
      });

      // Store JWT token in session
      req.session.token = token;
      req.session.user_id = result.id;

      return res.status(200).json({
        status: true,
        message: "Logged in successfully",
        token: token,
      });
    }
  }
});

// POST user Logout

export { create_user, Login };
