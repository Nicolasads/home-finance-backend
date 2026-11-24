import { CookieOptions } from "express";

export const SESSION_COOKIE = {
  name: "hf_session",
  options: {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  } satisfies CookieOptions,
} as const;
