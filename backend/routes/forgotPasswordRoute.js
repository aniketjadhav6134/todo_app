import express from "express";
import { forgotPassword, resetPassword } from "../controllers/passwordController.js";
forgotPassword
const router = express.Router();
router.post("/forgotPassword", forgotPassword)
router.post("/resetPassword", resetPassword)

export default router;