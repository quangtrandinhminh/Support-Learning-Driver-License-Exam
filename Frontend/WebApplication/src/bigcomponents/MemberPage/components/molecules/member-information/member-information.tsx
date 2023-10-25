import './member-information.scss'
import MemberImg from '../../../../../../assets/imgs/member/member_img.png'
import { useNavigate } from 'react-router-dom'
import api from '../../../../../config/axios';
import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function MemberInformationForm() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const username = user.username;

    const [userInf, setUserInf] = useState(null);
    const [member, setMember] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPaid, setIsPaid] = useState(null);

    const handleScroll = () => {
        window.scrollTo(0, 0);
    }

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate('/thong-tin-ca-nhan/cap-nhat')
    }

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
            const response = await api.post('Member?userID=' + userInf.userID);
            const res = response.data;
            setMember(res.payload);
            setIsPaid(res.payload.isPaid);
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
    }, [userInf])

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className='member-information-container'>
            <h1 className='member-information-title'>Thông tin cá nhân</h1>
            <div className='member-information-content'>
                {
                    !isLoading ? (
                        <>
                            <div className='member-avatar'>
                                <img src={MemberImg} alt="hinh-anh-giang-vien" />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <li>
                                    <label htmlFor="name">Họ và tên: </label>
                                    <span>{userInf.fullName}</span>
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
                                    <span>{userInf.phone}</span>
                                </li>
                                <li>
                                    <label htmlFor="email">Email: </label>
                                    <span>{userInf.email}</span>
                                </li>
                                <li>
                                    <label htmlFor="residenceAddress"><strong><i>Địa chỉ thường trú: </i></strong></label>
                                    <span >{member.residenceAddress}</span>
                                </li>
                                <li>
                                    <label htmlFor="cccdNo"><strong><i>Số CCCD/CMND: </i></strong></label>
                                    <span>{member.identityCardNumber}</span>
                                </li>
                                <li>
                                    <label htmlFor="studentID"><strong><i>Mã số học viên: </i></strong></label>
                                    <span>{`${member.courseId}.${member.memberID}`}</span>
                                </li>
                                <li>
                                    <label htmlFor="courseID"><strong><i>Khoá học: </i></strong></label>
                                    <span>{member.courseId}</span>
                                </li>
                                <button className='update-btn' type='submit' onClick={handleScroll}>Cập nhật</button>
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
                    )
                }
            </div>
        </div>
    )
}

export default MemberInformationForm