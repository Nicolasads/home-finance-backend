import { NextFunction, Request, Response } from "express";
import { SESSION_COOKIE } from "../constants/cookies";
import { AppError } from "../errors/AppError";
import { verifyToken } from "../utils/jwt";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const token: string | undefined = req.cookies?.[SESSION_COOKIE.name];

  if (!token) {
    next(AppError.unauthorized());

    return;
  }

  try {
    req.user = { id: verifyToken(token).sub ?? "" };

    next();
  } catch {
    next(AppError.unauthorized("Sessão inválida ou expirada"));
  }
};
