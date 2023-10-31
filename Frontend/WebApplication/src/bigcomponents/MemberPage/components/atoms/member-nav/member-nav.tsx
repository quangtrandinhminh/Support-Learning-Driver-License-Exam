import './member-nav.scss'
import { Link as Forward, useNavigate } from 'react-router-dom'
import MemberImg from '../../../../../../assets/imgs/member/member_img.png'
import LogoImg from '../../../../../../assets/imgs/logo.png'
import { toast } from 'react-toastify';

function MemberNav() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const username = user.username;
    const member = sessionStorage.getItem('loginedMember') ? JSON.parse(sessionStorage.getItem('loginedMember')) : null;
    console.log(member);

    const handleScroll = () => {
        window.scrollTo(0, 0);
    }

    const navigate = useNavigate()

    const handleClickNotMember = () => {
        toast.info("Bạn cần đăng ký khoá học để sử dụng chức năng");
    }

    const handleLogout = () => {
        sessionStorage.removeItem('loginedMember');
        sessionStorage.removeItem('loginedUser');
        navigate('/');
        location.reload();
        handleScroll();
    }

    return (
        <>
            {
                member != null ? (
                    <div className='member-nav-container'>
                        <nav>
                            <ul>
                                <div onClick={handleScroll} className="nav-items">
                                    <Forward to='/'>
                                        <img src={LogoImg} alt='logo-img' className='logo' />
                                    </Forward>
                                </div>
                                <div onClick={handleScroll} className='nav-items'>
                                    <Forward to='/'>
                                        <li>
                                            <a href="">Trang chủ</a>
                                        </li>
                                    </Forward>
                                </div>
                                <div onClick={handleScroll} className='nav-items'>
                                    <Forward to="/">
                                        <li>
                                            <a href="">Khoá học</a>
                                        </li>
                                    </Forward>
                                </div>
                                <div onClick={handleScroll} className='nav-items'>
                                    <Forward to='/'>
                                        <li>
                                            <a href="">Tin tức</a>
                                        </li>
                                    </Forward>
                                </div>
                                <div className='nav-items'>
                                    <Forward to='/thi-thu' onClick={handleScroll}>
                                        <li>
                                            <a href="">Thi thử</a>
                                        </li>
                                    </Forward>
                                </div>
                                <div className='nav-items member-nav-items'>
                                    <img src={MemberImg} alt="member-img" className='member-avatar' />
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
                                            <Forward to='/' onClick={handleLogout}>
                                                Đăng xuất
                                            </Forward>
                                        </li>
                                    </ul>
                                </div>
                            </ul>
                        </nav>
                    </div>
                ) : (
                    <div className='member-nav-container'>
                        <nav>
                            <ul>
                                <div onClick={handleScroll} className="nav-items">
                                    <Forward to='/'>
                                        <img src={LogoImg} alt='logo-img' className='logo' />
                                    </Forward>
                                </div>
                                <div onClick={handleScroll} className='nav-items'>
                                    <Forward to='/'>
                                        <li>
                                            <a href="">Trang chủ</a>
                                        </li>
                                    </Forward>
                                </div>
                                <div onClick={handleScroll} className='nav-items'>
                                    <Forward to="/">
                                        <li>
                                            <a href="">Khoá học</a>
                                        </li>
                                    </Forward>
                                </div>
                                <div onClick={handleScroll} className='nav-items'>
                                    <Forward to='/'>
                                        <li>
                                            <a href="">Tin tức</a>
                                        </li>
                                    </Forward>
                                </div>
                                <div className='nav-items'>
                                    <Forward to='/thi-thu' onClick={handleScroll}>
                                        <li>
                                            <a href="">Thi thử</a>
                                        </li>
                                    </Forward>
                                </div>
                                <div className='nav-items member-nav-items'>
                                    <img src={MemberImg} alt="member-img" className='member-avatar' />
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
                                            <a onClick={handleLogout}>
                                                Đăng xuất
                                            </a>
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

export default MemberNav