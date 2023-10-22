import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../molecules/LoginForm";
const LoginPage: React.FC = () => {
  return (
    <>
      <ToastContainer />
          <LoginForm/>
    </>
  );
};

export default LoginPage;
