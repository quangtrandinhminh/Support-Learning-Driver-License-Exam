import { Link, useNavigate } from 'react-router-dom'
import './registered-course.scss'
import { useEffect, useState } from 'react'
import api from '../../../config/axios';
import { Backdrop, CircularProgress } from '@mui/material';

function RegisteredCourse() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const username = user.username;

    const [userInf, setUserInf] = useState(null);
    const [member, setMember] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function handleScroll() {
        window.scrollTo(0, 0);
    }

    const navigate = useNavigate();

    const getUserbyUsername = async () => {
        try {
            const response = await api.get('User?username=' + username);
            const res = response.data;
            setUserInf(res.payload);
        } catch (err) {
            console.log(err);
        }
    }

    const getMemberById = async () => {
        try {
            const respone = await api.post('Member?userID=' + userInf.userID);
            const res = respone.data;
            setMember(res.payload);
            console.log(member);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserbyUsername();
    }, [])

    useEffect(() => {
        getMemberById();
        console.log(member);
    }, [userInf])


    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="registered-course-container">
            <h1 className='registered-course-title'>khoá học của bạn</h1>
            {
                !isLoading ? (
                    <div className='registered-course-content'>
                        <ul>
                            <li>
                                <label htmlFor="course-name">Khoá học: {member.courseId}</label>
                            </li>
                            <li>
                                <label htmlFor="course-start">Ngày khai giảng: </label>
                            </li>
                            <li>
                                <label htmlFor="course-mentor">
                                    Giáo viên phụ trách: <Link to='/khoa-hoc-cua-ban/thong-tin-giao-vien'>Tên giáo viên</Link>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="course-theory">
                                    <Link to='/khoa-hoc-cua-ban/lich-hoc-ly-thuyet'>Lịch học lý thuyết</Link>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="course-practice">
                                    <Link to='/khoa-hoc-cua-ban/lich-hoc-thuc-hanh'>Lịch học thực hành</Link>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="course-theory-location">
                                    <Link to='/danh-sach-khoa-hoc'>Đăng ký lịch học thực hành</Link>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="course-theory-location">Địa điểm học lý thuyết: </label>
                            </li>
                            <li>
                                <label htmlFor="course-practice-location">Địa điểm học thực hành: </label>
                            </li>
                            <li>
                                <form>
                                    <label htmlFor="exam-application">
                                        <Link to='/ho-so-thi'>Hồ sơ thi</Link>
                                    </label>
                                </form>
                            </li>
                        </ul>
                    </div>
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
            }

        </div>
    )
}

export default RegisteredCourse