import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (e: any) {
    if (e.message === "jwt expired") {
      throw new AppError("Token Expired", 401);
    }
    throw new AppError("Invalid token", 401);
  }
}
