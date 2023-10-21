import axios from 'axios'
import './user-list-table.scss'
import { useEffect, useState } from 'react';

function UserListTable() {

    const [data, setData] = useState<any[]>([])

    const getAllUser = async () => {
        await axios.get('https://localhost:7238/api/User')
            .then(res => {
                setData(res.data)
            });
    }

    //paganition part
    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 9;
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
        <div className='user-table-container'>
            <div className="user-table-title text-center uppercase">
                <h1>Danh sách người dùng</h1>
            </div>
            <div className='user-table-content'>
                <table className='table table-hover   table-striped' border={1}>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>roleID</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider align-bottom'>
                        {records.length > 0 ? (
                            records.map((user, i: number = 1) => (
                                <tr key={i}>
                                    <td>{user.userID}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td className='text-left'>{user.roleId}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>
                                    <h1 className='text-center text-red-600 p-5'>No data found. Check data source again</h1>
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
                <nav>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <a href="#" className='page-link'
                                onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href="#" className='page-link'
                                        onClick={() => changeCPage(n)}>{n}</a>
                                </li>
                            ))
                        }
                        <li className='page-item'>
                            <a href="#" className='page-link'
                                onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default UserListTable