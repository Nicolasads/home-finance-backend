import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod/v3";
import { AppError } from "../errors/AppError";

export interface ValidatedInput {
  body?: unknown;
  params?: Record<string, string>;
  query?: Record<string, unknown>;
}

export const validate =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.slice(1).join("."),
        message: issue.message,
      }));

      next(new AppError("Dados inválidos", 400, details));

      return;
    }

    const data = result.data as ValidatedInput;

    res.locals.input = data;
    if (data.body !== undefined) req.body = data.body;
    next();
  };

//Helper para os controllers lerem o response já validado
export const getValidatedInput = (res: Response) =>
  res.locals.input as ValidatedInput;
