import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lock from "../../../../AuthorizationPage/assets/images/lock.svg";
import logo from "../../../../AuthorizationPage/assets/images/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

const NewPassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Tiến hành đặt lại mật khẩu tại đây (có thể gửi yêu cầu đặt lại mật khẩu đến máy chủ)
    navigate("/dang-nhap");
    toast.success("Password reset successful");
  };

  return (
    <div className="new-password">
      <form onSubmit={handleResetPassword}>
        <img src={logo} alt="logo" />
        <div className="rectangle-border">
          <div className="inputField">
            <img src={lock} alt="lock" />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputField">
            <img src={lock} alt="lock" />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="new-password"><button type="submit"><p>Tiếp Theo</p></button></div>

        </div>
      </form>
    </div>
  );
};

export default NewPassword;
