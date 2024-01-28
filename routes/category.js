import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/get", getCategories);
router.post("/create", authMiddleware, createCategory);
router.post("/update", authMiddleware, updateCategory);
router.post("/delete", authMiddleware, deleteCategory);

export default router;
