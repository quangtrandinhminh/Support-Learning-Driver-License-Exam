import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  iconSrc: string; // Đường dẫn đến hình ảnh biểu tượng
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, iconSrc }) => {
  return (
    <div className="input-field">
      <img src={iconSrc} alt="icon" /> {/* Sử dụng đường dẫn hình ảnh từ prop iconSrc */}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} required />
    </div>
  );
};

export default InputField;
