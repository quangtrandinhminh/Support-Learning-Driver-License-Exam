import { Link as Forward } from 'react-router-dom';
import { Link } from 'react-scroll';
import MemberImg from '../../../../../assets/imgs/member/member_img.png'
import LogoImg from '../../../../../assets/imgs/logo.png'
import './member-nav-home.scss'

function MemberNavHome() {
    const handleScroll = () => {
        {
            window.scrollTo(0, 0);
        }
    }

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
                            <img src={MemberImg} alt="member-img" className='member-home-avatar' />
                            <ul className="subnav-function">
                                <li className='receive-border'>
                                    <Forward to='/thong-tin-ca-nhan' onClick={handleScroll}>
                                        Thông tin cá nhân
                                    </Forward>
                                </li>
                                <li className='receive-border'>
                                    <Forward to='/khoa-hoc-cua-ban' onClick={handleScroll}>
                                        Khoá học của bạn
                                    </Forward>
                                </li>
                                <li className='receive-border'>
                                    <Forward to=''>
                                        Hồ sơ thi
                                    </Forward>
                                </li>
                                <li>
                                    <Forward to='/'>
                                        Đăng xuất
                                    </Forward>
                                </li>
                            </ul>
                        </div>
                    </ul>
                </nav>
            </div>

        </>
    )
}

export default MemberNavHome