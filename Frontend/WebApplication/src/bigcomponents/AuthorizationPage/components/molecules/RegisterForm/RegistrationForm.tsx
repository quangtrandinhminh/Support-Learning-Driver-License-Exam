import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../AuthorizationPage/data/User";
import axios from "axios";
import logo from "../../../../AuthorizationPage/assets/images/logo.png";
import user from "../../../../AuthorizationPage/assets/images/userblur.svg";
import gmail from "../../../../AuthorizationPage/assets/images/gmail logo.svg";
import lock from "../../../../AuthorizationPage/assets/images/lock.svg";
import "./index.scss";

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    // check if user not input all fields
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all the fields.");
      return;
    }
    // check password is matched or not
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    //get user
    try {
      // Sử dụng axios để tải dữ liệu từ tệp JSON
      const response = await axios.get("data.json");
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

          // // Cập nhật tệp JSON với dữ liệu mới
          await axios.post("data.json", data);
          toast.success("Hello new user");

          // Xóa các trường đầu vào
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          setTimeout(() => {
            navigate("/dang-nhap");
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
      <form onSubmit={handleRegister}>
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
            <img src={gmail} alt="gmail" />
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputField">
            <img src={lock} alt="password" />
            <input
              type="password"
              placeholder="Nhập tên đăng nhập"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputField">
            <img src={lock} alt="repeatPassword" />
            <input
              type="password"
              placeholder="Nhập tên đăng nhập"
              value={password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="registration-buttons">
          <button type="submit"><p>ĐĂNG KÝ</p></button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;