import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "../molecules/ForgetPassword";

const ForgetPasswordPage: React.FC = () => {
  return (
    <>
        <ToastContainer />
        <ForgetPassword />
    </>
  );
};

export default ForgetPasswordPage;