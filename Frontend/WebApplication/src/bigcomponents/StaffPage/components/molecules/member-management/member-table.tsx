import React, { useState, useEffect } from 'react'
import './member-table.scss'
import api from '../../../../../config/axios';

function MemberTable() {
  const [member, setMember] = useState<any[]>([])
  const [user, setUser] = useState<any[]>([])

  const getAllMembers = async () => {
    const response = await api.get('/Members');
    const res = response.data;
    setMember(res);
  }

  const getAllUser = async () => {
    const response = await api.get('/Users');
    const res = response.data;
    setUser(res);
  }

  //paganition part
  const [currentPage, setCurrentPage] = useState(1);
  const recordPage = 6;
  const lastIndex = currentPage * recordPage;
  const firsIndex = lastIndex - recordPage;
  const records = member.slice(firsIndex, lastIndex);
  const npage = Math.ceil(member.length / recordPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const overallIndex = (currentPage - 1) * recordPage;

  useEffect(() => {
    getAllMembers();
  }, [])

  useEffect(() => {
    getAllUser();
  }, [member]);

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
      <div className="user-table-title text-center text-uppercase">
        <h1>Danh sách học viên</h1>
      </div>
      <div className='user-table-content'>
        <form action="">
          <table className='table table-hover table-striped' border={1}>
            <thead className='table-primary'>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Name</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Email</th>
                <th scope='col' className='text-center'>Status</th>
                <th scope='col' className='text-center'>roleID</th>
                <th scope='col' className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody className='table-group-divider align-middle'>
              {records.length > 0 ? (
                records.map((user, i: number = 1) => (
                  <tr key={i}>
                    <td>{user.userId}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='text-center'></td>
                    <td className='text-center'></td>
                    <td className='button text-center'>
                      <button className="btn btn-primary" type="submit">Update</button>
                      <button className="btn btn-danger" type="submit">Delete</button>
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
        </form>
      </div>
    </div>
  )
}

export default MemberTable