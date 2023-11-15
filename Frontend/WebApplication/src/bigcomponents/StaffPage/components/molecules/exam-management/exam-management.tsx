import { useEffect, useState } from 'react';
import './exam-management.scss';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../../config/axios';
import { toast } from 'react-toastify';

function ExamTable() {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    // Pagination variables
    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 6;
    const lastIndex = currentPage * recordPage;
    const firsIndex = lastIndex - recordPage;

    // Apply filtering to data before pagination
    const filteredData = data.filter(course => course.courseId.toLowerCase().includes(searchValue));

    // Pagination
    const records = filteredData.slice(firsIndex, lastIndex);
    const npage = Math.ceil(filteredData.length / recordPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const navigate = useNavigate();

    // Fetch all courses
    const getAllExams = async () => {
        try {
            const response = await api.get('Exam/list');
            const res = response.data;
            setData(res);
        } catch (err) {
            console.log(err);
        }
    };

    // Handle page navigation
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

    // Filtering function
    const filter = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        setCurrentPage(1); // Reset to the first page when filtering
    }

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleCreate = async (examId) => {
        try {
            let examIDJson = JSON.stringify(examId);
            await api.post('Test/add',
                {
                    Headers: {
                        'Content-Type': 'application/json',
                    },
                    examId: examIDJson
                });

            const notificationMessage = "Tạo bài thi thành công!";
            localStorage.setItem("notificationMessage", notificationMessage);
            location.reload();

        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    useEffect(() => {
        getAllExams();
    }, []);

    useEffect(() => {
        const storedNotificationMessage = localStorage.getItem("notificationMessage");

        if (storedNotificationMessage) {
            toast.success(storedNotificationMessage);
            localStorage.removeItem("notificationMessage"); // Remove the message from localStorage
        }
    }, []);

    return (
        <div className='exams-table-container'>
            <div className="exams-table-title text-center text-uppercase">
                <h1>Danh sách kỳ thi</h1>
            </div>
            <div className='exams-table-content'>
                <form action="">
                    <div className='d-grid mb-2'>
                        <div className="row">
                            <div className='search-input col align-self-center'>
                                <input
                                    type="text"
                                    name='courseId'
                                    placeholder='mã khoá học'
                                    onChange={filter}
                                    autoComplete='off'
                                />
                            </div>
                            <div className='d-flex btnCreate col justify-content-end'>
                                <Link to='tao-ky-thi' className='btn btn-success'>+ Tạo kỳ thi</Link>
                            </div>
                        </div>
                    </div>
                    <table className='table table-hover table-striped' border={1}>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>Mã kỳ thi</th>
                                <th scope='col'>Mã khoá học</th>
                                <th scope='col'>Tên</th>
                                <th scope='col'>Ngày</th>
                                <th scope='col' className='text-center'>Mô tả</th>
                                <th scope='col' className='text-center'>Thời gian</th>
                                <th scope='col' className='text-center'>Số câu hỏi</th>
                                <th scope='col' className='text-center'>Số câu liệt</th>
                                <th scope='col' className='text-center'>Số câu đúng tối thiểu</th>
                                <th scope='col' className='text-center'>Trạng thái</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider align-middle'>
                            {records.length > 0 ? (
                                records.map((exam, i) => {
                                    ;
                                    return (
                                        <tr key={i}>
                                            <td>{exam.examId}</td>
                                            <td>{exam.courseId}</td>
                                            <td>{exam.examName}</td>
                                            <td>{formatDate(exam.examTime)}</td>
                                            <td>{exam.description}</td>
                                            <td className='text-center'>{exam.duration}</td>
                                            <td className='text-center'>{exam.limitQuestion}</td>
                                            <td className='text-center'>{exam.limitKeyQuestion}</td>
                                            <td className='text-center'>{exam.minimumCorrectAnswer}</td>
                                            <td className='text-center'>{exam.status ? "Đã kích hoạt" : "Chưa kích hoạt"}</td>
                                            <td className='button text-center'>
                                                <button className="btn btn-info" type="button" onClick={() => handleCreate(exam.examId)}>Tạo bài thi</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={11}>
                                        <h1 className='text-center text-red-600 p-5 tw-text-realRed'>
                                            Không tìm thấy thông tin. Vui lòng kiểm tra lại!
                                        </h1>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <nav>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <button type='button' className='page-link' onClick={prePage}>Prev</button>
                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <button type='button' className='page-link' onClick={() => changeCPage(n)}>{n}</button>
                                    </li>
                                ))
                            }
                            <li className='page-item'>
                                <button type='button' className='page-link' onClick={nextPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </form>
            </div>
        </div>
    );
}

export default ExamTable;
