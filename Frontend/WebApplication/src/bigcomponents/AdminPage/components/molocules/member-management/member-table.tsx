import { useState, useEffect } from 'react'
import './member-table.scss'
import api from '../../../../../config/axios';
import { toast } from 'react-toastify';

function MemberTable() {
  const [member, setMember] = useState<any[]>([])
  const [_, setUpdateSuccess] = useState<boolean>(false);

  const getAllMembers = async () => {
    const response = await api.get('/Members');
    const res = response.data;
    setMember(res);
  }

  const updateMemberIsPaidAndFetchData = async (memberId) => {
    try {
      console.log(memberId);
      // Update the payment status
      await api.put('Member/editIsPaid?memberId=' + memberId);
      setUpdateSuccess(true);

      // Fetch member data
      const fetchResponse = await api.get(`Member?memberId=${memberId}`);
      console.log(fetchResponse.data);
      sessionStorage.setItem('loginedMember', JSON.stringify(fetchResponse.data));
      const notificationMessage = "Cập nhật thành công!";
      localStorage.setItem("notificationMessage", notificationMessage);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  //paganition part
  const [currentPage, setCurrentPage] = useState(1);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firsIndex = lastIndex - recordPage;
  const records = member.slice(firsIndex, lastIndex);
  const npage = Math.ceil(member.length / recordPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)

  useEffect(() => {
    getAllMembers();
  }, [])

  useEffect(() => {
    const storedNotificationMessage = localStorage.getItem("notificationMessage");

    if (storedNotificationMessage) {
      toast.success(storedNotificationMessage);
      localStorage.removeItem("notificationMessage"); // Remove the message from localStorage
    }
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
    console.log(npage);
  }

  return (
    <div className='member-table-container'>
      <div className="member-table-title text-center text-uppercase">
        <h1>Danh sách học viên</h1>
      </div>
      <div className='member-table-content'>
        <form action="">
          <table className='table table-hover table-striped' border={1}>
            <thead className='table-primary'>
              <tr>
                <th scope='col'>Mã học viên</th>
                <th scope='col'>Họ và Tên</th>
                <th scope='col'>Điện thoại</th>
                <th scope='col' style={{ width: '200px' }}>Email</th>
                <th scope='col'>Khoá học đang học</th>
                <th scope='col' className='text-center'>Trạng thái thanh toán</th>
                <th scope='col' className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody className='table-group-divider align-middle'>
              {records.length > 0 ? (
                records.map((member, i: number = 1) => (
                  <tr key={i}>
                    <td>{member.memberID}</td>
                    <td>{member.fullName}</td>
                    <td>{member.phone}</td>
                    <td>{member.email}</td>
                    <td className='tw-text-center'>{member.courseId}</td>
                    <td className='text-center'>{member.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                    <td className='button text-center'>
                      <button className="btn btn-primary" type="button" onClick={() => updateMemberIsPaidAndFetchData(member.memberID)}>Update</button>
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
  )
}

export default MemberTable