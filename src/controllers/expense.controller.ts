import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { expenseService } from "../services/expense.service";
import { getValidatedInput } from "../middlewares/validate";

export const expenseController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const { query } = getValidatedInput(res);
    const expenses = await expenseService.list(req.user!.id, {
      month: query?.month as string | undefined,
    });

    res.json(expenses);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const expense = await expenseService.create(req.user!.id, req.body);

    res.status(201).json(expense);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const expense = await expenseService.update(
      req.user!.id,
      Array.isArray(req.params.id)
        ? (req.params!.id[0] ?? "")
        : (req.params.id ?? ""),
      req.body,
    );

    res.json(expense);
  }),

  togglePaid: asyncHandler(async (req: Request, res: Response) => {
    const expenses = await expenseService.togglePaid(
      req.user!.id ?? "",
      Array.isArray(req.params.id)
        ? (req.params!.id[0] ?? "")
        : (req.params.id ?? ""),
    );

    res.json(expenses);
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await expenseService.remove(
      req.user!.id,
      Array.isArray(req.params.id)
        ? (req.params.id[0] ?? "")
        : (req.params.id ?? ""),
    );

    res.status(204).end();
  }),
};
