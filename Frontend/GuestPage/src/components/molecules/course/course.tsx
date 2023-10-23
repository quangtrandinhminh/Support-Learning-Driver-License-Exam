import './course.scss'
import { Link } from 'react-router-dom'

function Course() {

    return (
        <div className='course-container' id='course-section'>
            <h1>Các khóa học</h1>
            <div className='course-list'>
                <div className='course-section-1'>
                    <div className='upperbox'>
                        <h2>Khóa học tháng 10/2023</h2>
                    </div>
                    <div className='course-content'>
                        <div className='course-content-list'>
                            <li>Khai giảng ngày</li>
                            <li>Cam kết học phí trọn gói - hợp lí</li>
                            <li>Lịch thi chuẩn - không chậm trễ</li>
                            <li>Dịch vụ 1 kèm 1</li>
                            <li>Đội ngũ giáo viên chất lượng</li>
                            <li>Sau 4 tháng bế giảng khóa</li>
                        </div>
                    </div>
                    <div className='underbox'>
                        <Link to='/khoahoc'>
                            <a href="">Xem khóa học</a>
                        </Link>
                    </div>
                </div>

                <div className='course-section-2'>
                    <div className='upperbox'>
                        <h2>Khóa học tháng 10/2023</h2>
                    </div>
                    <div className='course-content'>
                        <div className='course-content-list'>
                            <li>Khai giảng ngày</li>
                            <li>Cam kết học phí trọn gói - hợp lí</li>
                            <li>Lịch thi chuẩn - không chậm trễ</li>
                            <li>Dịch vụ 1 kèm 1</li>
                            <li>Đội ngũ giáo viên chất lượng</li>
                            <li>Sau 4 tháng bế giảng khóa</li>
                        </div>
                    </div>
                    <div className='underbox'>
                        <Link to='/khoahoc'>
                            <a href="">Xem khóa học</a>
                        </Link>
                    </div>
                </div>

                <div className='course-section-3'>
                    <div className='upperbox'>
                        <h2>Khóa học tháng 10/2023</h2>
                    </div>
                    <div className='course-content'>
                        <div className='course-content-list'>
                            <li>Khai giảng ngày</li>
                            <li>Cam kết học phí trọn gói - hợp lí</li>
                            <li>Lịch thi chuẩn - không chậm trễ</li>
                            <li>Dịch vụ 1 kèm 1</li>
                            <li>Đội ngũ giáo viên chất lượng</li>
                            <li>Sau 4 tháng bế giảng khóa</li>
                        </div>
                    </div>
                    <div className='underbox'>
                        <Link to='/khoahoc'>
                            <a href="">Xem khóa học</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course