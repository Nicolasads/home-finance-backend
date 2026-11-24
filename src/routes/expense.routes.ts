import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { validate } from "../middlewares/validate";
import {
  createExpenseSchema,
  expenseIdSchema,
  listExpenseSchema,
  updateExpenseSchema,
} from "../validators/expense.validator";
import { expenseController } from "../controllers/expense.controller";

const router = Router();

router.use(authenticate);

router.get("/", validate(listExpenseSchema as never), expenseController.list);
router.post(
  "/",
  validate(createExpenseSchema as never),
  expenseController.create,
);
router.put(
  "/:id",
  validate(updateExpenseSchema as never),
  expenseController.update,
);
router.patch(
  "/:id/toggle-paid",
  validate(expenseIdSchema as never),
  expenseController.togglePaid,
);
router.delete(
  "/:id",
  validate(expenseIdSchema as never),
  expenseController.remove,
);

export default router;
