import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../../../AuthorizationPage/assets/images/Logo.png";
import gmail from "../../../../AuthorizationPage/assets/images/gmail logo.svg";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const navigate = useNavigate();

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
        navigate('/mat-khau-moi');
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
          <div className="content-page">
            <h3>Đặt lại mật khẩu</h3>
            <p>Nhập gmail của bạn để nhận xác minh đặt lại mật khẩu</p>
          </div>
          <div className="inputField">
            <img src={gmail} alt="gmail" />
            <input
              type="text"
              placeholder="NHẬP GMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="link_sms">
            <a href="https://www.google.com/intl/vi/gmail/about/">
              LẤY MÃ XÁC NHẬN
            </a>
          </div>
          <div className="inputField2">
            <input
              type="text"
              placeholder="NHẬP MÃ XÁC NHẬN"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
          </div>
          <div className="forget-buttons">
            <button type="submit">
              <p>TIẾP THEO</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
