import React from "react";
import "react-toastify/dist/ReactToastify.css";
import NewPassword from "../../molecules/NewPassword/NewPassword";
import "./index.scss";

const NewpasswordPage:React.FC = () => {
  return (
    <>
      <div className="newpassword">
        <NewPassword />
      </div>
    </>
  );
};

export default NewpasswordPage;