import React, { ChangeEvent, useState } from "react";
import Logo from "../atoms/Logo";
import InputField from "../atoms/InputField";
import { User, fetchData } from "../../services/dataFetcher";
import { toast } from "react-toastify";

interface ForgetPasswordProps {
    emailIconType: "gmail";
}

const ForgetPassword: React.FC<ForgetPasswordProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleConfirmationCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmationCode(event.target.value);
  };

  const handleResetPassword = async () => {
    // Tìm xem email có tồn tại trong dữ liệu không
    const data = await fetchData<{ users: User[] }>("../../../public/data.json");
    const emailExists = data.users.some((user) => user.gmail === email);
  
    if (emailExists) {
      try {
        // Tạo mã xác nhận ngẫu nhiên
        const confirmationCode = Math.random().toString(36).substring(2, 8);
  
        // Gửi mã xác nhận đến email
        // Ở đây, bạn có thể sử dụng một thư viện gửi email thật hoặc giả lập
        // Ví dụ:
        // sendEmail(email, confirmationCode);
  
        toast.error("Confirmation code sent to your email.");
        toast.error(null);
      } catch (error) {
        toast.error("Failed to send confirmation code. Please try again.");
        toast.error(null);
      }
    } else {
      toast.error("Email not found. Please try again or register.");
      toast.error(null);
    }
  };

  return (
    <div className="forget-password">
      <Logo src="/images/Logo.svg" alt="logo" />
      <div className="rectangle-border">
        <h2>Đặt lại mật khẩu</h2>
        <h5>Nhập gmail của bạn để nhận xác minh đặt lại mật khẩu</h5>
        <InputField
          type="email"
          placeholder="Nhập Email của bạn"
          value={email}
          onChange={handleEmailChange}
          iconType="gmail" // Use "gmail" as iconType
          />
          <a href="https://www.google.com/intl/vi/gmail/about/">Nhận mã xác nhận</a> {/* Đường liên kết "Nhận mã xác nhận" */}<br/>
          <input
            type="text"
            placeholder="Nhập Mã xác nhận"
            value={confirmationCode}
            onChange={handleConfirmationCodeChange}
          /><br/>
          <button type="button" onClick={handleResetPassword}>
            Tiếp Theo
          </button>
        </div>
      </div>
  );
};

export default ForgetPassword;
