import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/images/logo.svg";
import Lock from "../../../assets/images/lock.svg";
import user from "../../../assets/images/userblur.svg";
import "./index.scss"

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    try {
      // Sử dụng axios để tải dữ liệu từ tệp JSON
      const response = await axios.post("https://localhost:7240/login?username=" + username);
      if (response.status === 200) {
        const data = response.data;
        const user = Object.assign(data);
        if (data.payload == null) {
          toast.error("Tên đăng nhập không có trong hệ thống. Vui lòng kiểm tra lại!");
          return;
        } else {
          if (user) {
            if (user.roleId === "admin") {
              toast.success("Welcome admin");
            } else if (user.roleId === "staff") {
              toast.success("Welcome staff");
            } else {
              toast.success("Hello user");
            }
          } else {
            toast.error("Invalid username or password");
          }
        }
      } else {
        toast.error("Failed to load user data.");
      }
    } catch (error) {
      toast.error("Error loading data");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <img src={logo} alt="logo" />
        <div className="rectangle-border">
          <div className="inputField">
            <img src={user} alt="user" />
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="inputField">
            <img src={Lock} alt="lock" />
            <input
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="login-buttons">
          <button type="submit">Login</button>
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </div>
        <Link to="/forgotPassword">Forgot your password?</Link>
      </form>
    </div>
  );
};

export default LoginForm;
