import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { categoryService } from "../services/category.service";

export const categoryController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const categories = await categoryService.list(req.user?.id ?? "");

    res.json(categories);
  }),
};
