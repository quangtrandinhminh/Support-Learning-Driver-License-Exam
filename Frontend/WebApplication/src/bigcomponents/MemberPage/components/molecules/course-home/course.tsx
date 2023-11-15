import { useEffect, useState } from 'react';
import api from '../../../../../config/axios';
import './course.scss';
import { Backdrop, CircularProgress } from '@mui/material';

function Course() {
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    // Pagination part
    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 3;
    const lastIndex = currentPage * recordPage;
    const firstIndex = lastIndex - recordPage;
    const records = courses.slice(firstIndex, lastIndex);
    const npage = Math.ceil(courses.length / recordPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    useEffect(() => {
        const getCourseData = async () => {
            try {
                const response = await api.get('Course/list');
                const allCourses = response.data;

                // Group courses by courseMonth and courseYear to display unique courses
                const uniqueCourses = [];
                const seen = new Set();

                allCourses.forEach(course => {
                    const courseKey = `${course.courseMonth}/${course.courseYear}`;
                    if (!seen.has(courseKey)) {
                        seen.add(courseKey);
                        uniqueCourses.push(course);
                    }
                });

                // Sort the unique courses based on courseYear and courseMonth
                uniqueCourses.sort((a, b) => {
                    if (a.courseYear === b.courseYear) {
                        return a.courseMonth - b.courseMonth;
                    }
                    return a.courseYear - b.courseYear;
                });

                setCourses(uniqueCourses);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }

        getCourseData();
    }, []);

    const currentDate = new Date();

    // Filter courses based on the startDate condition
    const filteredCourses = courses.filter(course => {
        // const courseStartDate = new Date(course.startDate);

        const currentMonth = currentDate.getMonth() + 1; // Adding 1 because months are zero-indexed
        const currentYear = currentDate.getFullYear();

        // Compare courseMonth and courseYear (greater than or equal)
        return (
            course.courseYear > currentYear ||
            (course.courseYear === currentYear && course.courseMonth >= currentMonth)
        );
    });


    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const changeCPage = (id) => {
        setCurrentPage(id);
    }

    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className='course-container' id='course-section'>
            <h1>Các khoá học</h1>
            <div className='course-list'>
                {!isLoading ? (
                    filteredCourses.length > 0 ? (
                        console.log('Filtered Courses:', filteredCourses),
                        filteredCourses.map((course, i) => (
                            <form action="" key={i}>
                                <div className={`course-section-1`}>
                                    <div className='upperbox'>
                                        <h2>Khóa học tháng {course.courseMonth}/{course.courseYear}</h2>
                                    </div>
                                    <div className='course-content'>
                                        <div className='course-content-list'>
                                            <li>1. Khai giảng ngày {formatDate(course.startDate)}</li>
                                            <li>2. Cam kết học phí trọn gói - hợp lý</li>
                                            <li>3. Lịch thi chuẩn - không chậm trễ</li>
                                            <li>4. Dịch vụ 1 kèm 1</li>
                                            <li>5. Đội ngũ giáo viên chất lượng</li>
                                            <li>6. Sau 4 tháng bế giảng khoá</li>
                                        </div>
                                    </div>
                                    <div className='underbox'>
                                        <a href={`khoahoc/${course.courseMonth}/${course.courseYear}`} type='submit'>Xem khoá học</a>
                                    </div>
                                </div>
                            </form>
                        ))
                    ) : (
                        <h1 className='text-center'>No data to display.</h1>
                    )
                ) : (
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )}
            </div>
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <button type='button' className='page-link' onClick={prePage}>Prev</button>
                    </li>
                    {numbers.map((n, i) => (
                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <button type='button' className='page-link' onClick={() => changeCPage(n)}>{n}</button>
                        </li>
                    ))}
                    <li className='page-item'>
                        <button type='button' className='page-link' onClick={nextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Course;
