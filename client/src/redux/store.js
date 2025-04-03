import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bookReducer from "./slices/bookSlice";
import borrowReducer from "./slices/borrowSlice";
import popUpReducer from "./slices/popUpSlice";
import userReducer from "./slices/userSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    popUp: popUpReducer,
    user: userReducer,
    book: bookReducer,
    borrow: borrowReducer,
  },
}); 