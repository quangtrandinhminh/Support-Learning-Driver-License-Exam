import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faDatabase, faFloppyDisk, faImages, faNewspaper, faTableColumns, faUsersCog} from '@fortawesome/free-solid-svg-icons';
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
          <p>Quản lý và cài đặt</p>
        </li>
        <SidebarItem
          icon={<FontAwesomeIcon icon={faNewspaper} />}
          text="Tin tức"
          link="/Tin_tức"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faFloppyDisk} />}
          text="Thay đổi và cập nhật"
          link="/Thay_đổi_và_cập_nhật"
        />
        <li className={`sidebar-list-item ${databaseOpen ? 'open' : ''}`} onClick={toggleDatabase}>
            <p><FontAwesomeIcon icon={faDatabase} /> Cơ sở dữ liệu</p>
          {databaseOpen && (
            <ul className="sub-items">
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
                icon={<FontAwesomeIcon icon={faImages} />}
                text="Quản lý học viên"
                link="/Quản_lý_học_viên"
              />
            </ul>
          )}
        </li>
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
