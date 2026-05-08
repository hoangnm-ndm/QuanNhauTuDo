/**
 * basic: register, login, forgot password, reset password, verify email, resend verification email,
 *
 * advance: manage user profile, manage user roles and permissions, logout, refresh token, social login, account deletion, and more...
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import handleAsync from "../../common/utils/handleAsync.js";
import { User } from "../user/user.model.js";
import { configenv } from "../../common/configs/configenv.js";

export const registerAuth = handleAsync(async (req, res) => {
  /**
   * 1. Kiểm tra dữ liệu đầu vào (validation) - done
   * 2. Kiểm tra xem email đã tồn tại chưa (unique)
   * 3. Hash password trước khi lưu vào database
   * 4. Lưu thông tin người dùng vào database
   * 5. Trả về response thành công hoặc lỗi
   */

  const { email, password, name } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Email đã tồn tại",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashPassword, name });
  newUser.password = undefined; // Ẩn trường password khi trả về response

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Đăng ký thành công",
    data: newUser,
  });
});

export const loginAuth = handleAsync(async (req, res) => {
  const { email, password } = req.body;
  const existUser = await User.findOne({ email });

  if (!existUser) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Email hoặc mật khẩu không đúng",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, existUser.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Email hoặc mật khẩu không đúng",
    });
  }

  const accessToken = jwt.sign(
    { userId: existUser._id },
    configenv.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const refreshToken = jwt.sign(
    { userId: existUser._id },
    configenv.JWT_REFRESH_SECRET,
    {
      expiresIn: "15d",
    }
  );

  existUser.password = undefined; // Ẩn trường password khi trả về response

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Đăng nhập thành công",
    data: existUser,
    accessToken,
    refreshToken,
  });
});

// refreshToken...
