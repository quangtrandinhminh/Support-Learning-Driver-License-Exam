import { Link } from 'react-router-dom'
import './registered-course.scss'

function RegisteredCourse() {
    return (
        <div className="registered-course-container">
            <h1 className='registered-course-title'>khoá học của bạn</h1>
            <div className='registered-course-content'>
                <ul>
                    <li>
                        <label htmlFor="course-name">Khoá học: </label>
                    </li>
                    <li>
                        <label htmlFor="course-start">Ngày khai giảng: </label>
                    </li>
                    <li>
                        <label htmlFor="course-mentor">
                            Giáo viên phụ trách: <Link to='/thong-tin-giao-vien'>Tên giáo viên</Link>
                        </label>
                    </li>
                    <li>
                        <label htmlFor="course-theory">
                            <Link to='/lich-hoc-ly-thuyet'>Lịch học lý thuyết</Link>
                        </label>
                    </li>
                    <li>
                        <label htmlFor="course-practice">
                            <Link to='/lich-hoc-thuc-hanh'>Lịch học thực hành</Link>
                        </label>
                    </li>
                    <li>
                        <label htmlFor="course-theory-location">Địa điểm học lý thuyết: </label>
                    </li>
                    <li>
                        <label htmlFor="course-practice-location">Địa điểm học thực hành: </label>
                    </li>
                    <li>
                        <label htmlFor="exam-application">
                            <Link to='/ho-so-thi'>Hồ sơ thi</Link>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default RegisteredCourse