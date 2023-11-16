import { useState, useEffect } from 'react'
import './staff-table.scss'
import api from '../../../../../config/axios';
import { Link, useNavigate } from 'react-router-dom';

function MemberTable() {
    const [staff, setStaff] = useState<any[]>([]);

    const getAllStaff = async () => {
        try {
            const response = await api.get('Staff/list');
            const res = response.data;
            setStaff(res);
        } catch (error) {
            console.log(error);
        }
    }

    const navigate = useNavigate();

    // Pagination part
    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 10;
    const lastIndex = currentPage * recordPage;
    const firstIndex = lastIndex - recordPage;
    const records = staff.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(staff.length / recordPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    useEffect(() => {
        getAllStaff();
    }, []);

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const nextPage = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleUpdate = (newsId) => {
        navigate(`cap-nhat-nhan-vien`);
        window.scroll({
            top: 0,
            behavior: 'instant'
        });
    }

    const handleDelete = async (staffId) => {
        try {
            // Perform the deletion
            await api.delete(`Staff/delete/${staffId}`);

            // Reload the page after successful deletion
            window.location.reload();

            // Once deletion is successful, fetch the updated data
            await getAllStaff();

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='staff-table-container'>
            <div className="staff-table-title text-center text-uppercase">
                <h1>Danh sách nhân viên</h1>
            </div>
            <div className='staff-table-content'>
                <form action="">
                    <div className='d-grid mb-2'>
                        <div className="row">
                            <div className='d-flex btnCreate col justify-content-end'>
                                <Link to='tao-nhan-vien' className='btn btn-success'>+ Thêm nhân viên</Link>
                            </div>
                        </div>
                    </div>
                    <table className='table table-hover table-striped' border={1}>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>Mã nhân viên</th>
                                <th scope='col'>Họ và Tên</th>
                                <th scope='col'>Điện thoại</th>
                                <th scope='col' style={{ width: '100px' }}>Email</th>
                                <th scope='col' className='tw-text-center'>Trạng thái</th>
                                <th scope='col' className='text-center'>Hành động</th>
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
                                        <td className='tw-text-center'>{staff.status ? 'Đang làm' : 'Không làm'}</td>
                                        <td className='button text-center'>
                                            <button className="btn btn-primary" type="button" onClick={() => handleUpdate(staff.staffId)}>Cập nhật</button>
                                            <button className="btn btn-danger" type="button" onClick={() => handleDelete(staff.staffId)}>Xoá</button>
                                        </td>
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
                            {pageNumbers.map((number) => (
                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <button type='button' className='page-link' onClick={() => changePage(number)}>{number}</button>
                                </li>
                            ))}
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
