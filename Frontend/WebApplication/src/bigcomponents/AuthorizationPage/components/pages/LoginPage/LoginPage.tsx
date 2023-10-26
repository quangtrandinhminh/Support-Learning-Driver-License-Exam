import React from "react";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../../molecules/LoginForm/LoginForm";
import "./index.scss";

const LoginPage: React.FC = () => {
  return (
    <>
      <div className="login-page">
          <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
