import React, { useState } from "react";
import { BsPersonCircle, BsJustify } from "react-icons/bs";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'

import {Link} from 'react-router-dom'

import "./Header.scss";

interface HeaderProps {
  OpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {
  const [selectedOption, setSelectedOption] = useState("Profile");
  const [isAdminPopUpVisible, setIsAdminPopUpVisible] = useState(false);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleAdminIconClick = () => {
    setIsAdminPopUpVisible(!isAdminPopUpVisible);
  };

  return (
    <div className="Header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left"></div>
      <div className="header-right">
        <Menu>
          <MenuButton border="none" padding="0" backgroundColor="#fff" zIndex="1000" as={Button} >
            <BsPersonCircle className="icon"/>
          </MenuButton>
          <MenuList>
            <MenuItem><Link to={""}>Hồ sơ cá nhân</Link></MenuItem>
            <MenuItem><Link to={""}>cài Đặt</Link></MenuItem>
            <MenuItem><Link to={""}>Đăng xuất</Link></MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
