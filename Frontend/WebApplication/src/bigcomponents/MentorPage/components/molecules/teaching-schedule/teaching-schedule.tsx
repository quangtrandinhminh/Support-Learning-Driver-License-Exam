import { useState, useEffect } from 'react';
import api from '../../../../../config/axios';
import './teaching-schedule.scss';

function TeachingSchedule() {
    const mentor = sessionStorage.getItem('loginedMentor') ? JSON.parse(sessionStorage.getItem('loginedMentor')) : null;
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const [mentorClass, setMentorClass] = useState(null);

    const getClassByMentorID = async () => {
        try {
            const response = await api.get(`Class/${mentor.mentorId}`);
            setMentorClass(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClassByMentorID();
    }, []);

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [weekDates, setWeekDates] = useState([]);

    useEffect(() => {
        const startOfWeek = new Date(selectedYear, 0, 1 + (selectedWeek - 1) * 7);
        const dates = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i);
            const dayOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][currentDate.getDay()];
            dates.push(`${dayOfWeek}: ${currentDate.getDate()}/${currentDate.getMonth() + 1}`);
        }

        setWeekDates(dates);
    }, [selectedYear, selectedWeek]);

    return (
        // <div>
        //     <h1>Teaching Schedule</h1>
        //     <div>
        //         <label>Select Year: </label>
        //         <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
        //             {Array.from({ length: 5 }, (_, i) => (
        //                 <option key={i} value={selectedYear + i}>{selectedYear + i}</option>
        //             ), 0)}
        //         </select>
        //     </div>
        //     <div>
        //         <label>Select Week: </label>
        //         <input type="number" value={selectedWeek} onChange={(e) => setSelectedWeek(parseInt(e.target.value))} />
        //     </div>
        //     <div>
        //         <h2>Week {selectedWeek} Dates:</h2>
        //         <ul>
        //             {weekDates.map((date, index) => (
        //                 <li key={index}>{date}</li>
        //             ))}
        //         </ul>
        //     </div>
        // </div>

        <div className="teaching-schedule-container">
            <div>
                <h1>Lịch dạy</h1>
            </div>
            <div className="teaching-schedule">
                <form action="">
                    <table className="schedule-table">
                        <thead className="schedule-header-container">
                            <tr>
                                <th rowSpan={2} className='mini-title'>
                                    <span className="mini-title">
                                        <strong>Năm</strong>
                                    </span>
                                    <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
                                        {
                                            Array.from({ length: 5 }, (_, i) => (
                                                <option key={i} value={selectedYear + i}>{selectedYear + i}</option>
                                            ), 0)
                                        }
                                    </select>
                                    <br />
                                    <span className="mini-title">
                                        <strong>Tuần</strong>
                                    </span>
                                    <select value={selectedWeek} onChange={(e) => setSelectedWeek(parseInt(e.target.value))}>
                                        {
                                            Array.from({ length: 52 }, (_, i) => (
                                                <option key={i} value={i + 1}>{i + 1}</option>
                                            ), 0)
                                        }
                                    </select>

                                </th>
                                <th align="center">Thứ hai</th>
                                <th align="center">Thứ ba</th>
                                <th align="center">Thứ tư</th>
                                <th align="center">Thứ năm</th>
                                <th align="center">Thứ sáu</th>
                                <th align="center">Thứ bảy</th>
                                <th align="center">Chủ nhật</th>
                            </tr>
                            <tr>
                                <th align="center">{weekDates[0]}</th>
                                <th align="center">{weekDates[1]}</th>
                                <th align="center">{weekDates[2]}</th>
                                <th align="center">{weekDates[3]}</th>
                                <th align="center">{weekDates[4]}</th>
                                <th align="center">{weekDates[5]}</th>
                                <th align="center">{weekDates[6]}</th></tr>
                        </thead>
                        <tbody className="schedule-body">
                            <tr>
                                <td>Ca sáng</td>
                                <td>
                                    <p>
                                        <a href='lich-day/chi-tiet-lich-day'>Thực hành</a>
                                        <br />
                                        Buổi thứ 1
                                        <br />
                                        <a href='lich-day/danh-sach-hoc-vien'>Lớp: XXB2</a>
                                        <br />
                                        Trạng thái: Đã dạy
                                    </p>
                                </td>
                                <td>-</td>
                                <td>
                                    <p>
                                        <a href='lich-day/chi-tiet-lich-day'>Thực hành</a>
                                        <br />
                                        Buổi thứ 3
                                        <br />
                                        <a href='lich-day/danh-sach-hoc-vien'>Lớp: XXB2</a>
                                        <br />
                                        Trạng thái: Đã dạy
                                    </p>
                                </td>
                                <td>-</td>
                                <td>
                                    <p>
                                        <a href='lich-day/chi-tiet-lich-day'>Thực hành</a>
                                        <br />
                                        Buổi thứ 5
                                        <br />
                                        <a href='lich-day/danh-sach-hoc-vien'>Lớp: XXB2</a>
                                        <br />
                                        Trạng thái: Đã dạy
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>Ca chiều</td>
                                <td>-</td>
                                <td>
                                    <p>
                                        <a href='lich-day/chi-tiet-lich-day'>Thực hành</a>
                                        <br />
                                        Buổi thứ 2
                                        <br />
                                        <a href='lich-day/danh-sach-hoc-vien'>Lớp: XXB2</a>
                                        <br />
                                        Trạng thái: Đã dạy
                                    </p>
                                </td>
                                <td>-</td>
                                <td>
                                    <p>
                                        <a href='lich-day/chi-tiet-lich-day'>Thực hành</a>
                                        <br />
                                        Buổi thứ 4
                                        <br />
                                        <a href='lich-day/danh-sach-hoc-vien'>Lớp: XXB2</a>
                                        <br />
                                        Trạng thái: Đã dạy
                                    </p>
                                </td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>Ca tối</td>
                                <td><p>
                                    <a href='lich-day/chi-tiet-lich-day'>Thực hành</a>
                                    <br />
                                    Buổi thứ 1
                                    <br />
                                    <a href='lich-day/danh-sach-hoc-vien'>Lớp: XXB2</a>
                                    <br />
                                    Trạng thái: Đã dạy
                                </p></td>
                                <td>
                                    <p>
                                        <a href='lich-day/chi-tiet-lich-day'>Thực hành</a>
                                        <br />
                                        Buổi thứ 2
                                        <br />
                                        <a href='lich-day/danh-sach-hoc-vien'>Lớp: XXB2</a>
                                        <br />
                                        Trạng thái: Đã dạy
                                    </p>
                                </td>
                                <td><p>
                                    <a href='lich-day/chi-tiet-lich-day'>Thực hành</a>
                                    <br />
                                    Buổi thứ 3
                                    <br />
                                    <a href='lich-day/danh-sach-hoc-vien'>Lớp: XXB2</a>
                                    <br />
                                    Trạng thái: Đã dạy
                                </p></td>
                                <td>
                                    <p>
                                        <a href='lich-day/chi-tiet-lich-day'>Thực hành</a>
                                        <br />
                                        Buổi thứ 4
                                        <br />
                                        <a href='lich-day/danh-sach-hoc-vien'>Lớp: XXB2</a>
                                        <br />
                                        Trạng thái: Đã dạy
                                    </p>
                                </td>
                                <td><p>
                                    <a href='lich-day/chi-tiet-lich-day'>Thực hành</a>
                                    <br />
                                    Buổi thứ 5
                                    <br />
                                    <a href='lich-day/danh-sach-hoc-vien'>Lớp: XXB2</a>
                                    <br />
                                    Trạng thái: Đã dạy
                                </p></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

export default TeachingSchedule;
