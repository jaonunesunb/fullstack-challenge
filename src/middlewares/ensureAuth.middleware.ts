import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

export const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Invalid token", 401);
  }

  token = token.split(" ")[1];

  try {
    const decodedToken: any = jwt.verify(token, String(process.env.SECRET_KEY));

    req.user = {
      id: decodedToken.id,
      email: decodedToken.email,
      name: decodedToken.name,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
};