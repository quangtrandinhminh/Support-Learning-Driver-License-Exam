import './member-nav.scss'
import { Link, useNavigate } from 'react-router-dom'

function MemberNav() {
    const navigate = useNavigate();

    const handleScrolling = () => {
        navigate('/');

        window.scrollTo(0, 0);
    }

    return (
        <>
            <div className='guest-nav-container'>
                <nav>
                    <ul>
                        <div className='nav-items'>
                            <Link to='/'>
                                <li onClick={handleScrolling}>Trang chủ</li>
                            </Link>
                        </div>
                        <div className='nav-items'>
                            <Link to='/khoahoc'>
                                <li>Khoá học</li>
                            </Link>
                        </div>
                        <div className='nav-items'>
                            <Link to='/tintuc'>
                                <li>Tin tức</li>
                            </Link>
                        </div>
                        <div className='nav-items'>
                            <Link to='/thithu'>
                                <li>Thi thử</li>
                            </Link>
                        </div>
                    </ul>

                    <img src="src/imgs/member/member_img.png" alt="member-img" className='member-avatar' />
                    <Link to={'/'}>
                        <img onClick={handleScrolling} src='src/imgs/logo.png' alt='logo-img' className='logo' />
                    </Link>
                </nav>

            </div>

        </>
    )
}

export default MemberNav