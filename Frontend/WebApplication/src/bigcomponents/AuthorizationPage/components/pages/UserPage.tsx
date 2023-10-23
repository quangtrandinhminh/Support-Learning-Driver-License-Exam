import React from "react";
import { Link } from "react-router-dom";

const UserPage: React.FC = () => {
  return (
    <>
      <h1>hello user</h1>
      <button><Link to="/login">Logout</Link></button>
    </>
  );
};

export default UserPage;
