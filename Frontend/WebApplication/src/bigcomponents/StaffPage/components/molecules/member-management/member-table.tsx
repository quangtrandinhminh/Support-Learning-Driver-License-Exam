import { useState, useEffect } from 'react'
import './member-table.scss'
import api from '../../../../../config/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import VNnum2words from 'vn-num2words';

function MemberTable() {
  const user = JSON.parse(sessionStorage.getItem('loginedUser'));
  const [staff, setStaff] = useState(null);
  const [member, setMember] = useState<any[]>([])
  const [_, setUpdateSuccess] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');
  const [specificMember, setSpecificMember] = useState(null);
  const navigate = useNavigate();
  const [specificCourse, setSpecificCourse] = useState(null);
  const [specificInfoLoaded, setSpecificInfoLoaded] = useState(false);
  const [inputData, setInputData] = useState({
    staffId: "",
    memberId: "",
    amountPaid: 0,
    amountInWords: ""
  });

  const formatDate = (dbDate) => {
    const date = new Date(dbDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const invoiceDate = formatDate(new Date());

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => {
    setShow(true);
  }

  const getSpecificInformation = async (memberID, courseId) => {
    try {
      const response1 = await api.get("Member?memberId=" + memberID);
      const res1 = response1.data;
      setSpecificMember(res1);
      const response2 = await api.get("Course/" + courseId);
      const res2 = response2.data;
      setSpecificCourse(res2);
      setSpecificInfoLoaded(true); // Set the flag when the information is loaded
    } catch (err) {
      console.log(err);
    }
  }

  const filteredData = member.filter(member => member.fullName.toLowerCase().includes(searchValue));

  const getStaffByUID = async () => {
    try {
      const response = await api.get("Staff/user/" + user.userID);
      const res = response.data;
      setStaff(res);
    } catch (err) {
      console.log(err);
    }
  }

  const getAllMembers = async () => {
    const response = await api.get('/Members');
    const res = response.data;
    setMember(res);
  }

  const updateMemberIsPaidAndFetchData = async () => {
    try {
      // Update the payment status of member
      // await api.put('Member/editIsPaid?memberId=' + memberId);
      // setUpdateSuccess(true);

      // Fetch member data
      // const fetchResponse = await api.get(`Member?memberId=${memberId}`);
      // console.log(fetchResponse.data);
      // sessionStorage.setItem('loginedMember', JSON.stringify(fetchResponse.data));

      // New API to adding member to student if his/her payment is True
      await api.post("Invoice/create", inputData);
      const notificationMessage = "Cập nhật thanh toán thành công!";
      localStorage.setItem("notificationMessage", notificationMessage);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const filter = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    setCurrentPage(1);
  }

  const handleApplication = (memberId) => {
    navigate('don-thi/' + memberId);
  }

  //paganition part
  const [currentPage, setCurrentPage] = useState(1);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firsIndex = lastIndex - recordPage;
  const records = filteredData.slice(firsIndex, lastIndex);
  const npage = Math.ceil(member.length / recordPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)

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

  useEffect(() => {
    getAllMembers();
    getStaffByUID();
    const notification = localStorage.getItem("notificationMessage");
    if (notification) {
      toast.success(notification);
      localStorage.removeItem("notificationMessage"); // Remove the message from localStorage
    }
  }, [])

  useEffect(() => {
    const storedNotificationMessage = localStorage.getItem("notificationMessage");

    if (storedNotificationMessage) {
      toast.success(storedNotificationMessage);
      localStorage.removeItem("notificationMessage"); // Remove the message from localStorage
    }
  }, []);

  useEffect(() => {
    // Check if specific information is loaded before updating inputData
    if (specificMember && specificCourse && specificInfoLoaded) {
      setInputData({
        ...inputData,
        staffId: staff.staffId,
        memberId: specificMember.memberID,
        amountPaid: specificCourse.courseFee,
        amountInWords: capitalizeFirstLetter(VNnum2words(specificCourse.courseFee) + "đồng")
      });
    }
  }, [specificMember, specificCourse, specificInfoLoaded, show]); // Add show as a dependency

  return (
    <div className='member-table-container'>
      <div className="member-table-title text-center text-uppercase">
        <h1>Danh sách thành viên</h1>
      </div>
      <div className='member-table-content'>
        <form action="">
          <div className='search-input col align-self-center tw-mb-2'>
            <input
              type="text"
              name='courseId'
              placeholder='tên thành viên'
              onChange={filter}
              autoComplete='off'
            />
          </div>
          <table className='table table-hover table-striped' border={1}>
            <thead className='table-primary'>
              <tr>
                <th scope='col'>Mã thành viên</th>
                <th scope='col'>Họ và Tên</th>
                <th scope='col'>Điện thoại</th>
                <th scope='col'>Email</th>
                <th scope='col' className='tw-text-center'>Khoá học đang học</th>
                <th scope='col' className='text-center'>Trạng thái thanh toán</th>
                <th scope='col' className='text-center tw-w-72'></th>
              </tr>
            </thead>
            <tbody className='table-group-divider align-middle'>
              {records.length > 0 ? (
                records.map((member, i) => (
                  <tr key={i}>
                    <td>{member.memberID}</td>
                    <td>{member.fullName}</td>
                    <td>{member.phone}</td>
                    <td>{member.email}</td>
                    <td className='tw-text-center'>{member.courseId}</td>
                    <td className='text-center'>{member.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                    <td className='button text-center'>
                      {
                        member.isPaid ? (
                          <button className="btn btn-primary"
                            type="button"
                            onClick={() => {
                              setSpecificInfoLoaded(false); // Reset the flag before fetching specific information
                              getSpecificInformation(member.memberID, member.courseId);
                              handleShow();
                            }}
                            disabled>Thanh toán</button>
                        ) : (
                          <button className="btn btn-primary" type="button" onClick={() => {
                            setSpecificInfoLoaded(false); // Reset the flag before fetching specific information
                            getSpecificInformation(member.memberID, member.courseId);
                            handleShow();
                          }}>Thanh toán</button>
                        )
                      }
                      <button className="btn btn-info" type="button" onClick={(e) => handleApplication(member.memberID)}>Đơn thi</button>
                      <button className="btn btn-danger" type="submit">Xoá</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <h1 className='text-center text-red-600 p-5 tw-text-realRed'>
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
            <h1 className='tw-text-center'>Xác nhận thanh toán</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='course-information-container'>
            <div className='course-information-title'>
              <h3></h3>
            </div>
            {
              specificMember && staff && specificCourse ? (
                <>
                  <div>
                    <ul className='tw-flex tw-flex-col tw-gap-2 tw-text-lg'>
                      <li>
                        <label htmlFor="member-name">Học viên: {specificMember.fullName}
                          <input type="text" value={specificMember.memberID} hidden />
                        </label>
                      </li>
                      <li>
                        <label htmlFor="staff-name">Nhân viên xác nhận: {staff.fullName}</label>
                      </li>
                      <li>
                        <label htmlFor="course-study">Khoá học: {(specificCourse.courseId)}</label>
                      </li>
                      <li>
                        <label htmlFor="invoice-date">Ngày thanh toán: {invoiceDate}</label>
                      </li>
                      <li>
                        <label htmlFor="course-fee">Học phí: {specificCourse.courseFee.toLocaleString()}VNĐ</label>
                      </li>
                      <li>
                        <label htmlFor="fee-words">Thành tiền: {capitalizeFirstLetter(VNnum2words(specificCourse.courseFee) + "đồng")}</label>
                      </li>
                    </ul>
                  </div>
                </>
              ) : null
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button className='btn' onClick={() => updateMemberIsPaidAndFetchData()}>Xác nhận</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MemberTable