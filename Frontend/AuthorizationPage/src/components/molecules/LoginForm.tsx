import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom"; // Sử dụng useNavigate để điều hướng
import Logo from "../atoms/Logo";
import InputField from "../atoms/InputField";
import { User, fetchData } from "../../services/dataFetcher";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginFormProps {
  usernameIconType: "user";
  passwordIconType: "lock";
}

const LoginForm: React.FC<LoginFormProps> = ({
  usernameIconType,
  passwordIconType,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

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
      // Sử dụng fetchData để tải dữ liệu từ tệp JSON
      const data = await fetchData<{ users: User[] }>("../../../public/data.json");

      // Kiểm tra nếu data không phải là mảng hoặc mảng rỗng
      if (!Array.isArray(data.users) || data.users.length === 0) {
        toast.error("No user data found.");
        return;
      }

      const user = data.users.find(
        (user) =>
          user.username === username &&
          user.password === password
      );

      if (user) {
        if (user.role === "admin") {
          toast.success("Welcome admin");
             navigate("/adminPage"); // Điều hướng đến trang adminPage
        } else if (user.role === "staff") {
          toast.success("Welcome staff");
            navigate("/staffPage"); // Điều hướng đến trang staffPage
        } else {
          toast.success("Hello user");
            navigate("/userPage"); // Điều hướng đến trang userPage
        }
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading data");
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Điều hướng đến trang đăng ký
  };

  return (
    <div className="login-form">
      <Logo src="/images/Logo.svg" alt="logo" />
      <div className="rectangle-border">
        <InputField
          type="text"
          placeholder={`Nhập tên đăng nhập`}
          value={username}
          onChange={handleUsernameChange}
          iconType={usernameIconType}
        />
        <InputField
          type="password"
          placeholder={`Nhập mật khẩu của bạn`}
          value={password}
          onChange={handlePasswordChange}
          iconType={passwordIconType}
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
      <a href="/forgotPassword">Forgot your password?</a>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default LoginForm;
