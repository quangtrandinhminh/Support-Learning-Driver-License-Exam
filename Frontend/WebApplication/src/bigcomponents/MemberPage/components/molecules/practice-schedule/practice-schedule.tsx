import { useEffect } from 'react';
import './practice-schedule.scss'

function PracticeSchedule() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='practice-schedule-container'>
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
            <div className="practice-schedule-body">
                <div className='practice-information'>
                    <div className='practice-date-expected'>
                        Thời gian từ ... đến ...:
                        <div className='practice-session'>
                            <p className='morning-schedule'>Ca học sáng từ 8h00 - 12h00</p>
                            <p className='afternoon-schedule'>Ca học chiều từ 13h00 - 17h00</p>
                            <p className='evening-schedule'>Ca học đêm từ 18h00 đến 20h00</p>
                        </div>
                    </div>
                    <p className='practice-street-verify'>
                        Học thực hành trên tuyến đường của xe 51A-012xx và 51A-267.xx được cấp phép
                    </p>
                </div>
                <form>
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
                                    <button className='schedule-btn'>Đăng ký</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Chiều</td>
                                <td>Thứ hai hàng tuần</td>
                                <td>
                                    <button className='schedule-btn'>Đăng ký</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='practice-schedule-note'>
                        <h2 className='fst-italic'>Lưu ý: Học viên phải bắt buộc tham gia ca học đêm và  học đủ các buổi học để có thể tham gia thi bằng lái xe B2</h2>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PracticeSchedule