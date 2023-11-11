import './class-list.scss'

function ClassList() {
  return (
    <>
    <div className="class-list-title-container">
      <h1>Danh sách các lớp học khóa XXB2</h1>
    </div>
    <div className="class-list-container">
      <form action="">
        <table className='class-table'>
          <thead className='class-table-header'>
            <tr>
            <td>STT</td>
            <td>Tên lớp</td>
            <td>Mã số lớp</td>
            <td>Ghi chú</td>
            </tr>
          </thead>
          <tbody className='class-table-body'>
           <tr>
              <td>1</td>
              <td><a href="danh-sach-lop-hoc/danh-sach-hoc-vien">XXB2</a></td>
              <td>XXB2</td>
              <td>Không có</td>
           </tr>
           <tr>
              <td>2</td>
              <td><a href="danh-sach-lop-hoc/danh-sach-hoc-vien">XXB2</a></td>
              <td>XXB2</td>
              <td>Không có</td>
           </tr>
           <tr>
              <td>3</td>
              <td><a href="danh-sach-lop-hoc/danh-sach-hoc-vien">XXB2</a></td>
              <td>XXB2</td>
              <td>Không có</td>
           </tr>
           <tr>
              <td>4</td>
              <td><a href="danh-sach-lop-hoc/danh-sach-hoc-vien">XXB2</a></td>
              <td>XXB2</td>
              <td>Không có</td>
           </tr>
           <tr>
              <td>5</td>
              <td><a href="danh-sach-lop-hoc/danh-sach-hoc-vien">XXB2</a></td>
              <td>XXB2</td>
              <td>Không có</td>
           </tr>
          </tbody>
        </table>
      </form>
    </div>
    </>
  )
}

export default ClassList