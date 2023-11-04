import React from 'react';
import { BsGrid1X2Fill, BsListCheck } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faFloppyDisk, faImages, faNewspaper, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import './Slidebar.scss';

interface SidebarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

const Slidebar: React.FC<SidebarProps> = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          ADMIN PAGE
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
      </div>
      <ul className="sidebar-list">
        <li className="list-header">
          <p>Điều hướng</p>
        </li>
        <SidebarItem
          icon={<BsGrid1X2Fill className="icon" />}
          text="bảng điều khiển"
          link="/dashboard"
        />
        <li className="list-header">
          <p>Phân Quyền Đăng Nhập</p>
        </li>
        <SidebarItem
          icon={<FontAwesomeIcon icon={faRightToBracket} />}
          text="Đăng nhập"
          link="/login"
        />
        <SidebarItem
          icon={<BsListCheck className="icon" />}
          text="Đăng ký"
          link="/register"
        />
        <li className="list-header">
          <p>Tiện ích</p>
        </li>
        <SidebarItem
          icon={<FontAwesomeIcon icon={faImages} />}
          text="Bài viết"
          link="/post"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faNewspaper} />}
          text="Tin tức"
          link="/news"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faFloppyDisk} />}
          text="Thay đổi và cập nhật"
          link="/database"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faDatabase} />}
          text="Cơ sở dữ liệu"
          link="/database"
        />
      </ul>
    </aside>
  );
}

const SidebarItem: React.FC<{ icon: React.ReactNode; text: string; link: string }> = ({ icon, text, link }) => {
  return (
    <li className="sidebar-list-item">
      <a href={link}>
        {icon} {text}
      </a>
    </li>
  );
}

export default Slidebar;
