import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../assets/images/Logo.svg";
import gmail from "../../assets/images/gmail logo.svg";
import "./index.scss";

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      // Sử dụng axios để tải dữ liệu từ tệp JSON
      const response = await axios.get("data.json");
      const data = response.data;

      // Kiểm tra nếu data không phải là mảng hoặc mảng rỗng
      if (!Array.isArray(data.users) || data.users.length === 0) {
        toast.error("No user data found.");
        return;
      }

      const user = data.users.find(
        (user: { gmail: string }) => user.gmail === email
      );

      if (user) {
        // Tạo mã xác nhận ngẫu nhiên
        const confirmationCode = Math.random().toString(36).substring(2, 8);

        // Gửi mã xác nhận đến email - Đoạn này bạn cần cài đặt gửi email
        // Ví dụ: sendEmail(email, confirmationCode);

        toast.success("Confirmation code sent to your email.");
      } else {
        toast.error("Email not found. Please try again or register.");
      }
    } catch (error) {
      toast.error("Failed to send confirmation code. Please try again.");
    }
  };

  return (
    <div className="forget-password">
      <form onSubmit={handleResetPassword}>
        <img src={logo} alt="logo" />
        <div className="rectangle-border">
          <h2>Đặt lại mật khẩu</h2>
          <h5>Nhập gmail của bạn để nhận xác minh đặt lại mật khẩu</h5>
          <div>
            <img src={gmail} alt="gmail" />
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <a href="https://www.google.com/intl/vi/gmail/about/">
              Nhận mã xác nhận
            </a>
          </div>
          <div>
            <input
              type="text"
              placeholder="Nhập Mã xác nhận"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
          </div>
          <button type="submit">Tiếp Theo</button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
