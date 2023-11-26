import { useEffect, useState } from 'react';
import './practice-schedule.scss'
import api from '../../../../../config/axios';

function PracticeSchedule() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;

    const [isLoading, setIsLoading] = useState(true);
    const [member, setMember] = useState(null);
    const [student, setStudent] = useState(null);
    const [mentorID, setMentorID] = useState(null); // [1, 2, 3
    const [practiceSchedule, setPracticeSchedule] = useState([]);
    const [mentor, setMentor] = useState(null);

    const getMemberByUID = async () => {
        try {
            const response = await api.get('Member/' + user.userID);
            setMember(response.data);
            sessionStorage.setItem('loginedMember', JSON.stringify(response.data));
        } catch (err) {
            console.error(err);
        }
    }

    const getStudentById = async () => {
        try {
            const response = await api.get('Student/' + member.memberID);
            const res = response.data;
            setStudent(res);
        } catch (err) {
            console.error(err);
        }
    }

    const getPracticeSchedule = async () => {
        try {
            const response = await api.get('Lesson/practice/student/' + student.studentId);
            const tempId = Array.from(new Set(response.data.map(item => item.mentorId)));
            setMentorID(tempId);
            setPracticeSchedule(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const getMentorById = async () => {
        try {
            const response = await api.get('Mentor/' + mentorID);
            setMentor(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        getMemberByUID();
    }, [])

    useEffect(() => {
        getStudentById();
    }, [member])

    useEffect(() => {
        getPracticeSchedule();
    }, [student])

    useEffect(() => {
        getMentorById();
    }, [practiceSchedule])

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'instant'
        });
    }, [])

    return (
        <div className='practice-schedule-container'>
            <div className='title-container'>
                <h1 className='practice-container-title'>Lịch học thực hành</h1>
                {
                    mentor != null ? (
                        <>
                            <h2 className='practice-container-subtitle'>
                                Giáo viên: {mentor.fullName}
                            </h2>
                        </>
                    ) : (
                        null
                    )
                }
            </div>
            <div className="practice-schedule-body">
                <div className='practice-information'>
                    <div className='practice-date-expected'>
                        Các ca học:
                        <div className='practice-session'>
                            <p className='morning-schedule'>Ca học sáng từ 8h00 - 12h00</p>
                            <p className='afternoon-schedule'>Ca học chiều từ 13h00 - 17h00</p>
                            <p className='evening-schedule'>Ca học đêm từ 18h00 đến 20h00</p>
                        </div>
                    </div>
                    <p className='practice-street-verify'>
                        Học thực hành trên tuyến đường của xe 51A-012.72 và 51A-820.11 được cấp phép
                    </p>
                </div>
                <form>
                    <table>
                        <thead>
                            <tr>
                                <th rowSpan={1} className='practice-no'>STT</th>
                                <th rowSpan={1} className='practice-day'>Thứ</th>
                                <th rowSpan={1} className='practice-time'>Ca học</th>
                                <th rowSpan={1} className='practice-time'>Nội dung</th>
                                <th rowSpan={1} className='practice-time'>Ngày</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                practiceSchedule.length > 0 ? (
                                    practiceSchedule.map((lesson, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{lesson.dayOfWeek == "Monday" ? "Thứ hai" :
                                                lesson.dayOfWeek == "Tuesday" ? "Thứ ba" :
                                                    lesson.dayOfWeek == "Wednesday" ? "Thứ tư" :
                                                        lesson.dayOfWeek == "Thursday" ? "Thứ năm" :
                                                            lesson.dayOfWeek == "Friday" ? "Thứ sáu" : ""}</td>
                                            <td>{lesson.shift}</td>
                                            <td>{lesson.title}</td>
                                            <td>{formatDate(lesson.date)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <td colSpan={6}>
                                        <h1 className='tw-text-realRed'>Bạn chưa đăng ký khoá học nào!</h1>
                                    </td>
                                )
                            }
                        </tbody>
                    </table>
                    <div className='practice-schedule-note'>
                        <h2 className='fst-italic'>Lưu ý: Học viên phải bắt buộc tham gia ca học đêm và  học đủ các buổi học để có thể tham gia thi bằng lái xe B2</h2>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PracticeSchedule