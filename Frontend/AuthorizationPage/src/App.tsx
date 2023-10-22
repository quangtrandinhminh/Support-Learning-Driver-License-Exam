import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import ForgetPasswordPage from "./components/pages/ForgetPasswordPage";
import AdminPage from "./components/pages/AdminPage";
import StaffPage from "./components/pages/StaffPage";
import UserPage from "./components/pages/UserPage";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegistrationPage />}/>
        <Route path="/forgotPassword" element={<ForgetPasswordPage />}/>
        <Route path="/adminPage" element={<AdminPage />}/>
        <Route path="/staffPage" element={<StaffPage />}/>
        <Route path="/userPage" element={<UserPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
