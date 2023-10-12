import { Link as Forward } from 'react-router-dom';
import { Link } from 'react-scroll';
import MemberImg from '../../../../../assets/imgs/member/member_img.png'
import LogoImg from '../../../../../assets/imgs/logo.png'
import './member-nav-home.scss'

function MemberNavHome() {

    return (
        <>
            <div className='guest-nav-home-container'>
                <nav>
                    <ul>
                        <div className="nav-home-items">
                            <Link to="center-introduction" spy={true} smooth={true} offset={-100} duration={500}>
                                <img src={LogoImg} alt='logo-img' className='logo-home' />
                            </Link>
                        </div>
                        <div className='nav-home-items'>
                            <Link to="center-introduction" spy={true} smooth={true} offset={-100} duration={500}>
                                <li className='inline-block'>
                                    <a href="">Trang chủ</a>
                                </li>
                            </Link>
                        </div>
                        <div className='nav-home-items'>
                            <Link to="course-section" spy={true} smooth={true} offset={-120} duration={500}>
                                <li className='inline-block'>
                                    <a href="">Khoá học</a>
                                </li>
                            </Link>
                        </div>
                        <div className='nav-home-items'>
                            <Link to="news-section" spy={true} smooth={true} offset={-120} duration={500}>
                                <li className='inline-block'>
                                    <a href="">Tin tức</a>
                                </li>
                            </Link>
                        </div>
                        <div className='nav-home-items'>
                            <Forward to='/thithu'>
                                <li className='inline-block'>
                                    <a href="">Thi thử</a>
                                </li>
                            </Forward>
                        </div>
                        <div className='nav-home-items member-nav-home-items'>
                            <li>
                                <img src={MemberImg} alt="member-img" className='member-home-avatar' />
                                <ul className="subnav-function">
                                    <li className='receive-border'>
                                        <button type='button'>
                                            Thông tin cá nhân
                                        </button>
                                    </li>
                                    <li className='receive-border'>
                                        <button type='button'>
                                            Khoá học của bạn
                                        </button>
                                    </li>
                                    <li className='receive-border'>
                                        <button type='button'>
                                            Lịch học
                                        </button>
                                    </li>
                                    <li className='receive-border'>
                                        <button type='button'>
                                            Hồ sơ thi
                                        </button>
                                    </li>
                                    <li>
                                        <button>Đăng xuất</button>
                                    </li>
                                </ul>
                            </li>
                        </div>
                    </ul>
                </nav>
            </div>

        </>
    )
}

export default MemberNavHome