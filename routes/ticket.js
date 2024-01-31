import express from "express";
import { createTicket } from "../controllers/ticket.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/create",
  [
    body("title").isString().isLength({ min: 3, max: 24 }).notEmpty(),
    body("email").isEmail().notEmpty(),
    body("inoviceId").isString().isLength({ min: 32, max: 32 }).optional(),
    body("message").isString().isLength({ min: 10, max: 500 }).notEmpty(),
  ],
  createTicket,
);

export default router;
