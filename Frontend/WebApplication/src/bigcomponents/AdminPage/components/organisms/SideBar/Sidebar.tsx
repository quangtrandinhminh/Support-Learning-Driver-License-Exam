import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChalkboardUser, faDatabase, faFloppyDisk, faImages, faNewspaper, faTableColumns, faUser, faUsersCog} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

const Slidebar: React.FC<SidebarProps> = ({ openSidebarToggle, OpenSidebar }) => {
  const [databaseOpen, setDatabaseOpen] = React.useState(false);

  const toggleDatabase = () => {
    setDatabaseOpen(!databaseOpen);
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
          link="/Quản_lý_tin_tức"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faUsersCog} />}
          text="Quản lý nhân viên"
          link="/Quản_lý_nhân_viên"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faChalkboardUser} />}
          text="Quản lý giáo viên"
          link="/Quản_lý_giáo_viên"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faUser} />}
          text="Quản lý học viên"
          link="/Quản_lý_học_viên"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faCalendarDays} />}
          text="Quản lý khóa học"
          link="/Quản_lý_khóa_học"
        />
      </ul>
    </aside>
  );
}

const SidebarItem: React.FC<{ icon: React.ReactNode; text: string; link: string }> = ({ icon, text, link }) => {
  return (
      <li className="sidebar-list-item">
      <NavLink to={link} className="sidebar-link">
        {icon} {text}
      </NavLink>
    </li>
  );
}

export default Slidebar;
