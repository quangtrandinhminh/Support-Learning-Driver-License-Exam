import { useEffect, useState } from 'react'
import './practice-list-table.scss'
import { Link } from 'react-router-dom'
import api from '../../../../../config/axios';

function PracticeList() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const [mentor, setMentor] = useState([]); // Store all mentors
    const [course, setCourse] = useState(null); // Store course
    const [member, setMember] = useState(null);

    const getMemberByUID = async () => {
        try {
            const response = await api.get('Member/' + user.userID);
            setMember(response.data);
            sessionStorage.setItem('loginedMember', JSON.stringify(response.data));
        } catch (err) {
            console.error(err);
        }
    }

    const getCourseById = async () => {
        try {
            const response = await api.get('Course/' + member.courseId);
            const res = response.data;

            setCourse(res);
        } catch (err) {
            console.error(err);
        }
    }

    const getAllMentors = async () => {
        try {
            const response = await api.get('Mentor/list');
            const res = response.data;
            setMentor(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllMentors();
        getMemberByUID();
    }, [])

    useEffect(() => {
        getCourseById();
    }, [member])

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'instant'
        });
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
                    {
                        mentor.length > 0 ? mentor.map((item, index) => (
                            course != null ? (
                                <tr>
                                    <td className='course-no-content'>{index + 1}</td>
                                    <td className='course-mentor-content'>{item.fullName}</td>
                                    <td className='course-course-name'>{course.name}</td>
                                    <td className='course-schedule-content'>
                                        <Link to={`/danh-sach-khoa-hoc/khoa-hoc/${item.mentorId}/${course.courseId}`}>Xem chi tiết</Link>
                                    </td>
                                </tr>
                            ) : (
                                null
                            )
                        )) : (
                            <h1>Không có dữ liệu</h1>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PracticeList