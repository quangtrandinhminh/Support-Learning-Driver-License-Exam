import './students-list.scss'

function StudentsList() {
  return (
    <>
      <div className="student-list-title-container">
        <h1>Danh sách học sinh khóa 236B2</h1>
      </div>
      <div className="students-list-container">
        <form action="">
          <table className='student-table'>
            <thead className='student-table-header'>
              <tr>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Khóa học hiện tại</th>
                <th>Tổng giờ học đã tham gia</th>
                <th>Tổng số km đã hoàn thành</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody className='student-table-body'>
              <tr>
                <td>1</td>
                <td>Nguyễn Văn B</td>
                <td>236B2</td>
                <td>50</td>
                <td>500</td>
                <td>Không có</td>
              </tr>
              <tr>
              <td>2</td>
                <td>Nguyễn Văn C</td>
                <td>236B2</td>
                <td>50</td>
                <td>500</td>
                <td>Không có</td>
              </tr>
              <tr>
              <td>3</td>
                <td>Nguyễn Văn D</td>
                <td>236B2</td>
                <td>50</td>
                <td>500</td>
                <td>Không có</td>
              </tr>
              <tr>
              <td>4</td>
                <td>Nguyễn Văn E</td>
                <td>236B2</td>
                <td>50</td>
                <td>500</td>
                <td>Không có</td>
              </tr>
              <tr>
              <td>5</td>
                <td>Nguyễn Văn F</td>
                <td>236B2</td>
                <td>50</td>
                <td>500</td>
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