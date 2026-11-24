import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const notFound = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  next(
    AppError.notFound(`Rota não encontrada: ${req.method} ${req.originalUrl}`),
  );
};
