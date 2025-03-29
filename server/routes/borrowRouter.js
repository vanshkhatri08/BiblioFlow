import express from "express";
import { 
    borrowedBooks,
    getborrowedBooksforAdmin,
    recordborrowedBook,
    returnborrowedBook,
 } from "../controllers/borrowControllers.js";

 import { isAuthenticated , isAuthorized } from "../middlewares/authMiddleware.js";

 const router = express.Router();

 router.post(
    "/record-borrow-book/:id",
    isAuthenticated,
    isAuthorized("Admin"), 
    recordborrowedBook
    );

 router.get(
    "/borrowed-books-by-users", 
    isAuthenticated, 
    isAuthorized("Admin"), 
    getborrowedBooksforAdmin
    );

router.get(
    "/my-borrowed-books", 
    isAuthenticated,  
    borrowedBooks
    );

router.put("/return-borrowed-book/:bookId", 
    isAuthenticated, 
    isAuthorized("Admin"), 
    returnborrowedBook
    );

export default router;
    