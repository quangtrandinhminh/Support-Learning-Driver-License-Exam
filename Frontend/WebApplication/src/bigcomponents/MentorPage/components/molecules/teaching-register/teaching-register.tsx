import './teaching-register.scss'

function MentorTeachingRegister() {
  return (
    <>  
      <div className="title">
        <h1>Đăng kí lịch dạy</h1>
      </div>
      <div className="register-form-container">
        <div className="register-table-container">
          <form action="">
            <table>
              <thead className='register-header'>
                <tr>
                  <th></th>
                  <th>Ca sáng</th>
                  <th>Ca chiều</th>
                </tr>
              </thead>
              <tbody className='register-body'>
                <tr>
                  <td>Thứ hai</td>
                  <td align='center'><input type="checkbox" /></td>
                  <td align='center'><input type="checkbox" /></td>
                </tr>
                <tr>
                  <td>Thứ ba</td>
                  <td align='center'><input type="checkbox" /></td>
                  <td align='center'><input type="checkbox" /></td></tr>
                <tr>
                  <td>Thứ tư</td>
                  <td align='center'><input type="checkbox" /></td>
                  <td align='center'><input type="checkbox" /></td></tr>
                <tr>
                  <td>Thứ năm</td>
                  <td align='center'><input type="checkbox" /></td>
                  <td align='center'><input type="checkbox" /></td></tr>
                <tr>
                  <td>Thứ sáu</td>
                  <td align='center'><input type="checkbox" /></td>
                  <td align='center'><input type="checkbox" /></td>
                </tr>
              </tbody>
            </table>
          </form>
          <button>Xác nhận</button>
        </div>
      </div>
    </>
  )
}

export default MentorTeachingRegister