import React, { useState } from "react";
import {
  BsFillBellFill,
  BsPersonCircle,
  BsJustify,
} from "react-icons/bs";

import "./Header.scss";
import { faAddressCard, faGear, faRightFromBracket, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HeaderProps {
  OpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);
  const [isBellDropdownVisible, setIsBellDropdownVisible] = useState(false);

  const handleUserIconClick = () => {
    setIsUserDropdownVisible(!isUserDropdownVisible);
    // Ẩn dropdown chuông khi bấm vào biểu tượng người dùng
    setIsBellDropdownVisible(false);
  };

  const handleBellIconClick = () => {
    setIsBellDropdownVisible(!isBellDropdownVisible);
    // Ẩn dropdown người dùng khi bấm vào biểu tượng chuông
    setIsUserDropdownVisible(false);
  };

  return (
    <div className="Header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left"></div>
      <div className="header-right">
      <div className="button-icon-container">
          <button className="button" onClick={handleBellIconClick}>
            <BsFillBellFill className="icon" />
          </button>
          {isBellDropdownVisible && (
            <div className="bellIconDropdown">
              {/* Thêm các mục cho dropdown của biểu tượng chuông */}
              <div className="bellDropdownItem"><FontAwesomeIcon icon={faTag} />Thông báo 1</div>
              <div className="bellDropdownItem"><FontAwesomeIcon icon={faTag} />Thông báo 2</div>
              <div className="bellDropdownItem"><FontAwesomeIcon icon={faTag} />Thông báo 3</div>
            </div>
          )}
        </div>
        <div className="button-icon-container">
          <button className="button" onClick={handleUserIconClick}>
            <BsPersonCircle className="icon" />
          </button>
          {isUserDropdownVisible && (
            <div className="userIconDropdown">
              {/* Thêm các mục cho dropdown của biểu tượng người dùng */}
              <div className="userDropdownItem"><FontAwesomeIcon icon={faAddressCard} />Hồ sơ cá nhân</div>
              <div className="userDropdownItem"><FontAwesomeIcon icon={faGear} />Cài đặt</div>
              <div className="userDropdownItem"><FontAwesomeIcon icon={faRightFromBracket} />Đăng xuất</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
