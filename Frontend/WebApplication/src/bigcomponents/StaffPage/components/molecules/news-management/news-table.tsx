import { useEffect, useState } from 'react';
import api from '../../../../../config/axios';
import './news-table.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function NewsTable() {
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.slice(0, maxLength) + '...';
        }
    }

    const [data, setData] = useState([]);

    const getAllNews = async () => {
        try {
            const response = await api.get('News/list');
            const res = response.data;
            setData(res.reverse());
        } catch (err) {
            console.log(err);
        }
    }

    const navigate = useNavigate();

    // Pagination part
    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 6;
    const lastIndex = currentPage * recordPage;
    const firsIndex = lastIndex - recordPage;
    const records = data.slice(firsIndex, lastIndex);
    const npage = Math.ceil(data.length / recordPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    useEffect(() => {
        getAllNews();
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
    }

    const handleDelete = async (newsId: number) => {
        try {
            // Perform the deletion
            await api.delete('News/deactivate/' + newsId);
            toast.success("Xóa thành công!")

            await getAllNews();

        } catch (err) {
            console.log(err);
        }
    }

    const updateBtn = (newsId) => {
        navigate(`cap-nhat-tin-tuc/${newsId}`);
        window.scroll( {
            top: 0,
            behavior: 'instant'
        });
    }

    return (
        <div className='news-table-container'>
            <div className="news-table-title text-center text-uppercase">
                <h1>Danh sách tin tức</h1>
            </div>
            <div className='news-table-content'>
                <form action="">
                    <div className='d-flex justify-content-end'>
                        <Link to='tao-tin-tuc' className='btn btn-success mb-2'>+ Add</Link>
                    </div>
                    <table className='table table-hover table-striped' border={1}>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>Mã tin tức</th>
                                <th scope='col'>Tiêu đề</th>
                                <th scope='col'>Mô tả</th>
                                <th scope='col'>Nội dung</th>
                                <th scope='col' className='text-center'>Trạng thái</th>
                                <th scope='col' className='text-center'>Cài đặt</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider align-middle'>
                            {records.length > 0 ? (
                                records.map((news, i) => (
                                    <tr key={i}>
                                        <td>{news.newsId}</td>
                                        <td>{truncateText(news.title, 12)}</td>
                                        <td>{truncateText(news.description, 15)}</td>
                                        <td>{truncateText(news.content, 30)}</td> {/* Truncate content here */}
                                        <td className='text-center'>{news.status.toString().toUpperCase()}</td>
                                        <td className='button text-center'>
                                            <button className="btn btn-primary" type="submit" onClick={() => updateBtn(news.newsId)}>Update</button>
                                            <button className="btn btn-danger" type="button" onClick={() => handleDelete(news.newsId)}>Delete</button>
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

export default NewsTable;
