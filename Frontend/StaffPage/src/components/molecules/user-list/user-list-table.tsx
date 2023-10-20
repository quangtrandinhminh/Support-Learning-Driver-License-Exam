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

    useEffect(() => {
        getAllUser();
    }, [])

    return (
        <div className='user-table-container'>
            <div className="user-table-title text-center uppercase">
                <h1>Danh sách người dùng</h1>
            </div>
            <div className='user-table-content'>
                <table className='table table-striped' border={1}>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>roleID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((user, i: number = 1) => (
                                <tr key={i}>
                                    <td>{user.userID}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td className='text-left'>{user.roleId}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserListTable