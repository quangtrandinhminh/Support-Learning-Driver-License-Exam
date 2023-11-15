import React, { useEffect, useState } from 'react';
import './mentor-class-register.scss';
import api from '../../../../../config/axios';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function MentorClassRegister() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const [course, setCourse] = useState([]);
    const [mentor, setMentor] = useState(null);
    const [teachingSchedule, setTeachingSchedule] = useState([]);
    const navigate = useNavigate();

    const getMentorByID = async () => {
        try {
            const response = await api.get('Mentor/user/' + user.userID);
            setMentor(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getCourseByID = async () => {
        try {
            const response = await api.get('Course/list');
            setCourse(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTeachingSchedule = async () => {
        try {
            const response = await api.get('Class/' + mentor.mentorId);
            setTeachingSchedule(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const isCourseRegistered = (courseId) => {
        return teachingSchedule.some((schedule) => schedule.courseId === courseId);
    };

    const handleRegister = (courseId) => {
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
        navigate(`/danh-sach-khoa-hoc-giao-vien/dang-ki-lich-day/${courseId}`);
    };

    useEffect(() => {
        getMentorByID();
    }, []);

    useEffect(() => {
        if (mentor) {
            getTeachingSchedule();
        }
    }, [mentor]);

    useEffect(() => {
        getCourseByID();
    }, [mentor, teachingSchedule]);

    return (
        <>
            <div className="class-register-title">
                <h1>Danh sách các khóa học B2</h1>
            </div>
            <div className="class-register-container">
                <form action="">
                    <table className="class-register-table">
                        <thead className="class-register-table-header">
                            <tr>
                                <th>STT</th>
                                <th>Mã khóa học</th>
                                <th>Tên khóa học</th>
                                <th>Thời gian</th>
                                <th>Phân loại</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="class-table-body">
                            {course != null ? (
                                course.map((course, index) => (
                                    <tr key={course.courseId}>
                                        <td>{index + 1}</td>
                                        <td>{course.courseId}</td>
                                        <td>{course.name}</td>
                                        <td>{formatDate(course.startDate)} - {formatDate(course.endDate)}</td>
                                        <td>Thực hành</td>
                                        <td>
                                            <Button
                                                onClick={() => handleRegister(course.courseId)}
                                                disabled={isCourseRegistered(course.courseId)}
                                            >
                                                Đăng kí
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>No data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
}

export default MentorClassRegister;
