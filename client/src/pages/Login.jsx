import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import whiteLogo from "../assets/white-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetAuthSlice } from "../store/slices/authSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, message, error, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    dispatch(login(data));
  };

  useEffect(() => {
    // if(message){
    //   toast.success(message);
    //   dispatch(resetAuthSlice());
    // }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, message, navigate]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* Left side */}
        <div
          className="hidden w-full md:w-1/2 bg-black
    text-white md:flex flex-col items-center justify-center
    p-8 rounded-tr-[80px] rounded-br-[80px]
    "
        >
          <div className="text-center h-[376px]">
            <div className="flex justify-center">
              <img src={whiteLogo} alt="logo" className="mb-12 " />
            </div>
            <h2 className="text-gray-300 mb-12 text-3xl">Biblio Flow</h2>
            <p className="text-gray-300 mb-12">
              New to our platform? Sign Up Now
            </p>
            <Link
              to={"/register"}
              className="border-2 rounded-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-black transition"
            >
              SIGN UP
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
                <h3 className="font-medium text-4xl overflow-hidden">
                  Sign In
                </h3>
                <img
                  src={logo}
                  alt="logo"
                  className="h-auto w-24 object cover"
                />
              </div>
            </div>
            <p className="text-gray-800 text-center mb-12">
              Please enter your credentials to login
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>
              <div className="mb-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
                <div className="mb-2 mt-2">
                  <input
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="OTP"
                    className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                  />
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="font-semibold text-black mb-12"
              >
                Forgot Password?
              </Link>
              <div className="block md:hidden font-semibold mt-5">
                <p>
                  New to our Platform?
                  <Link
                    to={"/register"}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
