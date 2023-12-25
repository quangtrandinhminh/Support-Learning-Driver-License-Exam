import './member-information.scss'
import MemberImg from '../../../../../../assets/imgs/member/member_img.png'
import { useNavigate } from 'react-router-dom'
import api from '../../../../../config/axios';
import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function MemberInformationForm() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;

    const [member, setMember] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [course, setCourse] = useState(null);
    const [student, setStudent] = useState(null);

    const handleScroll = () => {
        window.scroll({
            top: 0,
            behavior: 'instant'
        });
    }

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.scroll({
            top: 0,
            behavior: 'instant'
        });
        navigate('/thong-tin-ca-nhan/cap-nhat')
    }

    const getMemberByUID = async () => {
        try {
            const response = await api.get('Member/' + user.userID);
            const res = response.data;
            setMember(res);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const getStudentById = async () => {
        try {
            const response = await api.get('Student/' + member.memberID);
            const res = response.data;
            console.log(res);
            setStudent(res);
        } catch (err) {
            console.log(err);
        }
    }

    const getCourseById = async () => {
        try {
            const response = await api.get('Course/' + member.courseId);
            const res = response.data;
            console.log(res);
            setCourse(res);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMemberByUID();
    }, [])

    useEffect(() => {
        getCourseById();
    }, [member])

    useEffect(() => {
        getStudentById();
    }, [course])

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <>
            <div className='member-information-container'>
                <h1 className='member-information-title'>Thông tin thành viên</h1>
                <div className='member-information-content'>
                    {
                        member !== null && course !== null ? (
                            isLoading == false ? (
                                <>
                                    <div className='member-avatar'>
                                        <img src={MemberImg} alt="hinh-anh-thanh-vien" />
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <li>
                                            <label htmlFor="name">Họ và tên: </label>
                                            <span>{member.fullName}</span>
                                        </li>
                                        <li className='line-1'>
                                            <div className='dob-container'>
                                                <label htmlFor="dob">Ngày sinh: </label>
                                                <span>{formatDate(member.dob)}</span>
                                            </div>
                                            <div className="gender-container">
                                                <label htmlFor="gender">Giới tính: </label>
                                                <span>{member.gender}</span>
                                            </div>
                                        </li>
                                        <li className='line-2'>
                                            <div className='nationality-container'>
                                                <label htmlFor="nationality">Quốc tịch: </label>
                                                <span>{member.nationality}</span>
                                            </div>
                                            <div className="nation-container">
                                                <label htmlFor="nation">Dân tộc: </label>
                                                <span>Kinh</span>
                                            </div>
                                        </li>
                                        <li>
                                            <label htmlFor="phoneNo">Điện thoại di động: </label>
                                            <span>{member.phone}</span>
                                        </li>
                                        <li>
                                            <label htmlFor="email">Email: </label>
                                            <span>{member.email}</span>
                                        </li>
                                        <li>
                                            <label htmlFor="residenceAddress"><strong><i>Địa chỉ thường trú: </i></strong></label>
                                            <span >{member.residenceAddress}</span>
                                        </li>
                                        <li>
                                            <label htmlFor="cccdNo"><strong><i>Số CCCD/CMND: </i></strong></label>
                                            <span>{member.identityCardNumber}</span>
                                        </li>
                                        {
                                            student !== null ? (
                                                <>
                                                    <li>
                                                        <label htmlFor="studentID"><strong><i>Mã số học viên: </i></strong></label>
                                                        <span>{`${student.studentId}`}</span>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="courseID"><strong><i>Khoá học: </i></strong></label>
                                                        <span>{course.name}</span>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li>
                                                        <label htmlFor="studentID"><strong><i>Mã số học viên: </i></strong></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="courseID"><strong><i>Khoá học: </i></strong></label>
                                                    </li>
                                                </>
                                            )
                                        }
                                        {/* <button className='update-btn' type='submit' onClick={handleScroll}>Cập nhật</button> */}
                                    </form>
                                </>
                            ) : (
                                <>
                                    <Backdrop
                                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                        open={true}
                                    >
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                </>

                            )) : (
                            <>
                                <h1>Người dùng chưa có dữ liệu</h1>
                            </>
                        )
                    }
                </div>
            </div>
        </>

    )
}

export default MemberInformationForm