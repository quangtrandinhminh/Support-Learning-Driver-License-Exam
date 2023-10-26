import React from "react";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "../../../../AuthorizationPage/components/molecules/ForgetPassword/ForgetPassword";
import "./index.scss";

const ForgetPasswordPage: React.FC = () => {
  return (
    <>
      <div className="forgetpassword">
        <ForgetPassword />
      </div>
    </>
  );
};

export default ForgetPasswordPage;
