<<<<<<< HEAD
import { configureStore } from  "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popupReducer from "./slices/popUpSlice";

export const store = configureStore ({
    reducer: {
        auth: authReducer,
        popup: popupReducer,
=======
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popupReducer from "./slices/popUpSlice";
import userReducer from "./slices/userSlice";
import borrowReducer from "./slices/borrowSlice";
import bookReducer from "./slices/bookSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        popup: popupReducer,
        user: userReducer,
        borrow: borrowReducer,
        book: bookReducer,
>>>>>>> e438ebd2bbb360a6da3f818d76aa7dcb2f501de6
    },
});