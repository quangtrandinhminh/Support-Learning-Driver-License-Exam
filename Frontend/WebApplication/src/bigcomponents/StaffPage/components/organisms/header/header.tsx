import './header.scss'
import { NavLink, useNavigate } from 'react-router-dom'


function StaffSidebar() {

  const styleSidebarCom = ({ isActive }: { isActive: boolean }): {
    paddingLeft: string;
    fontWeight: string;
    backgroundColor: string;
    borderLeft: string;
    transition: string;
  } => {
    return {
      paddingLeft: isActive ? '5px' : '0',
      fontWeight: isActive ? '600' : '',
      backgroundColor: isActive ? '#3572B8' : '#4292EB',
      borderLeft: isActive ? '5px solid gray' : 'none',
      transition: isActive
        ? 'padding-left ease-out 0.5s, background-color ease-out 0.5s, border-left ease-out 0.5s, font-weight ease-out 0.5s'
        : 'none'
    };
  };

  const handleScroll = () => {
    {
      window.scrollTo(0, 0);
    }
  }

  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('loginedUser');
    navigate('/');
    location.reload();
    handleScroll();
  }

  return (
    <div className='header-container'>
      <div className="header-title">
        <h1>Sidebar</h1>
      </div>
      <div className='staff-sidebar'>
        <li className='sidebar-component'>
          <div className="member-list">
            <NavLink style={styleSidebarCom} to='/'>
              Tổng quan
            </NavLink>
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="member-list">
            <NavLink style={styleSidebarCom} to='/quan-ly-nguoi-dung'>
              Quản lý người dùng
            </NavLink>
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="mentor-manage">
            <NavLink style={styleSidebarCom} to='/quan-ly-khoa-hoc'>
              Quản lý khoá học
            </NavLink>
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="member-manage">
            <NavLink style={styleSidebarCom} to='/quan-ly-hoc-vien'>
              Quản lý học viên
            </NavLink>
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="mentor-container">
            <NavLink style={styleSidebarCom} to='/quan-ly-giao-vien'>
              Quản lý giáo viên
            </NavLink>
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="mentor-container">
            <NavLink style={styleSidebarCom} to='/quan-ly-tin-tuc'>
              Quản lý tin tức
            </NavLink>
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="member-list">
            <NavLink style={styleSidebarCom} to='/bao-cao'>
              Báo cáo
            </NavLink>
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="member-list">
            <NavLink className='logout-btn' to='/' onClick={handleLogout}>
              Đăng xuất
            </NavLink>
          </div>
        </li>
      </div>
    </div>
  )
}

export default StaffSidebar