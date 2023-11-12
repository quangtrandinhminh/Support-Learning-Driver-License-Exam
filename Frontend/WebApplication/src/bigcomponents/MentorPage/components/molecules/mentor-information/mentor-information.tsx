import './mentor-information.scss'
import api from '../../../../../config/axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

function MentorInformation() {
  const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
  const [mentor, setMentor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [course, setCourse] = useState(null);
    const handleScroll = () => {
      window.scroll( {
          top: 0,
          behavior: 'instant'
      });
  }
  const getMentorbyId = async () => {
    try {
      const response = await api.get('Mentor/user' + user.userID);
      setMentor(response.data);
      sessionStorage.setItem('loginedMentor', JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      getMentorbyId();
    }
  }, [user]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      window.scroll( {
          top: 0,
          behavior: 'instant'
      });
      navigate('/thong-tin-ca-nhan-giao-vien/cap-nhat')
  }

  const formatDate = (dbDate) => {
      const date = new Date(dbDate);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
  }
  return (
    <>
            <div className='mentor-information-container'>
                <h1 className='mentor-information-title'>Thông tin giáo viên</h1>
                <div className='mentor-information-content'>
                    {
                        mentor != null ? (
                            isLoading == false ? (
                                <>
                                    <div className='mentor-avatar'>
                                        {/* <img src={MemberImg} alt="hinh-anh-giang-vien" /> */}
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <li>
                                            <label htmlFor="name">Họ và tên: </label>
                                            <span>{mentor.fullName}</span>
                                        </li>
                                        <li className='line-1'>
                                            <div className='dob-container'>
                                                <label htmlFor="dob">Ngày sinh: </label>
                                                <span>{formatDate(mentor.dob)}</span>
                                            </div>
                                            <div className="gender-container">
                                                <label htmlFor="gender">Giới tính: </label>
                                                <span>{mentor.gender}</span>
                                            </div>
                                        </li>
                                        <li className='line-2'>
                                            <div className='nationality-container'>
                                                <label htmlFor="nationality">Quốc tịch: </label>
                                                <span>{mentor.nationality}</span>
                                            </div>
                                            <div className="nation-container">
                                                <label htmlFor="nation">Dân tộc: </label>
                                                <span>Kinh</span>
                                            </div>
                                        </li>
                                        <li>
                                            <label htmlFor="phoneNo">Điện thoại di động: </label>
                                            <span>{mentor.phone}</span>
                                        </li>
                                        <li>
                                            <label htmlFor="email">Email: </label>
                                            <span>{mentor.email}</span>
                                        </li>
                                        <li>
                                            <label htmlFor="residenceAddress"><strong><i>Địa chỉ thường trú: </i></strong></label>
                                            <span >{mentor.residenceAddress}</span>
                                        </li>
                                        <li>
                                            <label htmlFor="cccdNo"><strong><i>Số CCCD/CMND: </i></strong></label>
                                            <span>{mentor.identityCardNumber}</span>
                                        </li>
                                        <li>
                                            <label htmlFor="studentID"><strong><i>Mã số học viên: </i></strong></label>
                                            <span>{`${mentor.courseId}.${mentor.memberID}`}</span>
                                        </li>
                                        <li>
                                            <label htmlFor="courseID"><strong><i>Khoá học: </i></strong></label>
                                            <span>{course.name}</span>
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

export default MentorInformation