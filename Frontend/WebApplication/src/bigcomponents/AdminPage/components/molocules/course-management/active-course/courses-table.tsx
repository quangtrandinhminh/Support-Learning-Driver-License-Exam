import { useEffect, useState } from 'react';
import api from '../../../../../../config/axios';
import './courses-table.scss';
import { Link, useNavigate } from 'react-router-dom';

function CourseTable() {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    //count number of members have enrolled into course
    const [mapRecord, setMapRecord] = useState(new Map());
    const map = new Map();

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
    const overallIndex = (currentPage - 1) * recordPage;

    const navigate = useNavigate();

    const [member, setMember] = useState([]);

    // Fetch all courses
    const getAllCourse = async () => {
        try {
            const response = await api.get('Course/list');
            const res = response.data;
            const getActiveCourse = res.filter(course => course.status === true);
            setData(getActiveCourse);
        } catch (err) {
            console.log(err);
        }
    };

    const getMember = async () => {
        try {
            const response = await api.get('/Members');
            const res = response.data;
            setMember(res);
        } catch (err) {
            console.log(err);
        }
    }

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

    const updateBtn = (courseId) => {
        navigate(`cap-nhat-khoa-hoc/${courseId}`);
        window.scroll({
            top: 0,
            behavior: 'instant'
        });
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

    const handleDelete = async (courseId) => {
        try {
            // Perform the deletion
            await api.delete('Course/deactivate/' + courseId);

            // Reload the page after successful deletion
            setTimeout(() => {
                location.reload();
            }, 0.1);

            // Once deletion is successful, fetch the updated data
            await getAllCourse();

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // Create and populate the map when data and member are available
        const uniqueCourseIds = new Set(data.map(data => data.courseId));
        for (const courseId of uniqueCourseIds) {
            map.set(String(courseId), member.filter(member => member.courseId === courseId));
        }
        setMapRecord(map);
    }, [data, member]);

    useEffect(() => {
        getAllCourse();
        getMember();
    }, []);

    return (
        <div className='courses-table-container'>
            <div className="courses-table-title text-center text-uppercase">
                <h1>Danh sách khoá học</h1>
            </div>
            <div className='courses-table-content'>
                <form action="">
                    <div className='d-grid mb-2'>
                        <div className="row">
                            <div className='search-input col align-self-center'>
                                <input
                                    type="text"
                                    name='courseId'
                                    placeholder='courseId'
                                    onChange={filter}
                                    autoComplete='off'
                                />
                            </div>
                            <div className='d-flex btnCreate col justify-content-end'>
                                <Link to='tao-khoa-hoc' className='btn btn-success'>+ Tạo khoá học</Link>
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
                                    console.log(mapValue);
                                    return (
                                        <tr key={i}>
                                            <td>{overallIndex + i + 1}</td>
                                            <td>
                                                <Link to='#'> {course.courseId}</Link>
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
                                                <button className="btn btn-primary" type="submit" onClick={() => updateBtn(course.courseId)}>Cập nhật</button>
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

export default CourseTable;
