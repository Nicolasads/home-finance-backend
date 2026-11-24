import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { categoryController } from "../controllers/category.controller";

const router = Router();

router.use(authenticate);
router.get("/", categoryController.list);

export default router;
