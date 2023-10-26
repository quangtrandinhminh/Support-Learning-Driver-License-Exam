// NewPassword.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import lock from "../../../../AuthorizationPage/assets/images/lock.svg";
import logo from "../../../../AuthorizationPage/assets/images/Logo.png";
import "./index.scss"

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

    toast.success("Password reset successful");
    navigate('/dang-nhap')
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
              placeholder="MẬT KHẨU"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputField">
            <img src={lock} alt="lock" />
            <input
              type="password"
              placeholder="NHẬP LẠI MẬT KHẨU"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="newpassword-buttons">
            <button type="submit">
              <p>TIẾP THEO</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
