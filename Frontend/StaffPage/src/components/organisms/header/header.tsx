import './header.scss'
import { Link } from 'react-router-dom'


function StaffSidebar() {
  return (
    <div className='header-container'>
      <div className="header-title">
        <h1>Sidebar</h1>
      </div>
      <div className='staff-sidebar'>
        <li>
          <div className="member-list">
            <Link to='/'>
              Tổng quan
            </Link>
          </div>
        </li>
        <li>
          <div className="member-list">
            <Link to='/danh-sach-nguoi-dung'>
              Xem toàn bộ người dùng
            </Link>
          </div>
        </li>
        <li>
          <div className="mentor-manage">
            <Link to='/quan-ly-khoa-hoc'>
              Quản lý khoá học
            </Link>
          </div>
        </li>
        <li>
          <div className="member-manage">
            <Link to='/quan-ly-hoc-vien'>
              Quản lý học viên
            </Link>
          </div>
        </li>
        <li>
          <div className="mentor-container">
            <Link to='/quan-ly-giao-vien'>
              Quản lý giáo viên
            </Link>
          </div>
        </li>
        <li>
          <div className="member-list">
            <Link to='/bao-cao'>
              Báo cáo
            </Link>
          </div>
        </li>
      </div>
    </div>
  )
}

export default StaffSidebar