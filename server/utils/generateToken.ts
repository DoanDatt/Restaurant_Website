import { Response } from "express";
import { IUserDocument } from "../models/user.model";
import jwt from "jsonwebtoken";

export const generateToken = (res: Response, user: IUserDocument) => {
  // payload: dữ liệu được mã hóa vào token,
  // secret: khóa bí mật để khóa token,
  //option: token hết hạn sau 1 ngày
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });
  // LƯU TOKEN VÀO COOKIE
  //httpOnly: bảo mật cao
  //sameSite("strict"): chống csrf
  //maxAge: Cookie tư động xóa sau 24h
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};
