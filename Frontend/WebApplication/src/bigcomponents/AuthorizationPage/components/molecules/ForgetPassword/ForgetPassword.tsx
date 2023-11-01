import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../../../AuthorizationPage/assets/images/logo.png";
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
      } else {
        toast.error("Email not found. Please try again or register.");
      }
    } catch (error) {
      toast.error("Failed to send confirmation code. Please try again.");
    }
  };

  return (
    <div className="forget-password">
      <h1 className="forget-password__title">Chức năng chưa được phát triển</h1>
      <button className="btn btn-primary" onClick={() => navigate('/dang-nhap')}>Quay về</button>
    </div>
  );
};

export default ForgetPassword;
