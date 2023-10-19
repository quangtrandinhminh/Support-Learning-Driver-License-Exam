import './guest-nav-course.scss'

function GuestNavCourse() {
    return (
        <>
            <div className='guest-nav-course-container'>
                <nav>
                    <ul>
                        <div className='nav-course-items'>
                                <img src='./res/imgs/logo.png' alt='logo-img' className='logo-home' />
                        </div>
                        <div className='nav-course-items'>
                                <li className='inline-block'>
                                    <a href="">Trang chủ</a>
                                </li>
                        </div>
                        <div className='nav-course-items'>
                                <li className='inline-block'>
                                    <a href="">Khóa học</a>
                                </li> 
                        </div>
                        <div className='nav-course-items'>                           
                                <li className='inline-block'>
                                    <a href="">Tư vấn</a>
                                </li>
                        </div>
                        <div className='nav-course-items'>
                            <li className='inline-block'>
                                <a href="">Đăng nhập</a>
                            </li>
                        </div>
                        <div className='nav-course-items'>
                            <li className='inline-block'>
                                <a href="">Đăng kí</a>
                            </li>
                        </div>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default GuestNavCourse 