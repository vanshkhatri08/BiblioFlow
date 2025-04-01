import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        books: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchBooksRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchBooksSuccess(state, action) {
            state.loading = false;
            state.books = action.payload;
        },
        fetchBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchBooksRequest, fetchBooksSuccess, fetchBooksFailed } = bookSlice.actions;
export default bookSlice.reducer;
