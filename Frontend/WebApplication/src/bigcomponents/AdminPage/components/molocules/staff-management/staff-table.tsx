import { useState, useEffect } from 'react'
import './staff-table.scss'
import api from '../../../../../config/axios';

function MemberTable() {
    const [staff, setStaff] = useState<any[]>([])

    const getAllMentors = async () => {
        try {
            const response = await api.get('Staff/list');
            const res = response.data;
            setStaff(res);
        } catch (error) {
            console.log(error);
        }
    }

    //paganition part
    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 6;
    const lastIndex = currentPage * recordPage;
    const firsIndex = lastIndex - recordPage;
    const records = staff.slice(firsIndex, lastIndex);
    const npage = Math.ceil(staff.length / recordPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

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
        <div className='staff-table-container'>
            <div className="staff-table-title text-center text-uppercase">
                <h1>Danh sách nhân viên</h1>
            </div>
            <div className='staff-table-content'>
                <form action="">
                    <table className='table table-hover table-striped' border={1}>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>Mã nhân viên</th>
                                <th scope='col'>Họ và Tên</th>
                                <th scope='col'>Điện thoại</th>
                                <th scope='col' style={{ width: '100px' }}>Email</th>
                                <th scope='col'>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider align-middle'>
                            {records.length > 0 ? (
                                records.map((staff, i: number = 1) => (
                                    <tr key={i}>
                                        <td>{staff.staffId}</td>
                                        <td>{staff.fullName}</td>
                                        <td>{staff.phone}</td>
                                        <td>{staff.email}</td>
                                        <td>{staff.status? 'Đang làm' : 'Không làm'}</td>
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