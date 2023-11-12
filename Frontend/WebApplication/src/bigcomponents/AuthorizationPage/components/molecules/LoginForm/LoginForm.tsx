import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../../AuthorizationPage/assets/images/logo.png";
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import "./index.scss";
import api from "../../../../../config/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm: React.FC = () => {
  const user = sessionStorage.getItem("loginedUser") ? JSON.parse(sessionStorage.getItem("loginedUser")) : null;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      return;
    }

    try {
      const response = await api.post("login?username=" + username + "&password=" + password);
      if (response.status === 200) {
        const data = response.data;
        if (data.errorMessage === "User is not exist") {
          toast.error("Tên đăng nhập không có trong hệ thống. Vui lòng kiểm tra lại!");
        } else {
          if (data.errorMessage !== "Password is not correct") {
            sessionStorage.setItem('loginedUser', JSON.stringify(data.payload));
            localStorage.setItem('loginSuccessNotify', 'Đăng nhập thành công!');
            location.reload();
          } else {
            toast.error("Mật khẩu không đúng. Vui lòng nhập lại!");
          }
        }
      } else {
        console.log("Xảy ra lỗi khi nhận dữ liệu");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    navigate("/dang-ky");
  };

  useEffect(() => {
    const user = sessionStorage.getItem("loginedUser") ? JSON.parse(sessionStorage.getItem("loginedUser")) : null;
    if (user !== null) {
      navigate('/');
    }
    console.log(window.location.href);
  }, [user]);

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <img src={logo} alt="logo" />
        <div className="rectangle-border">
          <div className="inputField">
            <FontAwesomeIcon icon={faUser} className="userIcon" />
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="on"
            />
          </div>
          <div className="inputField">
            <FontAwesomeIcon icon={faLock} className="lockIcon" />
            <input
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="login-buttons">
          <button type="submit"><p>Đăng Nhập</p></button>
          <button type="button" onClick={handleRegister}>
            <p>Đăng Ký</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
