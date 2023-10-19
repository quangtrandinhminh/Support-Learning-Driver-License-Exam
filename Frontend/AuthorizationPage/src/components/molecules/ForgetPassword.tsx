import React, { ChangeEvent, useState } from "react";
import Logo from "../atoms/Logo";
import InputField from "../atoms/InputField";
import { User, fetchData } from "../../services/dataFetcher";
import { toast } from "react-toastify";
import sendEmail from "./sendEmail"; // Import hàm gửi email từ ví dụ trước

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
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    // Tìm xem email có tồn tại trong dữ liệu không
    const data = await fetchData<{ users: User[] }>("../../../public/data.json");
    const user = data.users.find((user) => user.gmail === email);

    if (user) {
      try {
        // Tạo mã xác nhận ngẫu nhiên
        const newConfirmationCode = Math.random().toString(36).substring(2, 8);

        // Gửi mã xác nhận đến email của người dùng
        await sendEmail(email, newConfirmationCode);

        // Lưu mã xác nhận để kiểm tra ở bước tiếp theo
        setConfirmationCode(newConfirmationCode);

        toast.success("Confirmation code sent to your email.");
      } catch (error) {
        console.error(error);
        toast.error("Failed to send confirmation code. Please try again.");
      }
    } else {
      toast.error("Email not found. Please try again or register.");
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
          iconType="gmail"
        />
        <a
          href="https://www.google.com/intl/vi/gmail/about/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nhận mã xác nhận
        </a>
        <br />
        <InputField
          type="text"
          placeholder="Nhập Mã xác nhận"
          value={confirmationCode}
          onChange={handleConfirmationCodeChange} iconType={"gmail"}/>
        <br />
        <button type="button" onClick={handleResetPassword}>
          Tiếp Theo
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
