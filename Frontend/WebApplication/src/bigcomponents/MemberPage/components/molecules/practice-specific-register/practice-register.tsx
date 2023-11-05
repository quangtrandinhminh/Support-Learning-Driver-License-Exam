import React from 'react'
import './practice-register.scss'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function PracticeSpecificRegister() {

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.scroll( {
            top: 0,
            behavior: 'instant'
        });
        toast.success("Đăng ký học thực hành thành công");
        navigate('/khoa-hoc-cua-ban');
    }

    return (
        <div className='practice-register-container'>
            <div className='title-container'>
                <h1 className='practice-container-title'>Đăng ký lịch học thực hành</h1>
                <h2 className='practice-container-subtitle'>
                    Giáo viên: Nguyễn Văn A
                    <br />
                    Xe số: 51A-012xx (Hạn TL: dd/mm/yyyy)
                    <br />
                    Xe tự động: 51A-267xx (Hạn TL: dd/mm/yyyy)
                </h2>
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
                <form onSubmit={handleSubmit}>
                    <table>

                        <thead>
                            <tr>
                                <th rowSpan={1} className='practice-day w-25'>Thứ</th>
                                <th rowSpan={1} className='practice-time'>Ca học</th>
                                <th rowSpan={1} className='practice-time'></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sáng</td>
                                <td>Thứ hai hàng tuần</td>
                                <td>
                                    <button className='register-btn'>Đăng ký</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Chiều</td>
                                <td>Thứ hai hàng tuần</td>
                                <td>
                                    <button className='register-btn'>Đăng ký</button>
                                </td>
                            </tr>
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