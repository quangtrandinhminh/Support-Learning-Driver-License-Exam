import './teaching-register.scss'

function MentorTeachingRegister() {
  return (
    <>
      <div className="register-form-container">
        <div className="title">
          <h1>Đăng kí lịch dạy</h1>
        </div>
        <form action="">
          <table>
            <thead>
              <tr>
                <th>-</th>
                <th>Ca sáng</th>
                <th>Ca chiều</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Thứ hai</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
              </tr>
              <tr>
                <td>Thứ ba</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
              </tr>
              <tr>
                <td>Thứ tư</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
              </tr>
              <tr>
                <td>Thứ năm</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
              </tr>
              <tr>
                <td>Thứ sáu</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
              </tr>
            </tbody>
          </table>
        </form>
        
      </div>
    </>
  )
}

export default MentorTeachingRegister