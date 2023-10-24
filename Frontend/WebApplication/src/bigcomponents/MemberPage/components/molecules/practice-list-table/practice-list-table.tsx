import { useEffect } from 'react'
import './practice-list-table.scss'
import { Link } from 'react-router-dom'

function PracticeList() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='practice-list-container'>
            <h1 className='practice-list-title'>
                Đăng ký lịch học thực hành khoá học XXB2
            </h1>
            <table>
                <thead>
                    <tr>
                        <th className='course-no'>STT</th>
                        <th className='course-mentor'>Giảng viên</th>
                        <th className='course-course'>Khoá</th>
                        <th className='course-schedule'>Lịch dạy của giáo viên</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='course-no-content'>1</td>
                        <td className='course-mentor-content'>Nguyễn Văn A</td>
                        <td className='course-course-name'>XXB2</td>
                        <td className='course-schedule-content'>
                            <Link to={`/danh-sach-khoa-hoc/khoa-hoc/${1}`}>Xem chi tiết</Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='course-no-content'>2</td>
                        <td className='course-mentor-content'>Nguyễn Văn B</td>
                        <td className='course-course-name'>XXB2</td>
                        <td className='course-schedule-content'>
                            <Link to={`/danh-sach-khoa-hoc/khoa-hoc/${2}`}>Xem chi tiết</Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='course-no-content'>3</td>
                        <td className='course-mentor-content'>Nguyễn Văn C</td>
                        <td className='course-course-name'>XXB2</td>
                        <td className='course-schedule-content'>
                            <Link to={`/danh-sach-khoa-hoc/khoa-hoc/${3}`}>Xem chi tiết</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PracticeList