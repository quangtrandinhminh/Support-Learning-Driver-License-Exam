import { Link } from 'react-scroll';
import './guest-nav-home.scss'
import { Link as Forward } from 'react-router-dom'
import Logo from '../../../../../../assets/imgs/logo.png'

function GuestNavHome() {
    return (
        <>
            <div className='guest-nav-home-container'>
                <nav>
                    <ul>
                        <div className='nav-home-items'>
                            <Link to="center-introduction">
                                <img src={Logo} alt='logo-img' className='logo-home' />
                            </Link>
                        </div>
                        <div className='nav-home-items'>
                            <Link to="center-introduction" spy={true} offset={-100} duration={500}>
                                <li className='inline-block'>
                                    <a href="">Trang chủ</a>
                                </li></Link>
                        </div>
                        <div className='nav-home-items'>
                            <Link to="course-section" spy={true} offset={-120} duration={500}>
                                <li className='inline-block'>
                                    <a href="">Khóa học</a>
                                </li></Link>
                        </div>
                        <div className='nav-home-items'>
                            <Link to="center-consultation" spy={true} offset={-120} duration={500}>
                                <li className='inline-block'>
                                    <a href="">Tư vấn</a>
                                </li>
                            </Link>
                        </div>
                        <div className='nav-home-items'>
                            <Forward to='/dang-nhap' >
                                <li className='inline-block'>
                                    <a href="">Đăng nhập</a>
                                </li>
                            </Forward>
                        </div>
                        <div className='nav-home-items'>
                            <Forward to='/dang-ky' >
                                <li className='inline-block'>
                                    <a href="">Đăng ký</a>
                                </li>
                            </Forward>
                        </div>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default GuestNavHome