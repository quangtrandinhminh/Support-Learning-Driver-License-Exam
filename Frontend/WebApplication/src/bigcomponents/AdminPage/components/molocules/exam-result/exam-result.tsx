import { useState, useEffect } from 'react'
import './exam-result.scss'
import api from '../../../../../config/axios';
import { toast } from 'react-toastify';

function ExamResultTable() {
    const [test, setTest] = useState<any[]>([])
    const [_, setUpdateSuccess] = useState<boolean>(false);

    const getAllMembers = async () => {
        const response = await api.get('Test/list');
        const res = response.data;
        setTest(res);
    }

    const updatePassStatus = async (studentId) => {
        try {
            // Update the payment status
            await api.put('Test/editIsPass?studentID=' + studentId);
            setUpdateSuccess(true);

            const notificationMessage = "Cập nhật thành công!";
            localStorage.setItem("notificationMessage", notificationMessage);
            location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    //paganition part
    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 10;
    const lastIndex = currentPage * recordPage;
    const firsIndex = lastIndex - recordPage;
    const records = test.slice(firsIndex, lastIndex);
    const npage = Math.ceil(test.length / recordPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    useEffect(() => {
        getAllMembers();
    }, [])

    useEffect(() => {
        const storedNotificationMessage = localStorage.getItem("notificationMessage");

        if (storedNotificationMessage) {
            toast.success(storedNotificationMessage);
            localStorage.removeItem("notificationMessage"); // Remove the message from localStorage
        }
    }, []);

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const changeCPage = (id: number) => {
        setCurrentPage(id);
    }

    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
        console.log(npage);
    }

    return (
        <div className='result-table-container'>
            <div className="result-table-title text-center text-uppercase">
                <h1>Danh sách bài thi</h1>
            </div>
            <div className='result-table-content'>
                <form action="">
                    <table className='table table-hover table-striped' border={1}>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>Mã kỳ thi</th>
                                <th scope='col'>Mã học viên</th>
                                <th scope='col' className='tw-text-center'>Mã bài thi</th>
                                <th scope='col' className='tw-text-center'>Điểm</th>
                                <th scope='col' className='text-center'>Trạng thái</th>
                                <th scope='col' className='text-center'></th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider align-middle'>
                            {records.length > 0 ? (
                                records.map((exam, i: number = 1) => (
                                    <tr key={i}>
                                        <td>{exam.testId}</td>
                                        <td>{exam.studentId}</td>
                                        <td className='tw-text-center'>{exam.examId}</td>
                                        <td className='tw-text-center'>{exam.score}</td>
                                        <td className='text-center'>{exam.pass ? "Đạt" : "Không đạt"}</td>
                                        <td className='button text-center'>
                                            <button className="btn btn-primary" type="button" onClick={() => updatePassStatus(exam.studentId)}>Cập nhật</button>
                                            {/* <button className="btn btn-danger" type="submit">Xoá</button> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>
                                        <h1 className='text-center text-red-600 p-5'>
                                            Không tìm thấy thông tin. Vui lòng kiểm tra lại!
                                        </h1>
                                    </td>
                                </tr>
                            )
                            }
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
    )
}

export default ExamResultTable