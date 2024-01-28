import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createMenu,
  deleteMenu,
  getMenus,
  updateMenu,
} from "../controllers/menu.js";

const router = express.Router();

router.post("/get", getMenus);
router.post("/create", authMiddleware, createMenu);
router.post("/update", authMiddleware, updateMenu);
router.post("/delete", authMiddleware, deleteMenu);

export default router;
