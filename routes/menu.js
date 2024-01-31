import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createMenu,
  deleteMenu,
  getMenus,
  updateMenu,
} from "../controllers/menu.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/get", [body("businessId").isString().notEmpty()], getMenus);
router.post(
  "/create",
  authMiddleware,
  [
    body("name").isString().notEmpty(),
    body("description").isString().notEmpty(),
    body("price").isNumeric().notEmpty(),
    body("categoryId").isString().notEmpty(),
  ],
  createMenu,
);
router.post(
  "/update",
  authMiddleware,
  [
    body("id").isString().notEmpty(),
    body("name").isString().notEmpty(),
    body("description").isString().notEmpty(),
    body("price").isNumeric().notEmpty(),
    body("categoryId").isString().notEmpty(),
  ],
  updateMenu,
);
router.post(
  "/delete",
  authMiddleware,
  [body("id").isString().notEmpty()],
  deleteMenu,
);

export default router;
