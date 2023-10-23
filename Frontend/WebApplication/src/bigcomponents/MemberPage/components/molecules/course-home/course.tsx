import { useEffect, useState } from 'react';
import api from '../../../config/axios';
import './course.scss';
import { Backdrop, CircularProgress } from '@mui/material';

function Course() {

    const [numArray, setNumArray] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCourseMonth = async () => {
        try {
            const response = await api.get('/Course');
            const uniqueMonths: string[] = Array.from(new Set(response.data.map(item => item.courseMonth)));
            setNumArray(uniqueMonths);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCourseMonth();
    }, []);

    return (
        <div className='course-container' id='course-section'>
            <h1>Các khoá học</h1>
            <div className='course-list'>
                {
                    !isLoading ? (
                        numArray.length > 0 ? (
                            numArray.map((month, i) => (
                                <form action="">
                                    <div key={i} className={`course-section${i + 1}`} >
                                        <div className='upperbox'>
                                            <h2>Khoá học tháng {month === "1" ? `${month}/2024` : `${month}/2023`}</h2>
                                        </div>
                                        <div className='course-content'>
                                            <div className='course-content-list'>
                                                <li>Khai giảng ngày</li>
                                                <li>Cam kết học phí trọn gói - hợp lý</li>
                                                <li>Lịch thi chuẩn - không chậm trễ</li>
                                                <li>Dịch vụ 1 kèm 1</li>
                                                <li>Đội ngũ giáo viên chất lượng</li>
                                                <li>Sau 4 tháng bế giảng khoá</li>
                                            </div>
                                        </div>
                                        <div className='underbox'>
                                            <a href={`khoahoc/${month}`} type='submit'>Xem khoá học</a>
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
        </div >
    )
}

export default Course;
