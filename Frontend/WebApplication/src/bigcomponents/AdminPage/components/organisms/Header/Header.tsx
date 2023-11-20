import { BsPersonCircle, BsJustify } from "react-icons/bs";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom';

import "./Header.scss";

interface HeaderProps {
  OpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {
  const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('Thong-tin-ca-nhan');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loginedUser');
    console.log('user:', user);
    navigate('dang-nhap');
  };

  return (
    <div className="Header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left"></div>
      <div className="header-right">
        <Menu>
          <MenuButton border="none" padding="0" backgroundColor="#fff" as={Button}>
            <BsPersonCircle className="icon" />
          </MenuButton>
          <MenuList className="tw-text-center">
            <MenuItem backgroundColor="#4292EB" textColor="#fff" onClick={handleProfile}><p>Hồ sơ cá nhân</p></MenuItem>
            <MenuItem className='tw-block' backgroundColor="#4292EB" textColor="#fff" onClick={handleLogout}><p>Đăng xuất</p></MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
