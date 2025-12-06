import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    // verify token
    //kiểm tra chữ ký số của token bằng SECRET_KEY
    // nếu hợp lệ hàm trả mã và trả về payload(dữ liệu) bên trong token
    const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    // lưu userId từ jwt token vào req.id
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
