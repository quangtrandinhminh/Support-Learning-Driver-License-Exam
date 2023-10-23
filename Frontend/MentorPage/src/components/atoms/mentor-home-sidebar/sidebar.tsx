import './sidebar.scss'
import { Link } from 'react-router-dom'


function MentorSidebar() {
    return (
        <div className='sidebar-container'>
            <div className='mentor-sidebar'>
                <h1>Sidebar</h1>
                <h2>Công cụ & Trang</h2>
                <li>
                    <div className="member-list">
                        <Link to='/'>
                            Trang chủ
                        </Link>
                    </div>
                </li>
                <li>
                    <div className="member-list">
                        <Link to='/lich-day'>
                            Lịch dạy
                        </Link>
                    </div>
                </li>
                <li>
                    <div className="mentor-manage">
                        <Link to='/tai-lieu-hoc-tap'>
                            Tài liệu học tập
                        </Link>
                    </div>
                </li>
                <h2>Tài khoản: </h2>
                <li>
                    <div className="member-manage">
                        <Link to='/'>
                            Đăng xuất
                        </Link>
                    </div>
                </li>
            </div>
        </div>
    )
}

export default MentorSidebar