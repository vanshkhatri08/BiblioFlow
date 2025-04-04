import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { toggleRecordBookPopup } from './popUpSlice';

const borrowSlice = createSlice({
    name: 'borrow',
    initialState: {
        loading: false,
        error: null,
        userBorrowbooks: [],
        allBorrowedBooks: [],
        message: null,
    },
    reducers: {
        fetchUsersBorrowedBooksRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchUsersBorrowedBooksSuccess(state, action) {
            state.loading = false;
            state.userBorrowbooks = action.payload;
        },
        fetchUsersBorrowedBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        recordBookRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        recordBookSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        recordBookFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        fetchAllBorrowedBooksRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchAllBorrowedBooksSuccess(state, action) {
            state.loading = false;
            state.allBorrowedBooks = action.payload;
        },
        fetchAllBorrowedBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        returnBookRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        returnBookSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        returnBookFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetBorrowSlice(state) {
            state.loading = false;
            state.error = null;
            state.message = null;
        },
    },
});

export const fetchUsersBorrowedBooks = () => async (dispatch) => {
    dispatch(borrowSlice.actions.fetchUsersBorrowedBooksRequest());
    try {
        const res = await axios.get("http://localhost:4000/api/v1/borrow/user", { 
            withCredentials: true 
        });
        dispatch(borrowSlice.actions.fetchUsersBorrowedBooksSuccess(res.data.borrowedBooks));
    } catch (err) {
        dispatch(borrowSlice.actions.fetchUsersBorrowedBooksFailed(err.response?.data?.message));
    }
};

export const fetchAllBorrowedBooks = () => async (dispatch) => {
    dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest());
    try {
        const res = await axios.get("http://localhost:4000/api/v1/borrow/all", { 
            withCredentials: true 
        });
        dispatch(borrowSlice.actions.fetchAllBorrowedBooksSuccess(res.data.borrowedBooks));
    } catch (err) {
        dispatch(borrowSlice.actions.fetchAllBorrowedBooksFailed(err.response?.data?.message));
    }
};

export const recordBook = (email, id) => async (dispatch) => {
    dispatch(borrowSlice.actions.recordBookRequest());

    await axios.post(
            "http://localhost:4000/api/v1/borrow",
            { email, id },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                },
            }
        ).then((res) => {
        dispatch(borrowSlice.actions.recordBookSuccess(res.data.message));
        dispatch(toggleRecordBookPopup());
    } catch (err) {
        dispatch(borrowSlice.actions.recordBookFailed(err.response?.data?.message));
    }
};

export const returnBook = (email, id) => async (dispatch) => {
    dispatch(borrowSlice.actions.returnBookRequest());
    try {
        const res = await axios.put(
            "http://localhost:4000/api/v1/borrow/return",
            { email, id },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );
        dispatch(borrowSlice.actions.returnBookSuccess(res.data.message));
    } catch (err) {
        dispatch(borrowSlice.actions.returnBookFailed(err.response?.data?.message));
    }
};

export const resetBorrowSlice = () => (dispatch) => {
    dispatch(borrowSlice.actions.resetBorrowSlice());
};

export default borrowSlice.reducer;
    



