import express from "express";
import {
  createBusiness,
  getBusinessInfo,
  updateBusiness,
} from "../controllers/business.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/info", getBusinessInfo);
router.post("/create", authMiddleware, createBusiness);
router.post("/update", authMiddleware, updateBusiness);

export default router;
