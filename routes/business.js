import express from "express";
import {
  createBusiness,
  getBusinessInfo,
  updateBusiness,
} from "../controllers/business.js";
import authMiddleware from "../middleware/auth.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/info",
  [body("id").isString().optional(), body("slug").isNumeric().optional()],
  getBusinessInfo,
);
router.post(
  "/create",
  authMiddleware,
  [
    body("business").isString().notEmpty(),
    body("color").isNumeric().notEmpty(),
  ],
  createBusiness,
);
router.post(
  "/update",
  authMiddleware,
  [
    body("business").isString().optional(),
    body("color").isNumeric().optional(),
  ],
  updateBusiness,
);

export default router;
