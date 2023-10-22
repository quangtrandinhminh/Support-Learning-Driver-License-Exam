import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../atoms/InputField";
import axios from "axios"; // Import axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/Logo.svg";
import user from "../../assets/images/userblur.svg";
import lock from "../../assets/images/lock.svg";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    try {
      // Sử dụng axios để tải dữ liệu từ tệp JSON
      const response = await axios.get("data.json");
      if (response.status === 200) {
        const data = response.data;
        const user = data.users.find(
          (user: { username: string; password: string; }) =>
            user.username === username &&
            user.password === password
        );
        if (user) {
          if (user.role === "admin") {
            toast.success("Welcome admin");
            setTimeout(() => {
              navigate("/adminPage");
            }, 2000);
          } else if (user.role === "staff") {
            toast.success("Welcome staff");
            setTimeout(() => {
              navigate("/staffPage");
            }, 2000);
          } else {
            toast.success("Hello user");
            setTimeout(() => {
              navigate("/userPage");
            }, 2000);
          }
        } else {
          toast.error("Invalid username or password");
        }
      } else {
        toast.error("Failed to load user data.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading data");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-form">
      <img src={logo} alt="logo" />
      <div className="rectangle-border">
        <InputField
          type="text"
          placeholder="Nhập tên đăng nhập"
          value={username}
          onChange={handleUsernameChange}
          iconSrc={user}
        />
        <InputField
          type="password"
          placeholder="Nhập mật khẩu của bạn"
          value={password}
          onChange={handlePasswordChange}
          iconSrc={lock}
        />
      </div>
      <div className="login-buttons">
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </div>
      <Link to="/forgotPassword">Forgot your password?</Link>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default LoginForm;
