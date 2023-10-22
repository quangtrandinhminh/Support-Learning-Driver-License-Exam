import React from "react";
import { Link } from "react-router-dom";

const AdminPage: React.FC = () => {
  return (
    <>
      <h1>hello admin</h1>
      <button><Link to="/login">Logout</Link></button>
    </>
  );
};

export default AdminPage;
