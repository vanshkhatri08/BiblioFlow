import { configureStore } from  "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popupReducer from "./slices/popUpSlice";
import userReducer from "./slices/userSlice";
import bookReducer from "./slices/bookSlice.jsx";
import borrowReducer from "./slices/borrowSlice.jsx";
export const store = configureStore ({
    reducer: {
        auth: authReducer,
        popup: popupReducer,
        user: userReducer,
        book: bookReducer,
        borrow: borrowReducer,
    },
});
