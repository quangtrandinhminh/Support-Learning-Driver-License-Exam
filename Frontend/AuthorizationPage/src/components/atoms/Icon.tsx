// src/components/atoms/Icon.tsx
import React from 'react';

interface IconProps {
  iconType: 'user' | 'gmail' | 'lock';
}

const Icon: React.FC<IconProps> = ({ iconType }) => {
  // Đường dẫn đến thư mục chứa hình ảnh (tương đối từ thư mục public)
  const basePath = '/images';

  let iconSrc = '';
  switch (iconType) {
    case 'user':
      iconSrc = `${basePath}/userblur.svg`;
      break;
    case 'gmail':
      iconSrc = `${basePath}/gmail logo.svg`;
      break;
    case 'lock':
      iconSrc = `${basePath}/lock.svg`;
      break;
    default:
      iconSrc = ''; // Đường dẫn mặc định hoặc xử lý lỗi
  }

  return <img src={iconSrc} alt={iconType} />;
};

export default Icon;
