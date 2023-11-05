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

    const getWeek = (date) => {
        const currentDate = date || new Date();
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const days = Math.floor((currentDate.getTime() - firstDayOfYear.getTime()) / 86400000); // Use .getTime() to get timestamps
        return Math.ceil((days + firstDayOfYear.getDay()) / 7);
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateOptions, setDateOptions] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(getWeek(selectedDate));

    const generateDateOptions = () => {
        const currentYear = selectedDate.getFullYear();
        const options = [];

        for (let week = 0; week < 52; week++) {
            const startDate = new Date(selectedDate.getTime() - (24 * 60 * 60 * 1000));
            const endDate = new Date(currentYear, 0, (week * 7) + 6);

            options.push({
                label: `${startDate.getDate()}/${startDate.getMonth() + 1} To ${endDate.getDate()}/${endDate.getMonth() + 1}`,
                value: week,
            });
        }

        setDateOptions(options);
    };



    useEffect(() => {
        generateDateOptions();
    }, [selectedDate]);

    useEffect(() => {
        // Update selectedDate based on selectedWeek
        const currentYear = selectedDate.getFullYear();
        const startDate = new Date(currentYear, 0, (selectedWeek - 1) * 7 + 1);
        setSelectedDate(startDate);
    }, [selectedWeek]);

    return (
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
                                    <select
                                        value={selectedDate.getFullYear()}
                                        onChange={(e) => setSelectedDate(new Date(parseInt(e.target.value), 0, 1))}
                                    >
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                    </select>
                                    <br />
                                    <span className="mini-title">
                                        <strong>Tuần</strong>
                                    </span>
                                    <br />
                                    <select
                                        value={getWeek(selectedDate).toString()}
                                        onChange={(e) => setSelectedDate(new Date(selectedDate.getFullYear(), 0, parseInt(e.target.value) * 7))}
                                    >
                                        {dateOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </th>
                                <th align="center">Thứ hai</th>
                                <th align="center">Thứ ba</th>
                                <th align="center">Thứ tư</th>
                                <th align="center">Thứ năm</th>
                                <th align="center">Thứ sáu</th>
                            </tr>
                            <tr>
                                <th align="center">{selectedDate.getDate()}/{selectedDate.getMonth() + 1}</th>
                                <th align="center">{new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1).getDate()}/{selectedDate.getMonth() + 1}</th>
                                <th align="center">{new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 2).getDate()}/{selectedDate.getMonth() + 1}</th>
                                <th align="center">{new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 3).getDate()}/{selectedDate.getMonth() + 1}</th>
                                <th align="center">{new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 4).getDate()}/{selectedDate.getMonth() + 1}</th></tr>
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
