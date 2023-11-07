import { useState } from "react";
import "./adminPage.scss";
import Header from "../../organisms/Header/Header";
import Sidebar from "../../organisms/SideBar/Sidebar";
import Home from "../../templates/Home-templates/Home";

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
        <Home />
      </div>
    </div>
  );
}

export default AdminPage;