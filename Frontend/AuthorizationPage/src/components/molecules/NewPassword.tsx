// NewPassword.tsx
import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../atoms/InputField";
import lock from "../../assets/images/lock.svg";
import logo from "../../assets/images/Logo.svg";

const NewPassword: React.FC= () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

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
        <InputField
          type="password"
          placeholder="Enter your new password..."
          value={password}
          onChange={handlePasswordChange}
          iconSrc={lock}
        />
        <InputField
          type="password"
          placeholder="Confirm your new password..."
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          iconSrc={lock}
        />
        <button type="button" onClick={handleResetPassword}>
          Reset Password
        </button>
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default NewPassword;
