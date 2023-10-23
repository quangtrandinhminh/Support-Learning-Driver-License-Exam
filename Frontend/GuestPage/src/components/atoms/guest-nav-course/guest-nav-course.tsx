import { Link } from 'react-router-dom'
import './guest-nav-course.scss'

function GuestNavCourse() {
    return (
        <>
            <div className='guest-nav-course-container'>
                <nav>
                    <ul>
                        <div className='nav-course-items'>
                            <Link to='/'>
                                <img src='./res/imgs/logo.png' alt='logo-img' className='logo-home' />
                            </Link>
                        </div>
                        <div className='nav-course-items'>
                            <li className='inline-block'>
                                <Link to='/'>
                                    <a href="">Trang chủ</a>
                                </Link>
                            </li>
                        </div>
                        <div className='nav-course-items-course' >
                            <li className='inline-block'>
                                <a href="">Khóa học</a>
                            </li>
                        </div>
                        <div className='nav-course-items'>
                            <li className='inline-block'>
                                <Link to='/'>
                                    <a href="">Tư vấn</a>
                                </Link>
                            </li>
                        </div>
                        <div className='nav-course-items'>
                            <Link to='/login'>
                                <li className='inline-block'>
                                    <a href="">Đăng nhập</a>
                                </li>
                            </Link>
                        </div>
                        <div className='nav-course-items'>
                            <Link to='/login'>
                                <li className='inline-block'>
                                    <a href="">Đăng kí</a>
                                </li>
                            </Link>
                        </div>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default GuestNavCourse 