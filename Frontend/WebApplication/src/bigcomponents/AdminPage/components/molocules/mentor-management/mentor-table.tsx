import { useState, useEffect } from 'react'
import './mentor-table.scss'
import api from '../../../../../config/axios';
import { Link } from 'react-router-dom';

function MentorTable() {
    const [mentors, setMentors] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 6;

    const getAllMentors = async () => {
        try {
            const response = await api.get('Mentor/list');
            const res = response.data;
            setMentors(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllMentors();
    }, [])

    // Pagination
    const lastIndex = currentPage * recordPage;
    const firstIndex = lastIndex - recordPage;
    const filteredMentors = mentors.filter(mentor => mentor.fullName.toLowerCase().includes(searchValue.toLowerCase()));
    const records = filteredMentors.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredMentors.length / recordPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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

    const updateBtn = (mentorId) => {
        window.location.href = `/Mentor/update/${mentorId}`;
    }

    const handleDelete = async (mentorId) => {
        try {
            // Perform the deletion
            await api.delete(`/Mentor/delete/${mentorId}`);

            // Reload the page after successful deletion
            window.location.reload();

            // Once deletion is successful, fetch the updated data
            await getAllMentors();

        } catch (err) {
            console.log(err);
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        setCurrentPage(1); // Reset to the first page when searching
    }

    return (
        <div className='mentor-table-container'>
            <div className="mentor-table-title text-center text-uppercase">
                <h1>Danh sách giáo viên</h1>
            </div>
            <div className='mentor-table-content'>
                <form action="">
                    <div className='d-grid mb-2'>
                        <div className="row">
                            <div className='search-input col align-self-center'>
                                <input
                                    type="text"
                                    name='fullName'
                                    placeholder='Họ và tên'
                                    onChange={handleSearch}
                                    autoComplete='off'
                                />
                            </div>
                            <div className='d-flex btnCreate col justify-content-end'>
                                <Link to='tao-giao-vien' className='btn btn-success'>+ Add</Link>
                            </div>
                        </div>
                    </div>
                    <table className='table table-hover table-striped' border={1}>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>Mã giáo viên</th>
                                <th scope='col'>Họ và Tên</th>
                                <th scope='col'>Điện thoại</th>
                                <th scope='col'>Dạy lý thuyết</th>
                                <th scope='col'>Dạy thực hành</th>
                                <th scope='col' style={{ width: '200px' }}>Email</th>
                                <th scope='col' className='text-center'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider align-middle'>
                            {records.length > 0 ? (
                                records.map((mentor, i) => (
                                    <tr key={i}>
                                        <td>{mentor.mentorId}</td>
                                        <td>{mentor.fullName}</td>
                                        <td>{mentor.phone}</td>
                                        <td>{mentor.isTeachingTheory ? 'Đang dạy' : 'Không dạy'}</td>
                                        <td>{mentor.isTeachingPractice ? 'Đang dạy' : 'Không dạy'}</td>
                                        <td>{mentor.email}</td>
                                        <td className='button text-center'>
                                            <button className="btn btn-primary" type="button" onClick={() => updateBtn(mentor.mentorId)}>Update</button>
                                            <button className="btn btn-danger" type="button" onClick={() => handleDelete(mentor.mentorId)}>Delete</button>
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
                            )}
                        </tbody>
                    </table>
                    <nav>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <button type='button' className='page-link' onClick={prePage}>Prev</button>
                            </li>
                            {pageNumbers.map((number) => (
                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <button type='button' className='page-link' onClick={() => changePage(number)}>{number}</button>
                                </li>
                            ))}
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

export default MentorTable;
