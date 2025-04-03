import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: [],
        loading: false,
    },
    reducers: {
        fetchUserRequest(state) {
            state.loading = true;
        },
        fetchAllUserSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
        },
        fetchAllUserFailed(state, action) {
            state.loading = false;
        },
        addNewAdminRequest(state) {
            state.loading = true;
        },
        addNewAdminSuccess(state, action) {
            state.loading = false;
        },
        addNewAdminFailed(state, action) {
            state.loading = false;
        },
    },
});

export const fetchAllUsers = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchUserRequest());
    await axios
        .get("http://localhost:4000/api/users", { withCredentials: true })
        .then((res) => {
            dispatch(userSlice.actions.fetchAllUserSuccess(res.data));
        })
        .catch((err) => {
            dispatch(userSlice.actions.fetchAllUserFailed(err.response.data.message)); // Fixed syntax
        });
};

export const addNewAdmin = (data) => async (dispatch) => {
    dispatch(userSlice.actions.addNewAdminRequest());
    await axios
        .post("http://localhost:4000/api/v1/user/add/new-admin", data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            dispatch(userSlice.actions.addNewAdminSuccess());
            toast.success(res.data.message);
        })
        .catch((err) => {
            dispatch(userSlice.actions.addNewAdminFailed()); // Fixed missing dispatch
            toast.error(err.response.data.message);
        });
};

export default userSlice.reducer;
