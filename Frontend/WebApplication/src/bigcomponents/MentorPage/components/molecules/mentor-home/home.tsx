import { NavLink } from 'react-router-dom'
import '../../mentor-general.scss'
import './home.scss'


function HomePage() {
  return (
    <>
      <div className='mentor-home-container'>
        <div className="title">
          <h1>Trang chủ</h1>
        </div>
        <div className='mentor-home-page'>
          <li className='home-component'>
            <div className="mentor-list">
              <NavLink to='/danh-sach-lop-hoc'>
                Danh sách lớp học
              </NavLink>
            </div>
          </li>
          <li className='home-component'>
            <div className="mentor-list">
              <NavLink to='/lich-day'>
                Lịch dạy
              </NavLink>
            </div>
          </li>
          <li className='home-component'>
            <div className="mentor-list">
              <NavLink to='/chi-tiet-lich-day'>
                Chi tiết lịch dạy
              </NavLink>
            </div>
          </li>
          <li className='home-component'>
            <div className="mentor-list">
              <NavLink to='/dang-ki-lich-day'>
                Đăng kí lịch dạy
              </NavLink>
            </div>
          </li>
          <li className='home-component'>
            <div className="mentor-list">
              <NavLink to='/tai-lieu-day-hoc'>
                Tài liệu dạy học
              </NavLink>
            </div>
          </li>
        </div>
      </div>
    </>
  )
}

export default HomePage