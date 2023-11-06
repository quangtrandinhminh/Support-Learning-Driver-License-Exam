import { NavLink as Forward, useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import MemberImg from '../../../../../../assets/imgs/member/member_img.png'
import LogoImg from '../../../../../../assets/imgs/logo.png'
import './member-nav-home.scss'
import api from '../../../../../config/axios';
import { useEffect } from 'react'
import { toast } from 'react-toastify';

function MemberNavHome() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const username = user.username;
    const member = sessionStorage.getItem('loginedMember') ? JSON.parse(sessionStorage.getItem('loginedMember')) : null;
    console.log(member);

    const navigate = useNavigate()

    const handleScroll = () => {
        {
            window.scroll({
                top: 0,
                behavior: 'instant'
            });
        }
    }

    const getMemberByID = async () => {
        try {
            const res = await api.get(`Member/${user.userID}`);
            sessionStorage.setItem('loginedMember', JSON.stringify(res.data));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (user != null) {
            getMemberByID();
        }
    }, [])

    const handleClickNotMember = () => {
        toast.info("Bạn cần đăng ký khoá học để sử dụng chức năng");
    }

    const handleLogout = () => {
        sessionStorage.removeItem('loginedUser');
        sessionStorage.removeItem('loginedMember');
        navigate('/');
        location.reload();
        handleScroll();
    }

    return (
        <>
            {
                member != null ? (
                    <div className='member-nav-home-container'>
                        <nav>
                            <ul>
                                <div className="nav-home-items">
                                    <Link to="center-introduction" spy={true} offset={-100} duration={500}>
                                        <img src={LogoImg} alt='logo-img' className='logo-home' />
                                    </Link>
                                </div>
                                <div className='nav-home-items'>
                                    <Link to="center-introduction" spy={true} offset={-100} duration={500}>
                                        <li className='inline-block'>
                                            <a href="">Trang chủ</a>
                                        </li>
                                    </Link>
                                </div>
                                <div className='nav-home-items'>
                                    <Link to="course-section" spy={true} offset={-120} duration={500}>
                                        <li className='inline-block'>
                                            <a href="">Khoá học</a>
                                        </li>
                                    </Link>
                                </div>
                                <div className='nav-home-items'>
                                    <Link to="news-section" spy={true} offset={-120} duration={500}>
                                        <li className='inline-block'>
                                            <a href="">Tin tức</a>
                                        </li>
                                    </Link>
                                </div>
                                <div className='nav-home-items'>
                                    <Forward to='/kiem-tra'>
                                        <li className='inline-block'>
                                            <a href="">Kiểm tra</a>
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
                                            <Forward to='/ho-so-thi' onClick={handleScroll}>
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

                ) : (
                    <div className='member-nav-home-container'>
                        <nav>
                            <ul>
                                <div className="nav-home-items">
                                    <Link to="center-introduction" spy={true} offset={-100} duration={500}>
                                        <img src={LogoImg} alt='logo-img' className='logo-home' />
                                    </Link>
                                </div>
                                <div className='nav-home-items'>
                                    <Link to="center-introduction" spy={true} offset={-100} duration={500}>
                                        <li className='inline-block'>
                                            <a href="">Trang chủ</a>
                                        </li>
                                    </Link>
                                </div>
                                <div className='nav-home-items'>
                                    <Link to="course-section" spy={true} offset={-120} duration={500}>
                                        <li className='inline-block'>
                                            <a href="">Khoá học</a>
                                        </li>
                                    </Link>
                                </div>
                                <div className='nav-home-items'>
                                    <Link to="news-section" spy={true} offset={-120} duration={500}>
                                        <li className='inline-block'>
                                            <a href="">Tin tức</a>
                                        </li>
                                    </Link>
                                </div>
                                <div className='nav-home-items'>
                                    <Forward to='/kiem-tra'>
                                        <li className='inline-block'>
                                            <a href="">Kiểm tra</a>
                                        </li>
                                    </Forward>
                                </div>
                                <div className='nav-home-items member-nav-home-items'>
                                    <img src={MemberImg} alt="member-img" className='member-home-avatar' />
                                    <ul className="subnav-function">
                                        <li className='receive-border'>
                                            <a onClick={handleClickNotMember}>
                                                Thông tin cá nhân
                                            </a>
                                        </li>
                                        <li className='receive-border'>
                                            <a onClick={handleClickNotMember}>
                                                Khoá học của bạn
                                            </a>
                                        </li>
                                        <li className='receive-border'>
                                            <a onClick={handleClickNotMember}>
                                                Hồ sơ thi
                                            </a>
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

                )
            }
        </>
    )
}

export default MemberNavHome