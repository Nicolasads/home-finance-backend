import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { env } from "../config/env";

interface PrismaLikeError {
  code?: string;
}

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json({ message: err.message, details: err.details });

    return;
  }

  if ((err as PrismaLikeError).code === "P2002") {
    res.status(409).json({ message: "Registro já existe" });

    return;
  }

  if (env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(500).json({ message: "Erro interno do servidor" });
};
