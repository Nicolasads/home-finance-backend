import { Router } from "express";
import { authRateLimit } from "../middlewares/rateLimit";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post(
  "/register",
  authRateLimit,
  validate(registerSchema as never),
  authController.register,
);
router.post(
  "/login",
  authRateLimit,
  validate(loginSchema as never),
  authController.login,
);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);

export default router;
