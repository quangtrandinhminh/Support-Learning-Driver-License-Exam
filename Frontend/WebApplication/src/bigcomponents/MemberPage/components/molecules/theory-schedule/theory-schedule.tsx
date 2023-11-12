import { useEffect, useState } from 'react'
import './theory-schedule.scss'
import api from '../../../../../config/axios';
import { get } from 'react-scroll/modules/mixins/scroller';

function TheorySchedule() {
    const member = sessionStorage.getItem('loginedMember') ? JSON.parse(sessionStorage.getItem('loginedMember')) : null;
    const [theorySchedule, setTheorySchedule] = useState([]);
    const [mentorID, setMentorID] = useState(null); // [mentorID, setMentorID
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
            let mentorId = Array.from(new Set(response.data.map((item) => item.mentorId)));
            setTheorySchedule(response.data);
            setMentorID(mentorId[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const getMentorByID = async () => {
        try {
            const response = await api.get("Mentor/" + mentorID);
            setMentor(response.data);
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
                            theorySchedule.map((item, index) => (
                                <tr key={index}>
                                    <td className='class-no-content'>{index + 1}</td>
                                    <td className='class-time-content'>{formatDate(item.date)}</td>
                                    <td className='class-mentor-content'>{mentor.fullName}</td>
                                    <td className='class-content-content'>
                                        {index === 0 ? "Hướng dẫn lý thuyết Luật GTĐB Hỗ trợ học viên cách điểm danh, quét Thẻ và phản hồi thông tin, thời gian." :
                                            index === 1 ? "Hướng dẫn học viên học lý thuyết Phần Quy tắc chung Luật GTĐB Phần biển báo hiệu đường bộ. Ôn luyện." :
                                                index === 2 ? "Hướng dẫn học viên học lý thuyết Phần Nghiệp vụ vận tải Phần Đạo đức người lái xe." :
                                                    index === 3 ? "Hướng dẫn học viên học lý thuyết Phần Cấu tạo, sửa chữa thông thường." :
                                                        index === 4 ? "Hướng dẫn học viên học lý thuyết Phần Cấu tạo, sửa chữa thông thường." :
                                                            index === 5 ? "Hướng dẫn học viên học lý thuyết Phần Cấu tạo, sửa chữa thông thường." :
                                                                index === 6 ? "Hướng dẫn học viên học lý thuyết Phần Cấu tạo, sửa chữa thông thường." :
                                                                    index === 7 ? "Hướng dẫn học viên học lý thuyết, ôn phần mềm mô phỏng." :
                                                                        index === 8 ? "Hướng dẫn học viên học lý thuyết, phần giải quyết các tình huống sa hình." :
                                                                            index === 9 ? "Hướng dẫn học viên học lý thuyết, phần giải quyết các tình huống sa hình" :
                                                                                index === 10 ? "Hướng dẫn học viên học lý thuyết, ôn luyện phần mềm mô phỏng, tập cabin" :
                                                                                    index === 11 ? "Hướng dẫn chạy đua với tử thần ở khu vực đồng quê" :
                                                                                        index === 12 ? "Hướng dẫn chạy trên nóc xe buýt và nhảy từ xe buýt xuống" : ''}
                                    </td>
                                    <td className='class-destination-content'>{item.location}</td>
                                </tr>
                            )
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