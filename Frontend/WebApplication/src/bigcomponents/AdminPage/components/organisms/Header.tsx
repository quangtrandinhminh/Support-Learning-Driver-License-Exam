import React, { useState } from "react";
import {
  BsFillBellFill,
  BsPersonCircle,
  BsJustify,
  BsFillGearFill,
} from "react-icons/bs";

import "./Header.scss";

interface HeaderProps {
  OpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {
  const [isAdminPopUpVisible, setIsAdminPopUpVisible] = useState(false);

  const handleAdminIconClick = () => {
    setIsAdminPopUpVisible(!isAdminPopUpVisible);
  };
  
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left"></div>
      <div className="header-right">
        <button className="button_icon"><BsFillBellFill className="icon" /></button>
        <button className="button_icon">
        <BsPersonCircle className="icon" onClick={handleAdminIconClick} />
        {isAdminPopUpVisible && (
          <div className="adminIconclick">
            <div className="adminPopUp">
              <a href="#">Profile</a>
            </div>
            <div className="adminPopUp">
              <a href="#">
                <BsFillGearFill className="icon" /> Setting
              </a>
            </div>
            <div className="adminPopUp">
              <a href="#">Log Out</a>
            </div>
          </div>
        )}
        </button>
      </div>
    </header>
  );
};

export default Header;
