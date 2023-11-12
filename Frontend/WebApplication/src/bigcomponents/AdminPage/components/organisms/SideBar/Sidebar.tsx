import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChalkboardUser, faDatabase, faFloppyDisk, faImages, faNewspaper, faTableColumns, faUser, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openSidebarToggle, OpenSidebar }) => {
  const [khoaHocOpen, setKhoaHocOpen] = useState(false);

  const toggleKhoaHoc = () => {
    setKhoaHocOpen(!khoaHocOpen);
  };

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
          icon={<FontAwesomeIcon icon={faTableColumns} />}
          text="Bảng điều khiển"
          link="/"
        />
        <li className="list-header">
          <p>Quản lý hệ thống</p>
        </li>
        <SidebarItem
          icon={<FontAwesomeIcon icon={faNewspaper} />}
          text="Quản lý tin tức"
          link="/quan-ly-tin-tuc"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faUsersCog} />}
          text="Quản lý nhân viên"
          link="/quan-ly-nhan-vien"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faChalkboardUser} />}
          text="Quản lý giáo viên"
          link="/quan-ly-giao-vien"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faUser} />}
          text="Quản lý học viên"
          link="/quan-ly-hoc-vien"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faCalendarDays} />}
          text="Quản lý khóa học"
          link="/quan-ly-khoa-hoc"
          onClick={toggleKhoaHoc}
        >
          {khoaHocOpen && (
            <SidebarItem
              icon={<FontAwesomeIcon icon={faCalendarDays} />}
              text="Các khóa học chưa mở"
              link="/quan-ly-khoa-hoc/chua-mo"
            />
          )}
        </SidebarItem>
      </ul>
    </aside>
  );
}

const SidebarItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  link: string;
  onClick?: () => void;
  children?: React.ReactNode;
}> = ({ icon, text, link, onClick, children }) => {
  return (
    <li className="sidebar-list-item">
      <NavLink to={link} className="sidebar-link" onClick={onClick}>
        {icon} {text}
        {children}
      </NavLink>
    </li>
  );
};


export default Sidebar;
