import React, { useEffect, useState } from 'react'
import './course-table.scss'
import { Link, useParams } from 'react-router-dom'
import api from '../../../config/axios';

function CourseTable() {
    const { month } = useParams();
    const [data, setData] = useState<any[]>([]);

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

    useEffect(() => {
        window.scrollTo(0, 0);
        getCourseByMonth(month);
    }, [month])

    const getCourseByMonth = async (month) => {
        try {
            const response = await api.get(`/CourseDetail?courseMonth=${month}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

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
                                data.map((course, i) => (
                                    <tr key={i}>
                                        <td className='course-no'>
                                            <p>{i + 1}</p>
                                        </td>
                                        <td className='course-date'>
                                            <p>Khoá {course[i].courseName}</p>
                                            <p>KG: {formatDate(course[0].courseTimeStart)}</p>
                                            <p>BG: {formatDate(course[5].courseTimeEnd)}</p>
                                        </td>
                                        <td className='course-mem'>
                                            <p>20</p>
                                        </td>
                                        <td className="course-training-content">
                                            <li className='border-receive'>Đào tạo lí thuyết</li>
                                            <li className='border-receive'>Thực hành trong hình</li>
                                            <li className='border-receive'>Thực hành trên cabin</li>
                                            <li className='border-receive'>Thực hành trên đường</li>
                                            <li className='border-receive'>Thực hành trên xe tự động</li>
                                            <li>Thực hành tổng hợp trong hình</li>
                                        </td>
                                        <td className="course-training-time">
                                            <li className='border-receive'>{formatDate(course[i].courseTimeStart)} - {formatDate(course[i].courseTimeEnd)}</li>
                                            <li className='border-receive'>{formatDate(course[i + 1].courseTimeStart)} - {formatDate(course[i + 1].courseTimeEnd)}</li>
                                            <li className='border-receive'>{formatDate(course[i + 2].courseTimeStart)} - {formatDate(course[i + 2].courseTimeEnd)}</li>
                                            <li className='border-receive'>{formatDate(course[i + 3].courseTimeStart)} - {formatDate(course[i + 3].courseTimeEnd)}</li>
                                            <li className='border-receive'>{formatDate(course[i + 3].courseTimeStart)} - {formatDate(course[i + 3].courseTimeEnd)}</li>
                                            <li>{formatDate(course[5].courseTimeStart)} - {formatDate(course[5].courseTimeEnd)}</li>
                                        </td>
                                        <td className='course-register'>
                                            <Link to='/khoahoc/xac-nhan-khoa-hoc'>
                                                <button className='btnRegister'>Đăng ký</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </form>
                </div>
            </div>
        </>

    )
}

export default CourseTable
