import React, { useEffect, useState } from 'react'
import './practice-register.scss'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import api from '../../../../../config/axios';
import { get } from 'react-scroll/modules/mixins/scroller';
import { Button, Modal } from 'react-bootstrap';

function PracticeSpecificRegister() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const [member, setMember] = useState(null); // Store member
    const [student, setStudent] = useState(null); // Store student
    const { mentorId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [mentor, setMentor] = useState(null); // Store mentor
    const [practiceSchedule, setPracticeSchedule] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const getPracticeSchedule = async () => {
        try {
            const response = await api.get('Lesson/practice/student/' + student.studentId);
            const tempId = Array.from(new Set(response.data.map(item => item.mentorId)));
            setPracticeSchedule(response.data);
        } catch (err) {
            console.error(err);
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

    const handleNavigate = () => {
        navigate('/khoa-hoc-cua-ban/lich-hoc-thuc-hanh');
    }

    useEffect(() => {
        getClassByCourseId();
        getMentorById();
        getMemberByUID();
    }, [])

    useEffect(() => {
        getStudentByUID();
    }, [member])

    useEffect(() => {
        getPracticeSchedule();
    }, [student])

    const handleRegister = async (studentId, classId) => {
        try {
            const response = await api.post('ClassStudent', {
                studentId: studentId,
                classId: classId
            });
            if (response.status == 200) {
                toast.success('Đăng ký thành công!');
                navigate('/khoa-hoc-cua-ban');
            }
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
                    <div className='practice-date-expected tw-justify-center'>
                        <div className='practice-session tw-text-center'>
                            <p className='morning-register'>Ca học sáng từ 8h00 - 12h00</p>
                            <p className='afternoon-register'>Ca học chiều từ 13h00 - 17h00</p>
                        </div>
                    </div>
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
                                            {
                                                practiceSchedule.length > 0 ? (
                                                    <button className='btn btn-primary' type='button' onClick={() => handleShow()}>Đăng ký</button>
                                                ) : (
                                                    <button className='btn btn-primary' type='button' onClick={() => handleRegister(student.studentId, lesson.classId)}>Đăng ký</button>
                                                )
                                            }
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
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                backdropClassName='backdrop'
                centered
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1>Chú ý</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>
                        Mỗi học viên chỉ được đăng ký một buổi học thực hành.
                    </h2>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleNavigate}>Lịch học thực hành của tôi</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PracticeSpecificRegister