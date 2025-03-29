import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errormiddlewares.js";
import { Borrow } from "../models/borrowModel.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
import { calculateFine } from "../utils/fineCalculator.js";

export const borrowedBooks = catchAsyncErrors(async(req, res, next)=>{
    const {id} = req.params; 
    const {email} = req.body; 

    const book = await Book.findById(id);
    if(!book){
        return next(new ErrorHandler("Book not found.", 404));
    }
    const user = await User.findOne({ email, accountVerified: true });
    if(!user){
        return next(new ErrorHandler("User not found.", 404));
    }
    if(book.quanity == 0){
        return next(new ErrorHandler("Book not available.", 404));
    }
    const isAlreadyBorrowed = user.borrowBooks.find(
        (b) => b.bookId.toString() === id && b.returned == false
    );
    if(isAlreadyBorrowed){
        return next(new ErrorHandler("Book already borrowed.", 400));
    }
    book.quanity -= 1;
    book.availability = book.quanity > 0;
    await book.save();

    user.borrowedBooks.push({
        bookId: book._id,
        booktitle: book.title,
        borrowedDate: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        price: book.price,
    });
    res.status(200).json({
        success: true,
        message: "Borrowed book recorded successfully.",
    });
});

export const recordborrowedBook = catchAsyncErrors(async(req, res, next)=>{
    const {bookId}= req.params;
    const {email} = req.body;
    const book = await Book.findById(bookId);

    if(!book){
        return next(new ErrorHandler("Book not found.", 404));
    }
    const user = await User.findOne({ email, accountVerified: true });
    if(!user){
        return next(new ErrorHandler("User not found.", 404));
    }
    const borrowedBook = user.borrowedBooks.find(
        (b) => b.bookId.toString() === id && b.returned == false
    );
    if(!borrowedBook){
        return next(new ErrorHandler("You have not borrowed this book.", 400));
    }
    borrowedBook.returned = true;
    await user.save();

    book.quanity += 1;
    book.availability = book.quanity > 0;
    await book.save();

    const borrow = await Borrow.findOne({
        book:bookId,
        "user.email": email,
        returnDate: null,
    });
    if(!borrow){
        return next(new ErrorHandler("You have not borrowed this Book.", 400));
    };
    borrow.returnDate = new Date();
    const find = calculateFine(borrow.dueDate);
    borrow.findOne = fine;
    await borrow.save();
    res.status(200).json({
        success: true,
        message: fine !== 0
        ? `The book has been returned successfully. The total charges, including a fine are $${
            fine + book.price 
        }`
        : `The book has been returned successfully. The total charges are $${book.price}`,
    })
});

export const getborrowedBooksforAdmin = catchAsyncErrors(async(req, res, next)=>{
    const { borrowedBooks } = await Borrow.find();
    res.status(200).json({
        success: true,
        borrowedBooks,
    });
  }
);

export const returnborrowedBook = catchAsyncErrors(async(req, res, next)=>{})