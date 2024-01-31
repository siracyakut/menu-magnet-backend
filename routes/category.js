import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.js";
import authMiddleware from "../middleware/auth.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/get", [body("businessId").isString().notEmpty()], getCategories);
router.post(
  "/create",
  authMiddleware,
  [
    body("name").isString().notEmpty(),
    body("description").isString().notEmpty(),
    body("icon").isNumeric().notEmpty(),
  ],
  createCategory,
);
router.post(
  "/update",
  authMiddleware,
  [
    body("id").isString().notEmpty(),
    body("name").isString().notEmpty(),
    body("description").isString().notEmpty(),
    body("icon").isNumeric().notEmpty(),
  ],
  updateCategory,
);
router.post(
  "/delete",
  authMiddleware,
  [body("id").isString().notEmpty()],
  deleteCategory,
);

export default router;
