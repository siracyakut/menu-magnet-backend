import express from "express";
import {
  checkAuth,
  googleLogin,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.js";
import { body } from "express-validator";

const router = express.Router();

router.get("/auth", checkAuth);
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 3, max: 32 })
      .withMessage("Password can consist of minimum 3-32 characters"),
    body("passwordConfirm")
      .isLength({ min: 3, max: 32 })
      .withMessage("PasswordConfirm can consist of minimum 3-32 characters"),
  ],
  registerUser,
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 3, max: 32 })
      .withMessage("Password can consist of minimum 3-32 characters"),
  ],
  loginUser,
);
router.post(
  "/google-login",
  [body("token").isString().notEmpty()],
  googleLogin,
);
router.get("/logout", logoutUser);

export default router;
