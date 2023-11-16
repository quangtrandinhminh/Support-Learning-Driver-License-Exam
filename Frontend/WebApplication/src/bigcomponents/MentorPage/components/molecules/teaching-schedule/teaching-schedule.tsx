import { useState, useEffect } from 'react';
import './teaching-schedule.scss';
import api from '../../../../../config/axios';

function TeachingSchedule() {
    const [selectedYear, setSelectedYear] = useState(2023);
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [dateOptions, setDateOptions] = useState([]);
    const [weekStartDate, setWeekStartDate] = useState(null);
    const [weekEndDate, setWeekEndDate] = useState(null);
    const mentor = sessionStorage.getItem('loginedMentor') ? JSON.parse(sessionStorage.getItem('loginedMentor')) : null;
    const [mentorClass, setMentorClass] = useState(null);
    const [scheduleData, setScheduleData] = useState([]); // State to store the schedule data from the API


    const getClassByMentorID = async () => {
        try {
            if (!mentor || !mentor.mentorId) {
                console.error('Mentor data or mentorId is missing');
                return;
            }

            const startDate = '2023-11-06';
            const endDate = '2024-02-06';
            const courseId = '1101B2';

            const response = await api.get(`Lesson/teaching-schedule/${mentor.mentorId}`, {
                params: {
                    startDate,
                    endDate,
                    courseId,
                },
            });

            setMentorClass(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClassByMentorID();
    }, []);

    const renderScheduleData = () => {
        // Filter classes based on the selected week
        const filteredClasses = mentorClass.filter((classInfo) => {
            const classDate = new Date(classInfo.date);
            return classDate >= weekStartDate && classDate <= weekEndDate;
        });
    
        // Organize the data based on day and shift
        const dailySchedule = [...Array(7)].map(() => ({ morning: [], afternoon: [] }));
    
        // Organize the data based on day and shift
        filteredClasses.forEach((classInfo) => {
            const dayIndex = new Date(classInfo.date).getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
            const slot = classInfo.isNight ? 'afternoon' : 'morning';
    
            dailySchedule[dayIndex][slot].push(classInfo);
        });
    
        // Render the table rows based on the organized schedule
        return dailySchedule.map((daySchedule, dayIndex) => (
            <th key={dayIndex} className='study-slot'>
                {/* Render morning classes */}
                <td>
                    {daySchedule.morning.map((classInfo, index) => (
                        <p key={index}>
                            {classInfo.title}
                            <br />
                            <a href={`lich-day/diem-danh/${classInfo.classId}`}>Lớp: {classInfo.classId}</a>
                        </p>
                    ))}
                </td>
                {/* Render afternoon classes */}
                {/* <td>
                    {daySchedule.afternoon.map((classInfo, index) => (
                        <p key={index}>
                            {classInfo.title}
                            <br />
                            <a href={`lich-day/diem-danh/${classInfo.classId}`}>Lớp: {classInfo.classId}</a>
                        </p>
                    ))}
                </td> */}
            </th>
        ));
    };
    
    
    



    const fetchScheduleData = async () => {
        try {
            const response = await api.get(`Lesson/teaching-schedule/${mentor.mentorId}`, {
                params: {
                    startDate: weekStartDate.toISOString().split('T')[0],
                    endDate: weekEndDate.toISOString().split('T')[0],
                    courseId: '1101B2',
                },
            });

            if (response.status === 200) {
                setScheduleData(response.data); // Update the state with the API response data
            } else {
                // Handle unexpected response status codes
                console.error("Unexpected response status: " + response.status);
            }
        } catch (error) {
            console.error("Error fetching schedule data:", error);
            // Handle the error here, e.g., set an error state or show an error message to the user
        }
    };

    useEffect(() => {
        fetchScheduleData(); // Invoke the function to fetch schedule data
    }, [weekStartDate, weekEndDate, mentor.mentorId]);
    // const getStartDay = (year) => {
    //     // Zeller's Congruence algorithm to calculate the start day of the year
    //     if (year < 0) {
    //         year += 1; // Adjust for the algorithm if year is BC
    //     }
    //     const q = 1;
    //     const m = 13; // January (13) and February (14) are counted as months 13 and 14 of the previous year
    //     const K = year % 100;
    //     const J = Math.floor(year / 100);

    //     const f = q + Math.floor((13 * (m + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) - 2 * J;
    //     const startDay = (f % 7 + 7) % 7;

    //     return startDay; // 0 for Saturday, 1 for Sunday, 2 for Monday, etc.
    // };

    // const isLeapYear = (year) => {
    //     return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    // };

    const generateDateOptions = () => {
        const options = [];

        for (let year = 2023; year <= 2025; year++) {
            // const isLeap = isLeapYear(year);
            // const startDay = getStartDay(year);
            let startDate = new Date(year, 0, 1);
            startDate.setDate(1 - ((startDate.getDay() - 1 + 7) % 7)); // Adjust the start date to the nearest Sunday

            for (let week = 1; week <= 52; week++) {
                const endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + 6);

                options.push({
                    label: `${formatDate(startDate)} To ${formatDate(endDate)}`,
                    value: week,
                });

                startDate.setDate(startDate.getDate() + 7);
            }
        }

        setDateOptions(options);
    };

    const formatDate = (date) => {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
        setSelectedWeek(1);
    };


    useEffect(() => {
        generateDateOptions();
    }, []);

    useEffect(() => {
        const currentYear = selectedYear;
        // const isLeap = isLeapYear(currentYear);
        // const startDay = getStartDay(currentYear);
        let startDate = new Date(currentYear, 0, 1);
        startDate.setDate(1 - ((startDate.getDay() - 1 + 7) % 7)); // Adjust the start date to the nearest Sunday
        startDate.setDate(startDate.getDate() + (selectedWeek - 1) * 7);

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);

        setWeekStartDate(startDate);
        setWeekEndDate(endDate);
    }, [selectedWeek, selectedYear]);

    return (
        <>
            <div className="teaching-schedule-container">
                <div>
                    <h1>Lịch dạy trong tuần </h1>
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
                                            value={selectedYear}
                                            onChange={(e) => handleYearChange(parseInt(e.target.value))}
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
                                            value={selectedWeek}
                                            onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
                                        >
                                            {dateOptions.map((option, index) => (
                                                <option key={index} value={option.value}>
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
                                    <th align="center">Thứ bảy</th>
                                    <th align="center">Chủ nhật</th>
                                </tr>
                                <tr>
                                    {weekStartDate && weekEndDate ? (
                                        [...Array(7)].map((_, dayIndex) => {
                                            const currentDate = new Date(weekStartDate);
                                            currentDate.setDate(currentDate.getDate() + dayIndex);
                                            return (
                                                <th key={dayIndex} align="center">
                                                    {formatDate(currentDate)}
                                                </th>
                                            );
                                        })
                                    ) : null}
                                </tr>
                            </thead>
                            <tbody className="schedule-body-container">
                                <td></td>
                                {scheduleData.length > 0 ? (
                                    renderScheduleData()
                                ) : (
                                    <tr>
                                        <td colSpan={8}>
                                            <h1 className='text-center text-red-600 p-5 tw-text-realRed'>
                                                Hiện không có lịch dạy
                                            </h1>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TeachingSchedule;
