import React from 'react'
import './theory-schedule.scss'

function TheorySchedule() {
    return (
        <div className='theory-schedule-container'>
            <div className='title-container'>
                <h1 className='theory-container-title'>Lịch học lý thuyết</h1>
                <h2 className='theory-container-subtitle'>
                    Thời gian học lý thuyết từ ngày ... đến hết ngày ...
                    <br />
                    Buổi sáng từ 7h30 đến 11h30; buổi chiều từ 13h00 đến 17h00
                </h2>
            </div>
            <table border={1}>
                <thead>
                    <tr>
                        <th className='class-no'>STT</th>
                        <th className='class-time'>Thời gian</th>
                        <th className='class-mentor'>Giáo viên</th>
                        <th className='class-content'>Nội dung</th>
                        <th className='class-destination'>Địa điểm</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='class-no-content'>1</td>
                        <td className='class-time-content'>Ngày 16/09/2023
                            <br />
                            Thứ bảy</td>
                        <td className='class-mentor-content'>Nguyễn Văn A</td>
                        <td className='class-content-content'>Hướng dẫn lý thuyết Luật GTĐB.
                            Hỗ trợ học viên cách điểm danh, quét Thẻ và phản hồi thông tin, thời gian</td>
                        <td className='class-destination-content'>Địa điểm</td>
                    </tr>
                    <tr>
                        <td className='class-no-content'>2</td>
                        <td className='class-time-content'>Ngày 17/09/2023
                            <br />
                            Chủ nhật</td>
                        <td className='class-mentor-content'>Nguyễn Văn A</td>
                        <td className='class-content-content'>Hướng dẫn học viên học lý thuyết Phần Quy tắc chung Luật GTĐB,
                            Phần biển báo hiệu đường bộ. Ôn luyện</td>
                        <td className='class-destination-content'>Địa điểm</td>
                    </tr>
                    <tr>
                        <td className='class-no-content'>3</td>
                        <td className='class-time-content'>Ngày 18/09/2023
                            <br />
                            Thứ hai</td>
                        <td className='class-mentor-content'>Nguyễn Văn A</td>
                        <td className='class-content-content'>Hướng dẫn học viên học lý thuyết Phần Nghiệp vụ vận tải,
                            Phần Đạo đức người lái xe. Ôn luyện P13</td>
                        <td className='class-destination-content'>Địa điểm</td>
                    </tr>
                    <tr>
                        <td className='class-no-content'>4</td>
                        <td className='class-time-content'>Ngày 19/09/2023
                            <br />
                            Thứ ba</td>
                        <td className='class-mentor-content'>Nguyễn Văn A</td>
                        <td className='class-content-content'>Hướng dẫn học viên học lý thuyết
                            Phần Cấu tạo, sửa chữa thông thường. Ôn luyện P13</td>
                        <td className='class-destination-content'>Địa điểm</td>
                    </tr>
                    <tr>
                        <td className='class-no-content'>5</td>
                        <td className='class-time-content'>Ngày 20/09/2023
                            <br />
                            Thứ tư</td>
                        <td className='class-mentor-content'>Nguyễn Văn A</td>
                        <td className='class-content-content'>Hướng dẫn học viên học lý thuyết Phần Cấu tạo,
                            sửa chữa thông thường. Ôn luyện P13</td>
                        <td className='class-destination-content'>Địa điểm</td>
                    </tr>
                </tbody>
            </table>
            <h2 className='theory-schedule-note'>
                Ghi chú: Học viên tham gia học và điểm danh đầy đủ theo quy định.
                Học viên cần tham gia hơn 90% trong tổng số buổi lý thuyết để đủ điều kiện
                tham gia cuộc thi sát hạch lái xe
            </h2>
        </div>
    )
}

export default TheorySchedule