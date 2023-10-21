import { useNavigate, Link } from 'react-router-dom'
import './member-management.scss'
import React from 'react';

function MemberManagement() {

    return (
        <div className='container'>
            <div className='content'>
                <div className="member-container">
                    <label htmlFor="memberview">Xem toàn bộ người dùng</label>
                    <Link to='/danh-sach-nguoi-dung'>
                        <button className="btn btn-primary" type="button">Xem</button>
                    </Link>
                </div>
                <hr className='border-2' />
                <div className="member-container">
                    <label htmlFor="member-manage">Quản lý thành viên</label>
                    <Link to='/quan-li-thanh-vien'>
                        <button className="btn btn-primary" type="button">Quản lý</button>
                    </Link>
                </div>
                <hr className='border-2' />
                <div className="mentor-container">
                    <label htmlFor="mentor-manage">Quản lý giáo viên</label>
                    <Link to='/quan-li-giao-vien'>
                        <button className="btn btn-primary" type="button">Quản lý</button>
                    </Link>
                </div>
                <hr className='border-2' />
            </div>
        </div >
    )
}

export default MemberManagement