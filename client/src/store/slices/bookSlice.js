import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        loading: false,
        error: null,
        message: null,
        books: [],
    },
    reducers: {
        fetchBookRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchBookSuccess(state, action) {
            state.loading = false;
            state.books = action.payload;
        },
        fetchBookFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        addBookRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addBookSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        addBookFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        resetBookSlice(state) {
            state.loading = false;
            state.error = null;
            state.message = null;
        }
    },
});

export const fetchAllBooks = () => async (dispatch) => {
    dispatch(bookSlice.actions.fetchBookRequest());
    try {
        const res = await axios.get("http://localhost:4000/api/v1/book", { 
            withCredentials: true 
        });
        dispatch(bookSlice.actions.fetchBookSuccess(res.data.books));
    } catch (err) {
        dispatch(bookSlice.actions.fetchBookFailed(err.response?.data?.message));
    }
};

export const addBook = (data) => async (dispatch) => {
    dispatch(bookSlice.actions.addBookRequest());
     await axios.post("http://localhost:4000/api/v1/book/add", data, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {

        (bookSlice.actions.addBookSuccess(res.data.message));
    toast .success(res.data.message);
        dispatch(toggleAddBookPopup());
        dispatch(fetchAllBooks());
    } catch (err) {
        dispatch(bookSlice.actions.addBookFailed(err.response?.data?.message));
    }
};

 export const resetBookSlice = () => (dispatch) => {
    dispatch(bookSlice.actions.resetBookSlice());
}; 

export default bookSlice.reducer;


