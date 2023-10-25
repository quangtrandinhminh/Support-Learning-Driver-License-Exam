// NewPassword.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import lock from "../../../../AuthorizationPage/assets/images/lock.svg";
import logo from "../../assets/images/Logo.svg";

const NewPassword: React.FC= () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Tiến hành đặt lại mật khẩu tại đây (có thể gửi yêu cầu đặt lại mật khẩu đến máy chủ)

    setError("Password reset successful");
  };

  return (
    <div className="new-password">
       <img src={logo} alt="logo" />
      <div className="rectangle-border">
        {error && <div className="error-message">{error}</div>}
        <div className="inputField">
            <img src={lock} alt="lock" />
            <input
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputField">
            <img src={lock} alt="lock" />
            <input
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        <button type="button" onClick={handleResetPassword}>
          Reset Password
        </button>
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default NewPassword;
