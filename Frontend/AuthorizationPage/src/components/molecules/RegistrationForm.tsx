import React, { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../atoms/InputField";
import { useNavigate } from "react-router-dom";
import { User } from "../../../src/data/User";
import axios from "axios";
import logo from "../../assets/images/Logo.svg";
import user from "../../assets/images/userblur.svg";
import gmail from "../../assets/images/gmail logo.svg";
import lock from "../../assets/images/lock.svg";

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Sử dụng axios để tải dữ liệu từ tệp JSON
      const response = await axios.get("../../../public/data.json");
      if (response.status === 200) {
        const data = response.data;
        const userExists = data.users.some((user: User) => user.username === username);
        const emailExists = data.users.some((user: User) => user.gmail === email);

        if (userExists) {
          toast.error("Username already exists.");
        } else if (emailExists) {
          toast.error("Email already exists.");
        } else {
          // Tạo một ID mới cho người dùng
          const maxId = data.users.reduce((max: number, user: User) => (user.id > max ? user.id : max), 0);
          const newUserId = maxId + 1;

          // Thêm người dùng mới vào dữ liệu
          data.users.push({
            id: newUserId,
            username,
            gmail: email,
            password,
            phone: "null", 
            role: "user", 
          });

          // Cập nhật tệp JSON với dữ liệu mới
          await axios.post("../../../public/data.json", data);

          toast.success("Hello new user");

          // Xóa các trường đầu vào
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } else {
        toast.error("Failed to load user data.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading data");
    }
  };

  return (
    <div className="registration-form">
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
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={handleEmailChange}
          iconSrc={gmail}
        />
        <InputField
          type="password"
          placeholder="Nhập mật khẩu của bạn"
          value={password}
          onChange={handlePasswordChange}
          iconSrc={lock}
        />
        <InputField
          type="password"
          placeholder="Nhập lại mật khẩu của bạn"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          iconSrc={lock}
        />
      </div>
      <div className="registration-buttons">
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default RegistrationForm;