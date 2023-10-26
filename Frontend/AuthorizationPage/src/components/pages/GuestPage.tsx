import React from "react";
import { Link } from "react-router-dom";

const AdminPage: React.FC = () => {
  return (
    <>
      <h1>hello guest</h1>
      <button><Link to="/login">Login</Link></button>
    </>
  );
};

export default AdminPage;
