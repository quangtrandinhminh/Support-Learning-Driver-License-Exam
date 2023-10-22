import './member-nav.scss'
import { Link as Forward, useLocation } from 'react-router-dom'
import MemberImg from '../../../../../assets/imgs/member/member_img.png'
import LogoImg from '../../../../../assets/imgs/logo.png'

function MemberNav() {
    const handleScroll = () => {
        {
            window.scrollTo(0, 0);
        }
    }

    return (
        <>
            <div className='guest-nav-container'>
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
                            <Forward to='/thithu'>
                                <li>
                                    <a href="">Thi thử</a>
                                </li>
                            </Forward>
                        </div>
                        <div className='nav-items member-nav-items'>
                            <img src={MemberImg} alt="member-img" className='member-avatar' />
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
                                    <Forward to='/ho-so-thi'>
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

export default MemberNav