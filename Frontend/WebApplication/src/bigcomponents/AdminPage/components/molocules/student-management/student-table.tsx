import { useState, useEffect } from 'react'
import './student-table.scss'
import api from '../../../../../config/axios';
import { toast } from 'react-toastify';

function StudentTable() {
    const [student, setStudent] = useState<any[]>([])
    const [_, setUpdateSuccess] = useState<boolean>(false);

    const getAllStudent = async () => {
        const response = await api.get('/Students');
        const res = response.data;
        setStudent(res);
    }

    const updateAttendance = async (studentId) => {
        try {
            // Update the payment status
            await api.patch('Lesson/attendance/' + studentId);
            setUpdateSuccess(true);

            // Fetch member data
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
    const records = student.slice(firsIndex, lastIndex);
    const npage = Math.ceil(student.length / recordPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const overallIndex = (currentPage - 1) * recordPage;

    useEffect(() => {
        getAllStudent();
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
        <div className='student-table-container'>
            <div className="student-table-title text-center text-uppercase">
                <h1>Danh sách học viên</h1>
            </div>
            <div className='student-table-content'>
                <form action="">
                    <table className='table table-hover table-striped' border={1}>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Tên học viên</th>
                                <th scope='col'>Khoá học đang học</th>
                                <th scope='col' className='tw-text-center'>Tổng quãng đường</th>
                                <th scope='col' className='text-center'></th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider align-middle'>
                            {records.length > 0 ? (
                                records.map((student, i: number = 1) => (
                                    <tr key={i}>
                                        <td>{overallIndex + i + 1}</td>
                                        <td>{student.fullName}</td>
                                        <td>{student.courseId}</td>
                                        <td className='tw-text-center'>{student.totalKm}km</td>
                                        <td className='button text-center'>
                                            <button className="btn btn-primary" type="button" onClick={() => updateAttendance(student.studentId)}>Cập nhật điểm danh</button>
                                            <button className="btn btn-danger" type="button">Xoá</button>
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

export default StudentTable