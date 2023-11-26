import React, { useEffect, useState } from 'react'
import './course-table.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../../../../config/axios';
import { Backdrop, CircularProgress } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CourseTable() {
    const member = sessionStorage.getItem('loginedMember') ? JSON.parse(sessionStorage.getItem('loginedMember')) : null;

    const { month } = useParams();
    const { year } = useParams();
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [course, setCourse] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    
    var courseContentMap = new Map();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const navigate = useNavigate();

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const getCourseData = async (month) => {
        try {
            const courseResponse = await api.get('Course/courseMonth?month=' + month + '&year=' + year);
            const courseDetailsResponse = await api.get(`/CourseDetail?courseMonth=${month}`);
            const validCourse = courseResponse.data.filter(course => {
                const courseStartDate = new Date(course.startDate);
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);

                // Compare day, month, and year components
                return courseStartDate >= currentDate;
            });

            const tempCourseData = validCourse.map(course => {
                const detailsForCourse = courseDetailsResponse.data.filter(detail => detail.courseId === course.courseId);
                return { ...course, details: detailsForCourse };
            });

            setData(tempCourseData);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleNavigate = () => {
        navigate('/khoa-hoc-cua-ban')
    }

    useEffect(() => {
        getCourseData(month);
    }, [month, year]);

    return (
        <>
            <div className='course-table-container' id='course-nav'>
                <h1 className='text-center course-title'>Thông tin khoá học</h1>
                <div className='course-table'>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <caption className='table-title'>
                                <h2>Các khoá học tháng {month}/{year}</h2>
                            </caption>
                            <tr className='content-title'>
                                <th>Thứ tự</th>
                                <th className='course-course'>Khoá học</th>
                                <th>Số lượng</th>
                                <th>Nội dung đào tạo</th>
                                <th>Thời gian</th>
                                <th></th>
                            </tr>
                            {
                                member != null ? (
                                    !isLoading ? (
                                        data.length > 0 ? (
                                            data.map((course, i) => (
                                                <tr key={i} >
                                                    <td className='course-no'>
                                                        <p>{i + 1}</p>
                                                    </td>
                                                    <td className='course-date'>
                                                        <p>Khoá {course.name}</p>
                                                        <p>KG: {formatDate(course.startDate)}</p>
                                                        <p>BG: {formatDate(course.endDate)}</p>
                                                    </td>
                                                    <td className='course-mem'>
                                                        <p>{course.limitStudent}</p>
                                                    </td>
                                                    {
                                                        course.details.length < 5 ? (
                                                            <>
                                                                <td className="course-training-content">
                                                                    <ol>
                                                                        {course.details.map((detail, j) => (
                                                                            <li key={j} className=''>{detail.courseContent}</li>
                                                                        ))}
                                                                    </ol>
                                                                </td>
                                                                <td className="course-training-time">
                                                                    <ol>
                                                                        {course.details.map((detail, j) => (
                                                                            <li key={j} className=''>
                                                                                {formatDate(detail.courseTimeStart)} - {formatDate(detail.courseTimeEnd)}
                                                                            </li>
                                                                        ))}
                                                                    </ol>
                                                                </td>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <td className="course-training-content">
                                                                    <ol>
                                                                        {course.details.map((detail, j) => (
                                                                            <li key={j} className=''>{detail.courseContent}</li>
                                                                        ))}
                                                                    </ol>
                                                                </td>
                                                                <td className="course-training-time">
                                                                    <ol>
                                                                        {course.details.map((detail, j) => (
                                                                            <li key={j} className=''>
                                                                                {formatDate(detail.courseTimeStart)} - {formatDate(detail.courseTimeEnd)}
                                                                            </li>
                                                                        ))}
                                                                    </ol>
                                                                </td>
                                                            </>
                                                        )
                                                    }
                                                    <td className='course-register'>
                                                        <Button className='btnRegister btn btn-primary' onClick={handleShow}>
                                                            Đăng ký
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <h1>không dữ liệu</h1>
                                        )
                                    ) : (

                                        <>
                                            <Backdrop
                                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                open={true}
                                            >
                                                <CircularProgress color="inherit" />
                                            </Backdrop>
                                        </>
                                    )
                                ) : (
                                    !isLoading ? (
                                        data.length > 0 ? (
                                            data.map((course, i) => (
                                                <tr key={i} >
                                                    <td className='course-no'>
                                                        <p>{i + 1}</p>
                                                    </td>
                                                    <td className='course-date'>
                                                        <p>Khoá {course.name}</p>
                                                        <p>KG: {formatDate(course.startDate)}</p>
                                                        <p>BG: {formatDate(course.endDate)}</p>
                                                    </td>
                                                    <td className='course-mem'>
                                                        <p>{course.limitStudent}</p>
                                                    </td>
                                                    {
                                                        course.details.length < 5 ? (
                                                            <>
                                                                <td className="course-training-content">
                                                                    <ol>
                                                                        {course.details.map((detail, j) => (
                                                                            <li key={j} className=''>{detail.courseContent}</li>
                                                                        ))}
                                                                    </ol>
                                                                </td>
                                                                <td className="course-training-time">
                                                                    <ol>
                                                                        {course.details.map((detail, j) => (
                                                                            <li key={j} className=''>
                                                                                {formatDate(detail.courseTimeStart)} - {formatDate(detail.courseTimeEnd)}
                                                                            </li>
                                                                        ))}
                                                                    </ol>
                                                                </td>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <td className="course-training-content">
                                                                    <ol>
                                                                        {course.details.map((detail, j) => (
                                                                            <li key={j} className=''>{detail.courseContent}</li>
                                                                        ))}
                                                                    </ol>
                                                                </td>
                                                                <td className="course-training-time">
                                                                    <ol>
                                                                        {course.details.map((detail, j) => (
                                                                            <li key={j} className=''>
                                                                                {formatDate(detail.courseTimeStart)} - {formatDate(detail.courseTimeEnd)}
                                                                            </li>
                                                                        ))}
                                                                    </ol>
                                                                </td>
                                                            </>
                                                        )
                                                    }
                                                    <td className='course-register'>
                                                        <Link to={`/khoahoc/xac-nhan-khoa-hoc/${course.name}`}>
                                                            <button className='btnRegister' onClick={() => localStorage.setItem('courseID', JSON.stringify(course.courseId))}>
                                                                Đăng ký
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <h1>không dữ liệu</h1>
                                        )
                                    ) : (

                                        <>
                                            <Backdrop
                                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                open={true}
                                            >
                                                <CircularProgress color="inherit" />
                                            </Backdrop>
                                        </>
                                    )
                                )
                            }
                        </table>
                    </form>
                </div>
                
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    backdropClassName='backdrop'
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Chú ý</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bạn không thể đăng ký thêm khoá học do bạn đã đăng ký khoá học trước đó.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={handleNavigate}>Khoá học của tôi</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>

    )
}

export default CourseTable
