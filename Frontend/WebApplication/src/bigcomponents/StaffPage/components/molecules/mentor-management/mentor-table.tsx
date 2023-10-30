import React, { useState, useEffect } from 'react'
import api from '../../../../../config/axios';
import './mentor-table.scss'

function MentorTable() {
    const [data, setData] = useState<any[]>([])

    const getAllUser = async () => {
        const response = await api.get('/Mentor/GetMentorList');
        const res = response.data;
        setData(res);
    }

    //paganition part
    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 6;
    const lastIndex = currentPage * recordPage;
    const firsIndex = lastIndex - recordPage;
    const records = data.slice(firsIndex, lastIndex);
    const npage = Math.ceil(data.length / recordPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    useEffect(() => {
        getAllUser();
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
                                <th scope='col'>ID</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Phone</th>
                                <th scope='col'>Email</th>
                                <th scope='col' className='text-center'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider align-middle'>
                            {records.length > 0 ? (
                                records.map((mentor, i: number = 1) => (
                                    <tr key={i}>
                                        <td>{mentor.mentorId}</td>
                                        <td>{mentor.fullName}</td>
                                        <td>{mentor.phone}</td>
                                        <td>{mentor.email}</td>
                                        <td className='text-center'>{mentor.status.toString().toUpperCase()}</td>
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

export default MentorTable