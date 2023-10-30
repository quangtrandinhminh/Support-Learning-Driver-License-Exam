import MemberImg from '../../../../../../assets/imgs/member/member_img.png'
import { useNavigate } from 'react-router-dom'
import './update-information.scss'
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react'
import { Backdrop, CircularProgress } from '@mui/material';
import api from '../../../../../config/axios';

function UpdateInformationForm() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const username = user.username;

    const [userInf, setUserInf] = useState(null);
    const [member, setMember] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
            const response = await api.post('Member?userID=' + userInf.userID);
            const res = response.data;
            setMember(res);
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        toast.success("Cập nhật thông tin thành công.");
        navigate(`/thong-tin-ca-nhan/${username}`);
    }

    return (
        <div className='update-information-container'>
            <h1 className='update-information-title'>Cập nhật thông tin</h1>
            <div className='update-information-content'>
                {
                    !isLoading ? (
                        member != null ? (
                            <>
                                <div className='member-avatar'>
                                    <img src={MemberImg} alt="" />
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <li>
                                        <label htmlFor="name">Họ và tên: </label>
                                        <input type="text" name="name" id="" />
                                    </li>
                                    <li className='line-1'>
                                        <div className='dob-container'>
                                            <label htmlFor="dob">Ngày sinh: </label>
                                            <input type="date" name="dob" id="" />
                                        </div>
                                        <div className="gender-container">
                                            <div className='male'>
                                                <label htmlFor="gender-male">Nam: </label>
                                                <input type="radio" name="gender-male" id="" />
                                            </div>
                                            <div className='female'>
                                                <label htmlFor="gender-female">Nữ: </label>
                                                <input type="radio" name="gender-female" id="" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className='line-2'>
                                        <div className='nationality-container'>
                                            <label htmlFor="nationality">Quốc tịch: </label>
                                            <input type="text" name="nationality" id="" />
                                        </div>
                                        <div className="nation-container">
                                            <label htmlFor="nation">Dân tộc: </label>
                                            <input type="text" name="nation" id="" />
                                        </div>
                                    </li>
                                    <li>
                                        <label htmlFor="phoneNo">Điện thoại di động: </label>
                                        <input type="tel" name="phoneNo" id="" />
                                    </li>
                                    <li>
                                        <label htmlFor="email">Email: </label>
                                        <input type="email" name="email" id="" />
                                    </li>
                                    <li>
                                        <label htmlFor="residenceAddress"><strong><i>Địa chỉ thường trú: </i></strong></label>
                                        <span className='text-body-tertiary fst-italic'>{member.residenceAddress}</span>
                                    </li>
                                    <li>
                                        <label htmlFor="cccdNo"><strong><i>Số CCCD/CMND: </i></strong></label>
                                        <span className='text-body-tertiary fst-italic'>{member.identityCardNumber}</span>
                                    </li>
                                    <li>
                                        <label htmlFor="studentID"><strong><i>Mã số học viên: </i></strong></label>
                                        <span className='text-body-tertiary fst-italic'>{`${member.courseId}.${member.memberID}`}</span>
                                    </li>
                                    <li>
                                        <label htmlFor="courseID"><strong><i>Khoá học: </i></strong></label>
                                        <span className='text-body-tertiary fst-italic'>{member.courseId}</span>
                                    </li>
                                    <button type='submit' className='confirm-btn'>Xác nhận</button>
                                </form>
                            </>

                        ) : (
                            <h1>no data</h1>
                        )
                        
                    ) : (

                        <>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={true}>

                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default UpdateInformationForm