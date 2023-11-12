import { useState } from "react";
import "./adminPage.scss";
import Header from "../../organisms/Header/Header";
import Sidebar from "../../organisms/SideBar/Sidebar";
import Home from "../../templates/Home-templates/Home";
import { Route, Routes } from "react-router-dom";

function AdminPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="AdminPage-contain">
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar 
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
         <div className="main-content">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="Tin_tức" element={<div>Tin tức</div>} />
              <Route path="Thay_đổi_và_cập_nhật" element={<div>Thay đổi và cập nhật</div>}>
                <Route path="Quản_lý_nhân_viên" element={<div>Quản lý nhân viên</div>} />
                <Route path="Quản_lý_giáo_viên" element={<div>Quản lý giáo viên</div>} />
                <Route path="Quản_lý_học_viên" element={<div>Quản lý học viên</div>} />
                <Route path="Quản_lý_khóa_học" element={<div>Quản lý khóa học</div>} />
              </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;