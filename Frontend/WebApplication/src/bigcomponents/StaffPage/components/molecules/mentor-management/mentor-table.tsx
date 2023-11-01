import React, { useState, useEffect } from 'react'
import './mentor-table.scss'
import api from '../../../../../config/axios';

function MemberTable() {
    const [mentor, setMentor] = useState<any[]>([])

    const getAllMentors = async () => {
        try {
            const response = await api.get('Mentor/list');
            const res = response.data;
            setMentor(res);
        } catch (error) {
            console.log(error);
        }
    }

    //paganition part
    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 6;
    const lastIndex = currentPage * recordPage;
    const firsIndex = lastIndex - recordPage;
    const records = mentor.slice(firsIndex, lastIndex);
    const npage = Math.ceil(mentor.length / recordPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const overallIndex = (currentPage - 1) * recordPage;

    useEffect(() => {
        getAllMentors();
    }, [])

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
        <div className='mentor-table-container'>
            <div className="mentor-table-title text-center text-uppercase">
                <h1>Danh sách giáo viên</h1>
            </div>
            <div className='mentor-table-content'>
                <form action="">
                    <table className='table table-hover table-striped' border={1}>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>Mã giáo viên</th>
                                <th scope='col'>Họ và Tên</th>
                                <th scope='col'>Điện thoại</th>
                                <th scope='col'>Dạy lý thuyết</th>
                                <th scope='col'>Dạy thực hành</th>
                                <th scope='col' style={{ width: '200px' }}>Email</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider align-middle'>
                            {records.length > 0 ? (
                                records.map((mentor, i: number = 1) => (
                                    <tr key={i}>
                                        <td>{mentor.userId}</td>
                                        <td>{mentor.fullName}</td>
                                        <td>{mentor.phone}</td>
                                        <td>{mentor.isTheor}</td>
                                        <td>{mentor.email}</td>
                                        <td>{mentor.email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7}>
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
                                <button type='button' className='page-link'
                                    onClick={prePage}>Prev</button>
                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <button type='button' className='page-link'
                                            onClick={() => changeCPage(n)}>{n}</button>
                                    </li>
                                ))
                            }
                            <li className='page-item'>
                                <button type='button' className='page-link'
                                    onClick={nextPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </form>
            </div>
        </div>
    )
}

export default MemberTable