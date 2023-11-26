import React, { useEffect, useState } from 'react';
import api from '../../../../../../config/axios';
import './courses-table.scss';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';

function CourseTable() {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [courseMonthList, setCourseMonthList] = useState([]);
    const [mapRecord, setMapRecord] = useState(new Map());
    const map = new Map();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 10;
    const lastIndex = currentPage * recordPage;
    const firstIndex = lastIndex - recordPage;

    const filteredData = data.filter(course =>
        course.courseId.toLowerCase().includes(searchValue) &&
        (course.courseMonth === parseInt(selectedMonth) || selectedMonth === '')
    );

    const records = filteredData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredData.length / recordPage);
    const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);
    const overallIndex = (currentPage - 1) * recordPage;
    const [specificCourse, setSpecificCourse] = useState(null);
    const [memberList, setMemberList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllCourse();
        getMember();
    }, []);

    const getAllCourse = async () => {
        try {
            const response = await api.get('Course/list');
            const activeCourses = response.data.filter(course => course.status === true);
            const courseMonthSet = new Set(activeCourses.map(course => course.courseMonth));
            setCourseMonthList(Array.from(courseMonthSet));
            setData(activeCourses);
        } catch (err) {
            console.error(err);
        }
    };

    const getMember = async () => {
        try {
            const response = await api.get('/Members');
            const res = response.data;
            setMemberList(res);
        } catch (err) {
            console.error(err);
        }
    };

    const prePage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changeCPage = (id) => {
        setCurrentPage(id);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const updateBtn = (courseId) => {
        navigate(`cap-nhat-khoa-hoc/${courseId}`);
        window.scroll({
            top: 0,
            behavior: 'instant',
        });
    };

    const filter = (e) => {
        const value = e.target.value.toLowerCase();
        if (e.target.name === 'courseId') {
            setSearchValue(value);
        } else if (e.target.name === 'courseMonth') {
            // If 'Tháng' is selected, set selectedMonth to an empty string
            setSelectedMonth(value === 'Tháng' || value === "tất cả" ? '' : value);
        }
        setCurrentPage(1); // Reset to the first page when
    };

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDelete = async (courseId) => {
        try {
            await api.delete(`Course/deactivate/${courseId}`);
            location.reload(); // You might want to use a different approach for updating the data
        } catch (err) {
            console.error(err);
        }
    };

    const showInfo = async (courseId) => {
        try {
            const response1 = await api.get(`Course/${courseId}`);
            const res1 = response1.data;
            setSpecificCourse(res1);
            const response2 = await api.get('Members');
            const res2 = response2.data;
            const membersInCourse = res2.filter(member => member.courseId === courseId);
            setMemberList(membersInCourse);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='courses-table-container'>
            <div className="courses-table-title text-center text-uppercase">
                <h1>Danh sách khoá học</h1>
            </div>
            <div className='courses-table-content'>
                <form>
                    <div className='d-grid mb-2'>
                        <div className="row">
                            <div className='search-input col align-self-center tw-h-full'>
                                <input
                                    type="text"
                                    name='courseId'
                                    placeholder='Mã khoá học'
                                    onChange={filter}
                                    autoComplete='off'
                                />
                                <select
                                    name="courseMonth"
                                    id=""
                                    onChange={filter}
                                    value={selectedMonth}
                                    className='tw-h-full tw-ml-2 tw-rounded-lg'
                                >
                                    <option value="" disabled>Tháng</option>
                                    <option value="Tất cả">Tất cả</option>
                                    {courseMonthList.map((month, i) => (
                                        <option key={i} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='d-flex btnCreate col justify-content-end'>
                                <Link to='tao-khoa-hoc' className='btn btn-success'>+ Thêm khoá học</Link>
                            </div>
                        </div>
                    </div>
                    <table className='table table-hover table-striped' border={1}>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Mã khoá học</th>
                                <th scope='col'>Tên</th>
                                <th scope='col'>Ngày khai giảng</th>
                                <th scope='col'>Ngày bế giảng</th>
                                <th className='text-center' scope='col'>Số học viên</th>
                                <th className='text-center' scope='col'>Số học viên tối đa</th>
                                <th scope='col' className='text-center'>Tháng</th>
                                <th scope='col' className='text-center'>Năm</th>
                                <th scope='col' className='text-center'>Trạng thái</th>
                                <th scope='col' className='text-center'></th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider align-middle'>
                            {records.length > 0 ? (
                                records.map((course, i) => {
                                    const mapKey = mapRecord.get(course.courseId);
                                    const mapValue = mapKey ? mapKey.length : 0;
                                    return (
                                        <tr key={i}>
                                            <td>{overallIndex + i + 1}</td>
                                            <td>
                                                <a href='/' onClick={(e) => (handleShow(), showInfo(course.courseId), e.preventDefault())}>{course.courseId}</a>
                                            </td>
                                            <td>{course.name}</td>
                                            <td>{formatDate(course.startDate)}</td>
                                            <td>{formatDate(course.endDate)}</td>
                                            <td className='text-center'>{mapValue}</td>
                                            <td className='text-center'>{course.limitStudent}</td>
                                            <td className='text-center'>{course.courseMonth}</td>
                                            <td className='text-center'>{course.courseYear}</td>
                                            <td className='text-center'>{course.status ? "Đã kích hoạt" : "Chưa kích hoạt"}</td>
                                            <td className='button text-center'>
                                                <button className="btn btn-primary" type="button" onClick={() => updateBtn(course.courseId)}>Cập nhật</button>
                                                <button className="btn btn-danger" type="button" onClick={() => handleDelete(course.courseId)}>Xoá</button>
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
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button type='button' className='page-link' onClick={prePage} disabled={currentPage === 1}>Trước</button>
                            </li>
                            {pageNumbers.map((n, i) => (
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <button type='button' className='page-link' onClick={() => changeCPage(n)}>{n}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button type='button' className='page-link' onClick={nextPage} disabled={currentPage === totalPages}>Sau</button>
                            </li>
                        </ul>
                    </nav>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={true}
                        backdropClassName='backdrop'
                        centered
                        size='lg'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h1 className='tw-text-center'>Thông tin</h1>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='course-information-container'>
                                <div className='course-information-title'>
                                    <h3>Thông tin khoá học</h3>
                                </div>
                                {specificCourse !== null ? (
                                    <ul className="information-list-container">
                                        <li className="list-inf-items">
                                            <span className="list-inf-items-title">Tên khoá học: </span>
                                            <span className="list-inf-items-content">{specificCourse.name}</span>
                                        </li>
                                        <li className="list-inf-items">
                                            <span className="list-inf-items-title">Ngày khai giảng: </span>
                                            <span className="list-inf-items-content">{formatDate(specificCourse.startDate)}</span>
                                        </li>
                                        <li className="list-inf-items">
                                            <span className="list-inf-items-title">Ngày bế giảng: </span>
                                            <span className="list-inf-items-content">{formatDate(specificCourse.endDate)}</span>
                                        </li>
                                        <li className="list-inf-items">
                                            <span className="list-inf-items-title">Học viên trong khoá: </span>
                                            <span className="list-inf-items-content">
                                                <ul className='member-items-container'>
                                                    {memberList.length > 0 && memberList.map((member, i) => (
                                                        <li className='member-items' key={i}>{member.fullName}</li>
                                                    ))}
                                                </ul>
                                            </span>
                                        </li>
                                    </ul>
                                ) : null}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </form>
            </div>
        </div>
    );
}

export default CourseTable;
