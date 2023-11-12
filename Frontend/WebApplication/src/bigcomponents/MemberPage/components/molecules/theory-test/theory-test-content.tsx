// import React, { useEffect } from 'react'
import { useEffect, useState } from 'react';
import './theory-test-content.scss'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import api from '../../../../../config/axios';

function TheoryTestContent() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const navigate = useNavigate();

    const [member, setMember] = useState(null);
    const [student, setStudent] = useState(null);
    const [theoryTest, setTheoryTest] = useState(null);

    const getMemberByUID = async () => {
        try {
            const response = await api.get('Member/' + user.userID);
            setMember(response.data);

        } catch (err) {
            console.error(err);
        }
    }

    const getStudentById = async () => {
        try {
            const response = await api.get('Student/' + member.memberID);
            const res = response.data;
            setStudent(res);
        } catch (err) {
            console.error(err);
        }
    }

    const getTheoryTestStatus = async () => {
        try {
            const response = await api.get('TestByStudentId?studentId=' + student.studentId);
            console.log(response.data);
            setTheoryTest(response.data);
        } catch (err) {
            console.error(err.response.data.error);
        }
    }

    useEffect(() => {
        getMemberByUID();
    }, []);

    useEffect(() => {
        getStudentById();
    }, [member]);

    useEffect(() => {
        if (student && student.studentId) {
            getTheoryTestStatus();
        }
    }, [student]);

    const handleClick = () => {
        toast.success('Chúc bạn làm bài tốt!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
        });
        navigate('bai-lam')
        window.scroll({
            top: 0,
            behavior: 'instant'
        });
    }

    return (
        <div className='theory-test-container'>
            <div className='theory-title-box'>
                <h1 className='theory-test-title tw-text-center'>Kiểm tra Lý Thuyết</h1>
                <h4 className='theory-test-subtitle tw-text-center'>Kỳ kiểm tra lý thuyết bằng B2 khoá XXXB2</h4>
            </div>
            <div className='theory-content'>
                <p className='first-part'>
                    Trong đề thi trắc nghiệm B2 do Trung tâm đào tạo bằng lái xe B2 FDRIVING biên soạn sẽ
                    gồm 35 câu hỏi và chỉ có 1 đáp án đúng duy nhất ở từng câu.
                    Dựa theo cấu trúc đề thi lý thuyết B2 chính thức, mỗi đề thi sát hạch lý thuyết B2 sẽ bao gồm:
                    1 câu hỏi phần khái niệm; 7 câu hỏi về quy tắc giao thông; 1 câu hỏi nghiệp vụ vận tải;
                    1 câu về tốc độ khoảng cách; 1 câu hỏi về văn hóa & đạo đức người lái xe; 2 câu hỏi về kỹ thuật lái xe;
                    1 câu hỏi về cấu tạo sữa chữa; 10 câu hỏi biển báo; 10 câu hỏi sa hình kèm theo 1 câu hỏi điểm liệt
                    (tình huống gây mất an toàn giao thông nghiêm trọng). Học viên ôn tập cần đáp ứng các yêu cầu sau:
                </p>
                <ul className='demand-list'>
                    <li>Số câu trả lời phải đúng từ 32/35 câu trở lên</li>
                    <li>Thời gian làm bài: 22 phút</li>
                    <li className='important-element tw-text-realRed'>KHÔNG LÀM SAI NHỮNG CÂU ĐIỂM LIỆT</li>
                </ul>
                <h5 className='second-part'>
                    <strong>
                        <i>
                            Lưu ý: Để có thể đăng ký và thamg ia lớp học thực hành sau này, học viên cần vượt qua bài kiểm tra này.
                            Những học viên có kết quả không đạt trong đợt kiểm tra lý thuyết này sẽ phải đợi lượt kiểm tra tiếp theo.
                        </i>
                    </strong>
                </h5>
            </div>
            {
                theoryTest == null ? (
                    <div className="btn-test">
                        <h4>Trạng thái bài kiểm tra: Không khả dụng</h4>
                        <Button className='theory-test-btn btn-primary' onClick={handleClick} disabled>Bắt đầu làm bài</Button>
                    </div>
                ) : (
                    <div className="btn-test">
                        <h4>Trạng thái bài kiểm tra: Khả dụng</h4>
                        <Button className='theory-test-btn btn-primary' onClick={handleClick}>Bắt đầu làm bài</Button>
                    </div >
                )
            }
        </div>
    )
}

export default TheoryTestContent