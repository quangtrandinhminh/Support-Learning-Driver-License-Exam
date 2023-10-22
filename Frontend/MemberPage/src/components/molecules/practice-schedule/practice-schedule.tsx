import './practice-schedule.scss'

function PracticeSchedule() {
    return (
        <div className='practice-schedule-container'>
            <div className='title-container'>
                <h1 className='practice-container-title'>Lịch học thực hành</h1>
                <h2 className='practice-container-subtitle'>
                    Giáo viên: Nguyễn Văn A
                    <br />
                    Xe số: 51A-012xx (Hạn TL: dd/mm/yyyy)
                    <br />
                    Xe tự động: 51A-267xx (Hạn TL: dd/mm/yyyy)
                </h2>
            </div>
            <div className='practice-schedule-body'><div className='practice-information'>
                <div className='practice-date-expected'>
                    Thời gian từ ... đến ...:
                    <div className='practice-session'>
                        <p className='afternoon-schedule'>Ca học chiều từ 13h00 - 17h00</p>
                        <p className='evening-schedule'>Ca học đêm từ 18h00 đến 20h00</p>
                    </div>
                </div>
                <p className='practice-street-verify'>
                    Học thực hành trên tuyến đường của xe 51A-012xx và 51A-267.xx được cấp phép
                </p>
            </div>
                <form>
                    <thead>
                        <tr>
                            <th rowSpan={2} className='practice-time'>Ca học</th>
                            <th rowSpan={2} className='practice-yard'>Thực hành trên sân tập</th>
                            <th rowSpan={2} className='practice-cabin'>Thực hành trên cabin</th>
                            <th rowSpan={1} colSpan={3} className='practice-tLight'>Thực hành trên đường giao thông (DAT)</th>
                            <th rowSpan={2} className='practice-note'>Ghi chú</th>
                        </tr>
                        <tr>
                            <th className='practice-tLight-sub' colSpan={1}>Các ngày học</th>
                            <th className='practice-tLight-sub' colSpan={1}>Ngày ca đêm</th>
                            <th className='practice-tLight-sub' colSpan={1}>Ngày ca sáng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sáng</td>
                            <td>Thứ hai hàng tuần</td>
                            <td>
                                Thứ hai
                                13h10 - 14h40
                                và 15h00 - 16h30
                                07/08/2023
                            </td>
                            <td>
                                Thứ năm các ngày
                                12, 13, 14, 15, 16, 17/08/2023
                            </td>
                            <td>dd/mm/yyyy, dd/mm/yyyy</td>
                            <td>dd/mm/yyyy</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Chiều</td>
                            <td>Thứ hai hàng tuần</td>
                            <td>
                                Thứ hai
                                13h10 - 14h40
                                và 15h00 - 16h30
                                07/08/2023
                            </td>
                            <td>
                                Thứ năm các ngày
                                12, 13, 14, 15, 16, 17/08/2023
                            </td>
                            <td>dd/mm/yyyy, dd/mm/yyyy</td>
                            <td>dd/mm/yyyy</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </form>
            </div>
        </div>
    )
}

export default PracticeSchedule