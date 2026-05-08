import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import handleAsync from "../../common/utils/handleAsync.js";
import { configenv } from "../../common/configs/configenv.js";
import { User } from "../users/user.model.js";

export const registerAuth = handleAsync(async (req, res) => {
  const { email, password, name } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Email đã tồn tại",
    });
  }

  const newUser = await User.create({ email, password: password, name });
  newUser.password = undefined;
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

  existUser.password = undefined;

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
