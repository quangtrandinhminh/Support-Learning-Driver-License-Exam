import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "../molecules/ForgetPassword";
import LoginForm from "../molecules/LoginForm";
import RegistrationForm from "../molecules/RegistrationForm";
import AdminPage from "../molecules/admin";
import StaffPage from "../molecules/staff";
import UserPage from "../molecules/user";
const LoginPage: React.FC = () => {
  return (
    <><ToastContainer /><Router>
      <Routes>
        <Route
          path="/"
          element={<LoginForm
            usernameIconType="user"
            passwordIconType="lock" />} />
        <Route
          path="/register"
          element={<RegistrationForm
            usernameIconType="user"
            emailIconType="gmail"
            passwordIconType="lock"
            confirmPasswordIconType="lock" />} />
        <Route
          path="/forgotPassword"
          element={<ForgetPassword emailIconType={"gmail"} />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/staffPage" element={<StaffPage />} />
        <Route path="/userPage" element={<UserPage />} />
      </Routes>
    </Router></>
  );
};

export default LoginPage;
