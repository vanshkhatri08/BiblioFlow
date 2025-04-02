import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = "http://localhost:5000/api/v1";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading: false,
        error: null,
        message: null,
        user: null,
        isAuthenticated: false,
    },
    reducers:{
        registerRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        registerSuccess(state, action){
            state.loading = false;
            state.message = action.payload.message;
        },
        registerFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        otpVerificationRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        otpVerificationSuccess(state, action){
            state.loading =false;
            state.message = action.payload.message;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        otpVerificationFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        loginRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        loginSuccess(state, action){
            state.loading =false;
            state.message = action.payload.message;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        loginFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        logoutRequest(state){
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        logoutSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },
        logoutFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        getUserRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        getUserSuccess(state, action){
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        getUserFailed(state){
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        },

        forgotPasswordRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotPasswordSuccess(state, action){
            state.loading = false;
            state.message = action.payload.message;
        },
        forgotPasswordFailed(state){
            state.loading = false;
            state.error = action.payload;
        },
        
        resetPasswordRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetPasswordSuccess(state, action){
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        resetPasswordFailed(state , action){
            state.loading = false;
            state.error = action.payload;
        },

        updatePasswordRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updatePasswordSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
        },
        updatePasswordFailed(state , action){
            state.loading = false;
            state.error = action.payload;
        },

        resetAuthSlice(state){
            state.error = null;
            state.loading = false;
            state.message = null;
            state.user = state.user;
            state.isAuthenticated = state.isAuthenticated;
        },
    },
});     

export const resetAuthSlice = () => (dispatch) => {
    dispatch(authSlice.actions.resetAuthSlice())
}

export const  registerUser = (data) => async(dispatch) =>{
    dispatch(authSlice.actions.registerRequest());
    await axios
    .post(`${BASE_API_URL}/auth/register`, data,{
        withCredentials: true,
        headers: {
            "content-Type": "application/json",
        },
    })
    .then((res)=>{
        dispatch(authSlice.actions.registerSuccess(res.data))
    })
    .catch((error) => {
        const errorMessage = error.response?.data?.message || "Server unavailable. Please try again later.";
        dispatch(authSlice.actions.registerFailed(errorMessage));
    });
};

export const  otpVerification = (email, otp) => async(dispatch) =>{
    dispatch(authSlice.actions.otpVerificationRequest());
    await axios
    .post(`${BASE_API_URL}/auth/verify-otp`, {email, otp},{
        withCredentials: true,
        headers: {
            "content-Type": "application/json",
        },
    })
    .then((res)=>{
        dispatch(authSlice.actions.otpVerificationSuccess(res.data));
    })
    .catch((error) => {
        const errorMessage = error.response?.data?.message || "Server unavailable. Please try again later.";
        dispatch(authSlice.actions.otpVerificationFailed(errorMessage));
    });
};

export const  login = (data) => async(dispatch) =>{
    dispatch(authSlice.actions.loginRequest());
    await axios
    .post(`${BASE_API_URL}/auth/login`,
            data, 
        {
        withCredentials: true,
        headers: {
            "content-Type": "application/json",
        },
    })
    .then((res)=>{
        dispatch(authSlice.actions.loginSuccess(res.data));
    })
    .catch((error) => {
        const errorMessage = error.response?.data?.message || "Server unavailable. Please try again later.";
        dispatch(authSlice.actions.loginFailed(errorMessage));
    });
};

export const  logout = () => async(dispatch) =>{
    dispatch(authSlice.actions.logoutRequest());
    await axios
    .get(`${BASE_API_URL}/auth/logout`, {
        withCredentials: true,
    })
    .then((res)=>{
        dispatch(authSlice.actions.logoutSuccess(res.data.message));
        dispatch(authSlice.actions.resetAuthSlice());
    })
    .catch((error) => {
        const errorMessage = error.response?.data?.message || "Server unavailable. Please try again later.";
        dispatch(authSlice.actions.logoutFailed(errorMessage));
    });
};

export const  getUser = () => async(dispatch) =>{
    dispatch(authSlice.actions.getUserRequest());
    await axios
    .get(`${BASE_API_URL}/auth/me`, {
        withCredentials: true,
    })
    .then((res)=>{
        dispatch(authSlice.actions.getUserSuccess(res.data));
    })
    .catch((error) => {
        const errorMessage = error.response?.data?.message || "Server unavailable. Please try again later.";
        dispatch(authSlice.actions.getUserFailed(errorMessage));
    });
};

export const  forgotPassword = (email) => async(dispatch) =>{
    dispatch(authSlice.actions.forgotPasswordRequest());
    await axios
    .post(`${BASE_API_URL}/auth/password/forgot`, {email}, 
        {
        withCredentials: true,
        headers: {
            "content-Type": "application/json",
        },
    })
    .then((res)=>{
        dispatch(authSlice.actions.forgotPasswordSuccess(res.data));
    })
    .catch((error) => {
        const errorMessage = error.response?.data?.message || "Server unavailable. Please try again later.";
        dispatch(authSlice.actions.forgotPasswordFailed(errorMessage));
    });
};

export const  resetPassword = (data, token) => async(dispatch) =>{
    dispatch(authSlice.actions.resetPasswordRequest());
    await axios
    .put(`${BASE_API_URL}/auth/password/reset/${token}`, 
        data, 
        {
        withCredentials: true,
        headers: {
            "content-Type": "application/json",
        },
    })
    .then((res)=>{
        dispatch(authSlice.actions.resetPasswordSuccess(res.data));
    })
    .catch((error) => {
        const errorMessage = error.response?.data?.message || "Server unavailable. Please try again later.";
        dispatch(authSlice.actions.resetPasswordFailed(errorMessage));
    });
};

export const  updatePassword = (data) => async(dispatch) =>{
    dispatch(authSlice.actions.updatePasswordRequest());
    await axios
    .put(`${BASE_API_URL}/auth/password/update`, 
        data, 
        {
        withCredentials: true,
        headers: {
            "content-Type": "application/json",
        },
    })
    .then((res)=>{
        dispatch(authSlice.actions.updatePasswordSuccess(res.data.message));
    })
    .catch((error) => {
        const errorMessage = error.response?.data?.message || "Server unavailable. Please try again later.";
        dispatch(authSlice.actions.updatePasswordFailed(errorMessage));
    });
};

export default authSlice.reducer; 