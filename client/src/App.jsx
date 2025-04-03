import React, { useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import { fetchAllUsers } from "./store/slices/userSlice";

const App = () => {
  const{ user,isAuthenticated} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect (() => {
    dispatch(getUser());
    if(isAuthenticated && user.role === "Admin"){
      // console.log("THE LOGGED IN USER IS ADMIN");
      dispatch(fetchAllUsers());
    }
  },[]);
 return <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/otp-verification/:email" element={<OTP/>}/>
      <Route path="/password/reset/:token" element={<ResetPassword/>}/>
    </Routes>
    <ToastContainer theme="dark" />
  </Router>;
};

export default App;
