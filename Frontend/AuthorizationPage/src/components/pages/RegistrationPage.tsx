import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegistrationForm from "../molecules/RegistrationForm";

const RegistrationPage:React.FC = () => {
  return (
    <>
        <ToastContainer />
        <RegistrationForm/>
    </>
  );
};

export default RegistrationPage;