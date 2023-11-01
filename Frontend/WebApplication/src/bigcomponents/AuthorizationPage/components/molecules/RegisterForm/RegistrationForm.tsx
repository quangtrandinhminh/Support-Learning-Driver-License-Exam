import React, { useState } from 'react';
import './index.scss';
import api from '../../../../../config/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../../../../AuthorizationPage/assets/images/logo.png";
import Lock from "../../../../AuthorizationPage/assets/images/lock.svg";
import user from "../../../../AuthorizationPage/assets/images/userblur.svg";
import gmail from "../../../../AuthorizationPage/assets/images/gmail logo.svg";


function RegisterForm() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    phone: '',
    status: true
  })
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Check if the password and confirmPassword match
      if (formData.password !== confirmPassword) {
        setError('Mật khẩu không khớp.');
        return;
      }

      // Send a request to the server for registration
      const response = await api.post("User/Register", formData);
      toast.success("Đăng ký thành công. Chào mừng bạn!");
      setError(null);
      navigate("/dang-nhap");
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
        return;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister();
  }

  return (
    <div className="registration-form">
      <img src={logo} alt="logo" />
      <div className="rectangle-border">
        {error && <h5 className="error-message mb-3 text-danger">{error}</h5>}
        <form onSubmit={handleSubmit}>
          <div className="inputField">
            <img src={user} alt="user" />
            <input
              type="text"
              id="username"
              placeholder="Tên đăng nhập"
              name="username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="inputField">
            <img src={user} alt="user" />
            <input
              type="text"
              id="fullName"
              placeholder="Họ và tên"
              name="fullName"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
          <div className="inputField">
            <img src={gmail} alt="gmail" />
            <input
              type="phone"
              id="phone"
              placeholder="Số điện thoại"
              name="phone"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="inputField">
            <img src={Lock} alt="password" />
            <input
              type="password"
              id="password"
              placeholder="Mật khẩu"
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="inputField">
            <img src={Lock} alt="confirm-password" />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="registration-buttons">
            <button type="submit">
              <p>Đăng ký</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
