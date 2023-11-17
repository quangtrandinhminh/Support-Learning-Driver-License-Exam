import './class-list.scss'

function ClassList() {
  return (
    <>
    <div className="class-list-title-container">
      <h1>Danh sách các lớp học khóa 1101B2</h1>
    </div>
    <div className="class-list-container">
      <form action="">
        <table className='class-table'>
          <thead className='class-table-header'>
            <tr>
            <th>STT</th>
            <th>Mã lớp</th>
            <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody className='class-table-body'>
           <tr>
              <td>1</td>
              <td><a href="danh-sach-lop-hoc/danh-sach-thanh-vienen">236B2</a></td>
              <td>Không có</td>
           </tr>
           <tr>
              <td>2</td>
              <td><a href="danh-sach-lop-hoc/danh-sach-thanh-vienen">237B2</a></td>
              <td>Không có</td>
           </tr>
           <tr>
              <td>3</td>
              <td><a href="danh-sach-lop-hoc/danh-sach-thanh-vienen">238B2</a></td>
              <td>Không có</td>
           </tr>
           <tr>
              <td>4</td>
              <td><a href="danh-sach-lop-hoc/danh-sach-thanh-vienen">230B2</a></td>
              <td>Không có</td>
           </tr>
           <tr>
              <td>5</td>
              <td><a href="danh-sach-lop-hoc/danh-sach-thanh-vienen">231B2</a></td>
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