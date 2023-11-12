import React, { useEffect, useState } from 'react'
import './course-table.scss'
import { Link, useParams } from 'react-router-dom'
import api from '../../../../../config/axios';
import { Backdrop, CircularProgress } from '@mui/material';

function CourseTable() {
    const { month } = useParams();
    const { year } = useParams();
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [course, setCourse] = useState<any[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const getCourseDetailByMonth = async (month) => {
        try {
            const response = await api.get(`/CourseDetail?courseMonth=${month}`);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    }

    const getCourseByMonth = async (month) => {
        try {
            const response = await api.get('Course/courseMonth?month=' + month + '&year=' + year);
            setCourse(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCourseDetailByMonth(month);
    }, [month])

    useEffect(() => {
        getCourseByMonth(month);
    }, [data]);

    return (
        <>
            <div className='course-table-container' id='course-nav'>
                <h1 className='text-center course-title'>Thông tin khoá học</h1>
                <div className='course-table'>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <caption className='table-title'>
                                <h2>Các khoá học tháng {month}/{year}</h2>
                            </caption>
                            <tr className='content-title'>
                                <th>Thứ tự</th>
                                <th className='course-course'>Khoá học</th>
                                <th>Số lượng</th>
                                <th>Nội dung đào tạo</th>
                                <th>Thời gian</th>
                                <th></th>
                            </tr>
                            {
                                !isLoading ? (
                                    course.length > 0 ? (
                                        course.map((course, i) => (
                                            <tr key={i} >
                                                <td className='course-no'>
                                                    <p>{i + 1}</p>
                                                </td>
                                                <td className='course-date'>
                                                    <p>Khoá {course.name}</p>
                                                    <p>KG: {formatDate(course.startDate)}</p>
                                                    <p>BG: {formatDate(course.endDate)}</p>
                                                </td>
                                                <td className='course-mem'>
                                                    <p>20</p>
                                                </td>
                                                <td className="course-training-content">
                                                    <ol>
                                                        <li className='border-receive'>Đào tạo lí thuyết</li>
                                                        <li className='border-receive'>Thực hành trong hình</li>
                                                        <li className='border-receive'>Thực hành trên cabin</li>
                                                        <li className='border-receive'>Thực hành trên đường</li>
                                                        <li className='border-receive'>Thực hành trên xe tự động</li>
                                                        <li>Thực hành tổng hợp trong hình</li>
                                                    </ol>
                                                </td>
                                                <td className="course-training-time">
                                                    <ol>
                                                        <li className='border-receive'>{formatDate(data[i * 6].courseTimeStart)} - {formatDate(data[i * 6].courseTimeEnd)}</li>
                                                        <li className='border-receive'>{formatDate(data[i * 6 + 1].courseTimeStart)} - {formatDate(data[i * 6 + 1].courseTimeEnd)}</li>
                                                        <li className='border-receive'>{formatDate(data[i * 6 + 2].courseTimeStart)} - {formatDate(data[i * 6 + 2].courseTimeEnd)}</li>
                                                        <li className='border-receive'>{formatDate(data[i * 6 + 3].courseTimeStart)} - {formatDate(data[i * 6 + 3].courseTimeEnd)}</li>
                                                        <li className='border-receive'>{formatDate(data[i * 6 + 4].courseTimeStart)} - {formatDate(data[i * 6 + 4].courseTimeEnd)}</li>
                                                        <li>{formatDate(data[i * 6 + 5].courseTimeStart)} - {formatDate(data[i * 6 + 5].courseTimeEnd)}</li>
                                                    </ol>
                                                </td>
                                                <td className='course-register'>
                                                    <Link to='/dang-nhap'>
                                                        <button className='btnRegister btn btn-primary'>Đăng ký</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <h1>không dữ liệu</h1>
                                    )
                                ) : (

                                    <>
                                        <Backdrop
                                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                            open={true}
                                        >
                                            <CircularProgress color="inherit" />
                                        </Backdrop>
                                    </>
                                )
                            }
                        </table>
                    </form>
                </div>
            </div>
        </>

    )
}

export default CourseTable
