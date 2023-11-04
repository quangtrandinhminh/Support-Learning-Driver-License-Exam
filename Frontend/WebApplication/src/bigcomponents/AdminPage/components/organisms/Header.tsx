import React, { useState } from "react";
import { BsPersonCircle, BsJustify } from "react-icons/bs";

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

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
        <Popover>
          <PopoverTrigger>
            <Button className="button" onClick={handleAdminIconClick}>
              <BsPersonCircle className="icon" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="Popup">
            <PopoverArrow className="Popup-Arrow" />
            <PopoverCloseButton className="Popup-close-button" />
            <PopoverHeader className="Popup-Content">
              <div className="popup_header_context">
                <p>name:Admin</p>
                <p>email:Admin@gmail.com</p>
              </div>
            </PopoverHeader>
            <PopoverBody>
            <div className="popup_body_context">
                <p>name:Admin</p>
                <p>email:Admin@gmail.com</p>
              </div>
            </PopoverBody>
            <PopoverFooter>
            <div className="popup_footer_context">
                <p>name:Admin</p>
                <p>email:Admin@gmail.com</p>
              </div>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
