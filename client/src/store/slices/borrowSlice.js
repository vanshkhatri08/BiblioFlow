import { createSlice } from "@reduxjs/toolkit";

const borrowSlice = createSlice({
    name: "borrow",
    initialState: {
        borrowedBooks: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchBorrowedBooksRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchBorrowedBooksSuccess(state, action) {
            state.loading = false;
            state.borrowedBooks = action.payload;
        },
        fetchBorrowedBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchBorrowedBooksRequest, fetchBorrowedBooksSuccess, fetchBorrowedBooksFailed } = borrowSlice.actions;
export default borrowSlice.reducer;
