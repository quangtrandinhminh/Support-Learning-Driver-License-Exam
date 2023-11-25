import React, { useEffect, useState } from 'react'
import './practice-register.scss'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import api from '../../../../../config/axios';
import { get } from 'react-scroll/modules/mixins/scroller';

function PracticeSpecificRegister() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const [member, setMember] = useState(null); // Store member
    const [student, setStudent] = useState(null); // Store student
    const { mentorId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [mentor, setMentor] = useState(null); // Store mentor

    const [practiceClass, setPracticeClass] = useState([]); // Store practice class

    const getMemberByUID = async () => {
        try {
            const response = await api.get('Member/' + user.userID);
            setMember(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const getStudentByUID = async () => {
        try {
            const response = await api.get('Student/' + member.memberID);
            const res = response.data;
            setStudent(res);
            sessionStorage.setItem('loginedStudent', JSON.stringify(res));
        } catch (error) {
            console.log(error);
        }
    }

    const getClassByCourseId = async () => {
        try {
            const response = await api.get('Class/course/mentor/practice?courseId=' + courseId + '&mentorId=' + mentorId);
            const res = response.data;
            setPracticeClass(res);
        } catch (error) {
            console.log(error);
        }
    }

    const getMentorById = async () => {
        try {
            const response = await api.get('Mentor/' + mentorId);
            const res = response.data;
            setMentor(res);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getClassByCourseId();
        getMentorById();
        getMemberByUID();
    }, [])

    useEffect(() => {
        getStudentByUID();
    }, [member])

    const handleRegister = async (studentId, classId) => {
        try {
            const response = await api.post('ClassStudent', {
                studentId: studentId,
                classId: classId
            });
            const res = response.data;
            console.log(res);
            toast.success('Đăng ký thành công!');
            // navigate('/khoa-hoc-cua-ban');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='practice-register-container'>
            <div className='title-container'>
                <h1 className='practice-container-title'>Đăng ký lịch học thực hành</h1>
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
            <div className="practice-register-body">
                <div className='practice-information'>
                    <div className='practice-date-expected'>
                        Thời gian từ ... đến ...:
                        <div className='practice-session'>
                            <p className='morning-register'>Ca học sáng từ 8h00 - 12h00</p>
                            <p className='afternoon-register'>Ca học chiều từ 13h00 - 17h00</p>
                            <p className='evening-register'>Ca học đêm từ 18h00 đến 20h00</p>
                        </div>
                    </div>
                    <p className='practice-street-verify'>
                        Học thực hành trên tuyến đường của xe 51A-012xx và 51A-267.xx được cấp phép
                    </p>
                </div>
                <form>
                    <table>

                        <thead>
                            <tr>
                                <th rowSpan={1} className='practice-no'>STT</th>
                                <th rowSpan={1} className='practice-day'>Thứ</th>
                                <th rowSpan={1} className='practice-time'>Ca học</th>
                                <th rowSpan={1} className='practice-time'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                practiceClass.length > 0 ? practiceClass.map((lesson, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{lesson.dayOfWeek == 2 ? "Thứ hai" :
                                            lesson.dayOfWeek == 3 ? "Thứ ba" :
                                                lesson.dayOfWeek == 4 ? "Thứ tư" :
                                                    lesson.dayOfWeek == 5 ? "Thứ năm" :
                                                        lesson.dayOfWeek == 6 ? "Thứ sáu" : ""}</td>
                                        <td>{lesson.shift}</td>
                                        <td>
                                            <button className='btn btn-primary' type='button' onClick={() => handleRegister(student.studentId, lesson.classId)}>Đăng ký</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <td colSpan={4}>
                                        <h1 className='tw-text-realRed'>Giáo viên chưa đăng ký lịch</h1>
                                    </td>
                                )
                            }
                        </tbody>
                    </table>
                    <div className='practice-register-note'>
                        <h2>Lưu ý: Học viên phải bắt buộc tham gia ca học đêm và  học đủ các buổi học để có thể tham gia thi bằng lái xe B2</h2>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PracticeSpecificRegister