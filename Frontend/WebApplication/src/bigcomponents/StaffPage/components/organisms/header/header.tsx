import './header.scss'
import { NavLink, useNavigate } from 'react-router-dom'


function StaffSidebar() {

  const styleSidebarCom = ({ isActive }: { isActive: boolean }): React.CSSProperties => {
    return {
      paddingLeft: isActive ? '12px' : '0',
      fontWeight: isActive ? '600' : '',
      backgroundColor: isActive ? '#3572B8' : '#4292EB',
      borderLeft: isActive ? '4px solid gray' : 'none',
      transition: 'background-color 0.3s ease-out, padding-left 0.3s ease-out', // Add a transition to background color
    };
  };

  const handleScroll = () => {
    {
      window.scroll({
        top: 0,
        behavior: 'instant'
      });
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
          <div className="overview">
            <NavLink style={styleSidebarCom} to='/'>
              Tổng quan
            </NavLink>
          </div>
        </li>
        {/* Unnecessary features */}
        {/* <li className='sidebar-component'>
          <div className="user-manage">
            <NavLink style={styleSidebarCom} to='/quan-ly-nguoi-dung'>
              Quản lý người dùng
            </NavLink>
          </div>
        </li> */}
        {/* This is admin features */}
        {/* <li className='sidebar-component'>
          <div className="course-manage">
            <NavLink style={styleSidebarCom} to='/quan-ly-khoa-hoc'>
              Quản lý khoá học
            </NavLink>
            <div className='course-manage-subnav'>
              <NavLink to='quan-ly-khoa-hoc/chua-mo'>
                Các khoá học chưa mở
              </NavLink>
            </div>
          </div>
        </li> */}
        <li className='sidebar-component'>
          <div className="member-manage">
            <NavLink style={styleSidebarCom} to='/quan-ly-thanh-vien'>
              Quản lý thành viên
            </NavLink>
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="news-container">
            <NavLink style={styleSidebarCom} to='/quan-ly-tin-tuc'>
              Quản lý tin tức
            </NavLink>
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="exam-container">
            <NavLink style={styleSidebarCom} to='/quan-ly-ky-thi'>
              Quản lý kỳ thi
            </NavLink>
            {/* <div className='exam-container-subnav'>
              <NavLink to='quan-ly-ky-thi/bai-thi'>
                Quản lý bài thi
              </NavLink>
            </div> */}
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="report-manage">
            <NavLink style={styleSidebarCom} to='/bao-cao'>
              Báo cáo
            </NavLink>
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="logout">
            <NavLink className='logout-btn' onClick={handleLogout} to='/'>
              Đăng xuất
            </NavLink>
          </div>
        </li>
      </div>
    </div>
  )
}

export default StaffSidebar