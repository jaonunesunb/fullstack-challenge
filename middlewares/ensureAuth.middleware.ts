import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

export const ensureAuthMiddleware = async (
  req: Request & { client: { id: number } },
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Invalid token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, String(process.env.SECRET_KEY), (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      id: decoded.sub as string,
      email: decoded.email as string,
    };

    req.client = { id: decoded.clientId as number };

    return next();
  });
};