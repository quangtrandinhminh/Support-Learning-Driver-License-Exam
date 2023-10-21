// Sử dụng atom Icon trong InputField
import React, { ChangeEvent } from 'react';
import Icon from './Icon';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  iconType: 'user' | 'gmail' | 'lock'; // Loại biểu tượng
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, iconType }) => {
  return (
    <div className="input-field">
      <Icon iconType={iconType} />
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} required/>
    </div>
  );
};

export default InputField;
