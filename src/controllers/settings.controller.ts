import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { settingsService } from "../services/settings.service";

export const settingsController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json(await settingsService.get(req.user.id));
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json(await settingsService.update(req.user?.id, req.body));
  }),
};
