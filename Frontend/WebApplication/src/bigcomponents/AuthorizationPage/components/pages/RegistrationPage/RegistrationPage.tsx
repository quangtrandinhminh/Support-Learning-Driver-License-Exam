import React from "react";
import "react-toastify/dist/ReactToastify.css";
import RegistrationForm from "../../molecules/RegisterForm/RegistrationForm";
import "./index.scss";

const RegistrationPage: React.FC = () => {
  return (
    <>
      <div className="registration">
        <RegistrationForm />
      </div>
    </>
  );
};

export default RegistrationPage;
