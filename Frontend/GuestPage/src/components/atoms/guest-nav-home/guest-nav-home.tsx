import { Link as Forward } from 'react-router-dom';
import { Link } from 'react-scroll';
import './guest-nav-home.scss'

function GuestNav() {
    return (
        <>
            <div className='guest-nav-home-container'>
                <nav>
                    <ul>
                        <div className='nav-home-items'>
                            <Link to="center-introduction">
                                <img src='./res/imgs/logo.png' alt='logo-img' className='logo-home' />
                            </Link>
                        </div>
                        <div className='nav-home-items'>
                            <Link to="center-introduction" spy={true} smooth={true} offset={-100} duration={500}>
                                <li className='inline-block'>
                                    <a href="">Trang chủ</a>
                                </li></Link>
                        </div>
                        <div className='nav-home-items'>
                            <Link to="course-section" spy={true} smooth={true} offset={-120} duration={500}>
                                <li className='inline-block'>
                                    <a href="">Khóa học</a>
                                </li></Link>
                        </div>
                        <div className='nav-home-items'>
                            <Link to="news-section" spy={true} smooth={true} offset={-120} duration={500}>
                                <li className='inline-block'>
                                    <a href="">Tư vấn</a>
                                </li>
                            </Link>
                        </div>
                        <div className='nav-home-items'>
                            <Forward to="">
                                <li className='inline-block'>
                                    <a href="">Đăng nhập</a>
                                </li>
                            </Forward>
                        </div>
                        <div className='nav-home-items'>
                            <Forward to="">
                                <li className='inline-block'>
                                    <a href="">Đăng kí</a>
                                </li>
                            </Forward>
                        </div>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default GuestNav