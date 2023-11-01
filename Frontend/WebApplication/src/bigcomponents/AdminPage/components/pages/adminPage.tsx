import { useState } from 'react';
import './adminPage.scss';
import Header from '../organisms/Header';
import Slidebar from '../organisms/Slidebar';
import Home from '../templates/Home';

function adminPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  }

  return (
    <div className='Admin-contain'>
        <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Slidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Home />
        </div>
    </div>
  );
}

export default adminPage;
