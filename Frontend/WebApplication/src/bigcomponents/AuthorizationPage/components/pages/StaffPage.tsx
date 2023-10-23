import React from "react";
import { Link } from "react-router-dom";

const StaffPage: React.FC = () => {
  return (
    <>
      <h1>hello staff</h1>
      <button><Link to="/login">Logout</Link></button>
    </>
  );
};

export default StaffPage;
