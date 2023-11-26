import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChalkboardUser,
  faFileLines,
  faNewspaper,
  faTableColumns,
  faUserGraduate,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  openSidebarToggle,
  OpenSidebar,
}) => {
  const [menuOpen, setMenuOpen] = useState({
    khoaHoc: false,
    lichHoc: false,
  });

  const toggleMenu = (menuKey: string) => {
    setMenuOpen((prevMenuOpen) => ({
      ...prevMenuOpen,
      [menuKey]: !prevMenuOpen[menuKey],
    }));
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">ADMIN PAGE</div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>
      <ul className="sidebar-list">
        <li className="list-header">
          <p className="tw-pl-3">Điều hướng</p>
        </li>
        <div>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faTableColumns} />}
            text="Bảng điều khiển"
            link="bang-dieu-khien"
          />
        </div>
        <li className="list-header">
          <p className="tw-pl-3">Quản lý hệ thống</p>
        </li>
        <SidebarItem
          icon={<FontAwesomeIcon icon={faCalendarDays} />}
          text="Quản lý khóa học"
          link="/quan-ly-khoa-hoc"
          onClick={() => toggleMenu("khoaHoc")}
        >
          {menuOpen.khoaHoc && (
            <SidebarItem
              icon={<FontAwesomeIcon icon={faCalendarDays} />}
              text="Các khóa học chưa mở"
              link="/quan-ly-khoa-hoc/chua-mo"
            />
          )}
        </SidebarItem>
        <SidebarItem
          icon={<FontAwesomeIcon icon={faUserGraduate} />}
          text="Quản lý lịch học"
          link="/quan-ly-lich-hoc"
          onClick={() => toggleMenu("lichHoc")}
        >
          {menuOpen.lichHoc && (
            <>
              <SidebarItem
                icon={<FontAwesomeIcon icon={faCalendarDays} />}
                text="Quản lý lớp học lý thuyết"
                link="/quan-ly-lich-hoc/lop-ly-thuyet"
              />
              <SidebarItem
                icon={<FontAwesomeIcon icon={faCalendarDays} />}
                text="Quản lý lớp học thực hành"
                link="/quan-ly-lich-hoc/lop-thuc-hanh"
              />
            </>
          )}
        </SidebarItem>
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
        {/* <SidebarItem
          icon={<FontAwesomeIcon icon={faFileLines} />}
          text="Quản lý kỳ thi"
          link="/quan-ly-ky-thi"
        /> */}
        <SidebarItem
          icon={<FontAwesomeIcon icon={faUserGraduate} />}
          text="Quản lý học viên"
          link="/quan-ly-hoc-vien"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faNewspaper} />}
          text="Quản lý kết quả thi"
          link="/quan-ly-ket-qua"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faUsersCog} />}
          text="Quản lý thanh toán"
          link="/quan-ly-thanh-toan"
        />
      </ul>
    </aside>
  );
};

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
        <li className="sidebar-sublist">{children}</li>
      </NavLink>
    </li>
  );
};

export default Sidebar;
