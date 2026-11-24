import { Request, Response } from "express";
import { SESSION_COOKIE } from "../constants/cookies";
import { asyncHandler } from "../utils/asyncHandler";
import { authService } from "../services/auth.service";
import { getValidatedInput } from "../middlewares/validate";

const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const setSessionCookie = (res: Response, token: string) => {
  res.cookie(SESSION_COOKIE.name, token, {
    ...SESSION_COOKIE.options,
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_MS,
  });
};

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const { user, token } = await authService.register(req.body);

    setSessionCookie(res, token);
    res.status(201).json({ user });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { user, token } = await authService.login(req.body);

    setSessionCookie(res, token);
    res.status(201).json({ user });
  }),

  logout: (_req: Request, res: Response) => {
    res.clearCookie(SESSION_COOKIE.name, SESSION_COOKIE.options);
    res.status(204).end();
  },

  me: asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.getSessionUser(req.user!.id);
    res.json({ user });
  }),
};
