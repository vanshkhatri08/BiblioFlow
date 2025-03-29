import express from "express";
import{ login, logout, register, updatePassword, verfiyOTP, getUser, forgotpassword, resetPassword } from "../controllers/authController.js"
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verfiyOTP);
router.post("/login", login);
router.get("/logout", isAuthenticated,logout);
router.get("/me", isAuthenticated, getUser);
router.post("/password/forgot", forgotpassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticated, updatePassword);


export default router;