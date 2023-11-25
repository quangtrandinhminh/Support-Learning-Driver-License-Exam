import { useEffect, useState } from 'react'
import './theory-schedule.scss'
import api from '../../../../../config/axios';

function TheorySchedule() {
    const member = sessionStorage.getItem('loginedMember') ? JSON.parse(sessionStorage.getItem('loginedMember')) : null;
    const [theorySchedule, setTheorySchedule] = useState([]);
    const [mentorID, setMentorID] = useState(null);
    const [mentor, setMentor] = useState(null);
    const [student, setStudent] = useState(null);

    const getStudentByMID = async () => {
        try {
            const response = await api.get("Student/" + member.memberID);
            setStudent(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getLessonBySID = async () => {
        try {
            const response = await api.get("Lesson/theory/student/" + student.studentId);
            setTheorySchedule(response.data);
            const tempId = Array.from(new Set(response.data.map(item => item.mentorId)));
            setMentorID(tempId[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const getMentorByID = async () => {
        try {
            if (mentorID) {
                const response = await api.get("Mentor/" + mentorID);
                setMentor(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getStudentByMID();
    }, [])

    useEffect(() => {
        getLessonBySID();
    }, [student])

    useEffect(() => {
        getMentorByID();
    }, [theorySchedule])

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className='theory-schedule-container'>
            <div className='title-container'>
                <h1 className='theory-container-title'>Lịch học lý thuyết</h1>
                <h4 className='theory-container-subtitle'>
                    Thời gian học lý thuyết từ ngày ... đến hết ngày ...
                    <br />
                    Buổi sáng từ 7h30 đến 11h30; buổi chiều từ 13h00 đến 17h00
                </h4>
            </div>
            {theorySchedule.length > 0 ? (
                <table>
                    <thead>
                        <tr className='text-center'>
                            <th className='class-no'>STT</th>
                            <th className='class-time'>Thời gian</th>
                            <th className='class-mentor'>Giáo viên</th>
                            <th className='class-content'>Nội dung</th>
                            <th className='class-destination'>Địa điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mentor != null ? (
                                theorySchedule.map((item, index) => (
                                    <tr key={index}>
                                        <td className='class-no-content'>{index + 1}</td>
                                        <td className='class-time-content'>{formatDate(item.date)}</td>
                                        <td className='class-mentor-content'>{mentor.fullName}</td>
                                        <td className='class-content-content'>{item.lessonContent}</td>
                                        <td className='class-destination-content'>{item.location}</td>
                                    </tr>
                                )
                                )
                            ) : (
                                null
                            )
                        }
                    </tbody>
                </table>
            ) : (
                <h1>Chưa có lịch trình học</h1>
            )}
            <h3 className='theory-schedule-note'>
                Ghi chú: Học viên tham gia học và điểm danh đầy đủ theo quy định.
                Học viên cần tham gia hơn 90% tổng số buổi học lý thuyết để đủ điều kiện
                tham gia cuộc kiểm tra lý thuyết.
            </h3>
        </div>
    )
}

export default TheorySchedule