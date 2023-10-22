import React from "react";
import LoginPageComponent from "./components/organisms/LoginPage";
import { Routes, Route } from "react-router-dom";
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPageComponent />} />
      </Routes>
    </>
  );
};

export default App;
