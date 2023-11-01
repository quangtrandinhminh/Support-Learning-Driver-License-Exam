import { useEffect, useState } from 'react';
import api from '../../../../../config/axios';
import './course.scss';
import { Backdrop, CircularProgress } from '@mui/material';

function Course() {
    const [isLoading, setIsLoading] = useState(true);
    const [course, setCourse] = useState(null);

    const getCourseMonth = async () => {
        try {
            const response = await api.get('Course/list');
            const courses = response.data;
            const uniqueMonths: number[] = Array.from(new Set(courses.map(item => item.courseMonth)));

            // Select one course from each unique month
            const selectedCourses = uniqueMonths.map(month => {
                return courses.find(course => course.courseMonth === month);
            });

            // Reverse the array to display newest courses to the left
            setCourse(selectedCourses.reverse());
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCourseMonth();
    }, []);

    const maxCoursesToDisplay = 3; // Set the maximum number of courses to display

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className='course-container' id='course-section'>
            <h1>Các khoá học</h1>
            <div className='course-list'>
                {!isLoading ? (
                    course.length > 0 ? (
                        course.slice(0, maxCoursesToDisplay).map((course, i) => (
                            console.log(course[i]),
                            <form action="" key={i}>
                                <div className={`course-section${i + 1}`}>
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
                )
                }
            </div>
        </div>
    )
}

export default Course;
