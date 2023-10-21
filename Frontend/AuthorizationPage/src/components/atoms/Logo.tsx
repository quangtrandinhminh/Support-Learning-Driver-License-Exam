// src/components/atoms/Logo.tsx
import React from 'react';

interface LogoProps {
  src: "/images/Logo.svg";
  alt: "logo";
}

const Logo: React.FC<LogoProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="login-logo" />;
};

export default Logo;
