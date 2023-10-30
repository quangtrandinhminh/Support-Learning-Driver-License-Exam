import React, { useState } from 'react';
import './index.scss';
import api from '../../../../../config/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegisterForm() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    status: true,
    roleId: 0,
  })
    const [confirmPassword, setConfirmPassword] = useState<string>("");
  ;

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Check if the password and confirmPassword match
      if (formData.password !== formData.confirmPassword) {
        setError('Mật khẩu không khớp.');
        return;
      }

      // Send a request to the server for registration
      try {
        await api.post('https://localhost:7066/api/User/add', formData);
        toast.success('Đăng ký thành công. Chào mừng bạn!');
        setError(null);
        navigate('/dang-nhap');
      } catch (err) {
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRegister();
  };

  return (
    <div className='register-container'>
      <div className='register-title'>
        <h1 className='text-center text-uppercase'>Đăng ký</h1>
      </div>
      <div className='register-form'>
        {error && <h5 className="error-message mb-3 text-danger">{error}</h5>}
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Tên đăng nhập: </label>
            <input
              type='text'
              className='form-control'
              id='username'
              placeholder='Tên đăng nhập'
              name='username'
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='fullName'>Họ và tên: </label>
            <input
              type='text'
              className='form-control'
              id='fullName'
              placeholder='Họ và tên'
              name='fullName'
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='Email'
              name='email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Mật khẩu: </label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Mật khẩu'
              name='password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='confirmPassword'>Nhập lại mật khẩu: </label>
            <input
              type='password'
              className='form-control'
              id='confirmPassword'
              placeholder='Nhập lại mật khẩu'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>
          <button className='btn btn-primary' type='submit'>Đăng ký</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
