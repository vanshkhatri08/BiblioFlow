import express from "express";
import{
    getAllUsers,
    registerNewAdmin,
} from "../controllers/userController.js";
import { isAuthenticated  } from "../middlewares/authMiddleware.js";
import { isAuthorized } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/all", isAuthenticated, isAuthorized("Admin"), getAllUsers);
router.post("/add/new-admin", isAuthenticated, isAuthorized, isAuthorized("Admin"), registerNewAdmin);

export default  router; 