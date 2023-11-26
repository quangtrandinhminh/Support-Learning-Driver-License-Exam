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

            const response = await api.get(`/Class/${mentor.mentorId}`);
            setMentorClass(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching mentor class:", error);
        }
    };

    useEffect(() => {
        getClassByMentorID();
    }, []);

    const renderScheduleData = () => {
        // Filter classes based on the selected week
        const filteredClasses = scheduleData.filter((classInfo) => {
            const classDate = new Date(classInfo.date);
            return classDate >= weekStartDate && classDate <= weekEndDate;
        });
    
        // Organize the data based on day and shift
        const dailySchedule = [...Array(7)].map(() => ({ morning: [], afternoon: [] }));
    
        // Organize the data based on day and shift
        filteredClasses.forEach((classInfo) => {
            const dayIndex = new Date(classInfo.date).getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
            const slot = classInfo.isNight ? 'morning' : 'afternoon';
    
            dailySchedule[dayIndex][slot].push(classInfo);
        });
    
        // Render the table columns based on the organized schedule
        return (
            <tr className='study-slot'>
                {/* Render morning classes */}
                <td>
                    {dailySchedule.map((daySchedule, dayIndex) => (
                        <div key={dayIndex}>
                            {daySchedule.morning.map((classInfo, index) => (
                                <p key={index}>
                                    {classInfo.title}
                                    <br />
                                    <a href={`lich-day/diem-danh/${classInfo.classId}`}>Lớp: {classInfo.classId}</a>
                                    <br />
                                    Trạng thái: {classInfo.date ? 'Đã diễn ra' : 'Chưa diễn ra'}
                                </p>
                            ))}
                        </div>
                    ))}
                </td>
    
                {/* Render afternoon classes */}
                <td>
                    {dailySchedule.map((daySchedule, dayIndex) => (
                        <div key={dayIndex}>
                            {daySchedule.afternoon.map((classInfo, index) => (
                                <p key={index}>
                                    {classInfo.title}
                                    <br />
                                    <a href={`lich-day/diem-danh/${classInfo.classId}`}>Lớp: {classInfo.classId}</a>
                                    <br />
                                    Trạng thái: {classInfo.date ? 'Đã diễn ra' : 'Chưa diễn ra'}
                                </p>
                            ))}
                        </div>
                    ))}
                </td>
            </tr>
        );
    };
    
    const fetchScheduleData = async () => {
        try {
            if (!mentorClass || mentorClass.length === 0) {
                console.error('Mentor class data is missing or empty');
                return;
            }

            // Assuming you want to get the courseId from the first object in the list
            const firstClass = mentorClass[0];

            const response = await api.get(`Lesson/teaching-schedule/${mentor.mentorId}`, {
                params: {
                    startDate: weekStartDate.toISOString().split('T')[0],
                    endDate: weekEndDate.toISOString().split('T')[0],
                    courseId: firstClass.courseId,
                },
            });

            if (response.status === 200) {
                setScheduleData(response.data);
                console.log(response.data);
            } else {
                console.error("Unexpected response status: " + response.status);
            }
        } catch (error) {
            console.error("Error fetching schedule data:", error);
        }
    };

    useEffect(() => {
        fetchScheduleData();
    }, [mentorClass, weekStartDate, weekEndDate]);

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

    const generateDateOptions = (year) => {
        const options = [];
    
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
    
        setDateOptions(options);
    };

    const formatDate = (date) => {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    };

    const handleYearChange = async (year) => {
        setSelectedYear(year);
        setSelectedWeek(1);
    
        // Fetch the schedule data for the selected week and year
        await fetchScheduleData();
    
        // Update the date options based on the selected year
        generateDateOptions(year);
    };

    useEffect(() => {
        generateDateOptions(selectedYear);
    }, [selectedYear]);

    useEffect(() => {
        const currentYear = selectedYear;
        let startDate = new Date(currentYear, 0, 1);
        startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Set to the first day of the current week
        startDate.setDate(startDate.getDate() + (selectedWeek - 1) * 7);
    
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
    
        setWeekStartDate(startDate);
        setWeekEndDate(endDate);
    
        // Fetch the schedule data whenever the selected week or year changes
        fetchScheduleData();
    }, [selectedWeek, selectedYear]);

      // Function to update selectedWeek and selectedYear
      const updateSelectedTime = () => {
        const currentDate = new Date();
        
        if (!currentDate) {
            // Handle the case where currentDate is undefined or null
            return;
        }
    
        const currentYear = currentDate.getFullYear();
        const currentWeek = Math.ceil(
            (currentDate.getTime() - new Date(currentYear, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)
        );
    
        setSelectedYear(currentYear);
        setSelectedWeek(currentWeek);
    };

    // Use setInterval to update the selected time every minute (adjust as needed)
    useEffect(() => {
        // Update initially
        updateSelectedTime();

        // Set up interval to update every minute
        const intervalId = setInterval(() => {
            updateSelectedTime();
        }, 60000); // Update every minute, you can adjust this interval

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run the effect only once on mount


    return (
        <>
            <div className="teaching-schedule-container">
                <div>
                    <h1>Lịch dạy trong tuần</h1>
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
