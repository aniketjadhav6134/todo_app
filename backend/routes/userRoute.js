import express from 'express';
import { getUser, loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import requireAuth from '../middleware/requireAuth.js';
const router = express.Router();

router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.post("/register",registerUser);
router.get("/getuser", requireAuth, getUser)


export default router;