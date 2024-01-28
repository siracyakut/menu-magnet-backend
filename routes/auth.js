import express from "express";
import {
  checkAuth,
  googleLogin,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.js";

const router = express.Router();

router.get("/auth", checkAuth);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.get("/logout", logoutUser);

export default router;
