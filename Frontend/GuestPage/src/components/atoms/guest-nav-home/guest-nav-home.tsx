import { Link } from 'react-scroll';
import './guest-nav-home.scss'
import { Link as Forward, Route, Routes } from 'react-router-dom'

function GuestNavHome() {
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
                            <Link to="consultation" spy={true} smooth={true} offset={-120} duration={500}>
                                <li className='inline-block'>
                                    <a href="">Tư vấn</a>
                                </li>
                            </Link>
                        </div>
                        <div className='nav-home-items'>
                            <Routes>
                                <Route path='/login' element={'/AuthorizationPage/src/App.tsx'}>
                                    <Forward to='../../../../../AuthorizationPage/src/App.tsx' >
                                    <li className='inline-block'>
                                        <a href="">Đăng nhập</a>
                                    </li>
                                    </Forward>  
                                </Route>
                            </Routes>

                        </div>
                        <div className='nav-home-items'>
                            <li className='inline-block'>
                                <a href="">Đăng ký</a>
                            </li>
                        </div>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default GuestNavHome