import './students-list.scss'

function StudentsList() {
  return (
    <>
    <div className="student-list-title-container">
      <h1>Danh sách học sinh lớp XXB2 khóa XXB2</h1>
    </div>
    <div className="students-list-container">
      <form action="">
        <table className='student-table'>
          <thead className='student-table-header'>
            <tr>
            <td>STT</td>
            <td>Mã số học sinh</td>
            <td>Họ và tên</td>
            <td>Khóa học hiện tại</td>
            <td>Tổng giờ học đã tham gia</td>
            <td>Tổng số km đã hoàn thành</td>
            <td>Ghi chú</td>
            </tr>
          </thead>
          <tbody className='student-table-body'>
            <tr>
              <td>1</td>
              <td>HS001</td>
              <td>Nguyễn Văn A</td>
              <td>XXB2</td>
              <td>100</td>
              <td>1000</td>
              <td>Không có</td>
            </tr>
            <tr>
              <td>2</td>
              <td>HS001</td>
              <td>Nguyễn Văn A</td>
              <td>XXB2</td>
              <td>100</td>
              <td>1000</td>
              <td>Không có</td>
            </tr>
            <tr>
              <td>3</td>
              <td>HS001</td>
              <td>Nguyễn Văn A</td>
              <td>XXB2</td>
              <td>100</td>
              <td>1000</td>
              <td>Không có</td>
            </tr>
            <tr>
              <td>4</td>
              <td>HS001</td>
              <td>Nguyễn Văn A</td>
              <td>XXB2</td>
              <td>100</td>
              <td>1000</td>
              <td>Không có</td>
            </tr>
            <tr>
              <td>5</td>
              <td>HS001</td>
              <td>Nguyễn Văn A</td>
              <td>XXB2</td>
              <td>100</td>
              <td>1000</td>
              <td>Không có</td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    </>
  )
}

export default StudentsList