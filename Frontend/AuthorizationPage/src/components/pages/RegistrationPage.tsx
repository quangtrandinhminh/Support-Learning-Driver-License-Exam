import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "../molecules/RegistrationForm";

const RegistrationPage:React.FC = () => {
  return (
    <>
        <ToastContainer />
        <RegisterForm/>
    </>
  );
};

export default RegistrationPage;
