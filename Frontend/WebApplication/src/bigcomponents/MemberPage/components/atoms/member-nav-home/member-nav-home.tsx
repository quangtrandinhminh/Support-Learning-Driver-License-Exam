import { NavLink as Forward, useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import MemberImg from '../../../../../../assets/imgs/member/member_img.png'
import LogoImg from '../../../../../../assets/imgs/logo.png'
import './member-nav-home.scss'
import api from '../../../../../config/axios';
import { useEffect } from 'react'

function MemberNavHome() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const username = user.username;
    const navigate = useNavigate()

    const handleScroll = () => {
        {
            window.scrollTo(0, 0);
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem('loginedUser');
        navigate('/');
        location.reload();
        handleScroll();
    }

    const getUserbyUsername = async () => {
        const response = await api.get('User?username=' + username);
        const user = response.data;
        console.log(user.payload);
    }

    useEffect(() => {
        getUserbyUsername();
    }, [])

    return (
        <>
            <div className='member-nav-home-container'>
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
                                    <Forward to={`/thong-tin-ca-nhan/${username}`} onClick={handleScroll}>
                                        Thông tin cá nhân
                                    </Forward>
                                </li>
                                <li className='receive-border'>
                                    <Forward to='/khoa-hoc-cua-ban' onClick={handleScroll}>
                                        Khoá học của bạn
                                    </Forward>
                                </li>
                                <li className='receive-border'>
                                    <Forward to='/ho-so-thi'>
                                        Hồ sơ thi
                                    </Forward>
                                </li>
                                <li>
                                    <Forward to='/' onClick={handleLogout} >
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