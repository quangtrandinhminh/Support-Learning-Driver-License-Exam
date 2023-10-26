import React from "react";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "../../molecules/ForgetPassword/ForgetPassword";
import "./index.scss"

const ForgetPasswordPage: React.FC = () => {
  return (
    <>
        <div className="forgetpassword-page">
          <ForgetPassword />
        </div> 
    </>
  );
};

export default ForgetPasswordPage;