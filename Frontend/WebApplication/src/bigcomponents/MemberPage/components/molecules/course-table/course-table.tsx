import React, { useEffect, useState } from 'react'
import './course-table.scss'
import { Link, useParams } from 'react-router-dom'
import api from '../../../../../config/axios';
import { Backdrop, CircularProgress } from '@mui/material';

function CourseTable() {
    const { month } = useParams();
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const getCourseByMonth = async (month) => {
        try {
            const response = await api.get(`/CourseDetail?courseMonth=${month}`);
            setData(response.data);
            console.log(data[0]);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getCourseByMonth(month);
    }, [month])

    return (
        <>
            <div className='course-table-container' id='course-nav'>
                <h1 className='text-center course-title'>Thông tin khoá học</h1>
                <div className='course-table'>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <caption className='table-title'>
                                <h2>Các khoá học tháng {month === "1" ? `${month}/2024` : `${month}/2023`}</h2>
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
                                data.length > 0 ? (
                                    console.log(data.length),
                                    !isLoading ? (
                                        data.map((course, i) => (
                                            <tr key={i}>
                                                <td className='course-no'>
                                                    <p>{i + 1}</p>
                                                </td>
                                                <td className='course-date'>
                                                    <p>Khoá {course[i].name}</p>
                                                    <p>KG: {formatDate(course[0].courseTimeStart)}</p>
                                                    <p>BG: {formatDate(course[5].courseTimeEnd)}</p>
                                                </td>
                                                <td className='course-mem'>
                                                    <p>20</p>
                                                </td>
                                                <td className="course-training-content">
                                                    <ol>
                                                        <li className='border-receive'>1. Đào tạo lí thuyết</li>
                                                        <li className='border-receive'>2. Thực hành trong hình</li>
                                                        <li className='border-receive'>3. Thực hành trên cabin</li>
                                                        <li className='border-receive'>4. Thực hành trên đường</li>
                                                        <li className='border-receive'>5. Thực hành trên xe tự động</li>
                                                        <li>6. Thực hành tổng hợp trong hình</li>
                                                    </ol>
                                                </td>
                                                <td className="course-training-time">
                                                    <ol>
                                                        <li className='border-receive'>{formatDate(course[i].courseTimeStart)} - {formatDate(course[i].courseTimeEnd)}</li>
                                                        <li className='border-receive'>{formatDate(course[i + 1].courseTimeStart)} - {formatDate(course[i + 1].courseTimeEnd)}</li>
                                                        <li className='border-receive'>{formatDate(course[i + 2].courseTimeStart)} - {formatDate(course[i + 2].courseTimeEnd)}</li>
                                                        <li className='border-receive'>{formatDate(course[i + 3].courseTimeStart)} - {formatDate(course[i + 3].courseTimeEnd)}</li>
                                                        <li className='border-receive'>{formatDate(course[i + 3].courseTimeStart)} - {formatDate(course[i + 3].courseTimeEnd)}</li>
                                                        <li>{formatDate(course[5].courseTimeStart)} - {formatDate(course[5].courseTimeEnd)}</li>
                                                    </ol>
                                                </td>
                                                <td className='course-register'>
                                                    <Link to='/khoahoc/xac-nhan-khoa-hoc'>
                                                        <button className='btnRegister'>Đăng ký</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <h1>no</h1>
                                    )) : (
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
