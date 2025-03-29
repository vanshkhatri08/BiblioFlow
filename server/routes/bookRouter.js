import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";
import { addBook,
     deleteBook,
      getAllBooks
     } from "../controllers/bookcontroller.js"; 

import express from "express";

const router = express.Router();

router.post("/admin/add", isAuthorized("Admin"), addBook);
router.get("/all", isAuthenticated, getAllBooks);
router.delete( 
    "/delete/:id", 
    isAuthenticated, 
    isAuthorized("Admin"), 
    deleteBook
);

export default router;