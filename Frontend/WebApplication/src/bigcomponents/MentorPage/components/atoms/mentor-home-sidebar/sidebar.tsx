import { useEffect } from 'react';
import api from '../../../../../config/axios';
import './sidebar.scss'
import { NavLink, useNavigate } from 'react-router-dom'

function MentorSidebar() {
  const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;

  const styleSidebarCom = ({ isActive }: { isActive: boolean }): React.CSSProperties => {
    return {
      paddingLeft: isActive ? '12px' : '0',
      fontWeight: isActive ? '600' : '',
      backgroundColor: isActive ? '#3572B8' : '#4292EB',
      borderLeft: isActive ? '4px solid gray' : 'none',
      transition: 'background-color 0.3s ease-out, padding-left 0.3s ease-out', // Add a transition to background color
    };
  };

  const getMentorbyId = async () => {
    try {
       const response = await api.get('Mentor/' + user.userID);
       console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMentorbyId();
  })

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
    <div className='sidebar-container'>
      <div className="sidebar-title">
        <h1>Mentor Sidebar</h1>
      </div>
      <div className='mentor-sidebar'>
        <h3 className='mini-title'>Công cụ & trang</h3>
        <li className='sidebar-component'>
          <div className="mentor-list">
            <NavLink style={styleSidebarCom} to='/'>
              Trang chủ
            </NavLink>
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="mentor-list">
            <NavLink style={styleSidebarCom} to='/lich-day'>
              Lịch dạy
            </NavLink>
          </div>
        </li>
        <li className='sidebar-component'>
          <div className="mentor-list">
            <NavLink style={styleSidebarCom} to='/tai-lieu-day-hoc'>
              Tài liệu dạy học
            </NavLink>
          </div>
        </li>
        <h3 className='mini-title'>Tài khoản: </h3>
        <li className='sidebar-component'>
          <div className="mentor-list">
            <NavLink className='logout-btn' to='/' onClick={handleLogout}>
              Đăng xuất
            </NavLink>
          </div>
        </li>
      </div>
    </div>
  )
}

export default MentorSidebar