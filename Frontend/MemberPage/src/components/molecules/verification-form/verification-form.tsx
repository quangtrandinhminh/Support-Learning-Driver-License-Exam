import './verification-form.scss'

function VerificationForm() {
  return (
    <div className='verification-form-container'>
      <h3 className='form-title'>Các thông tin sau được dùng để hoàn tất hồ sơ thi. Học viên vui lòng điền đầy đủ và chính xác!</h3>
      <div className="form-container">
        <form className='verification-form' action="">
          <li>
            <label>Họ và Tên: </label>
            <input type="text" />
          </li>

          <li>
            <label>Ngày tháng năm sinh: </label>
            <input type="date" name="" id="" />
          </li>

          <li>
            <label></label>
          </li>

          <li>

          </li>

          <li>

          </li>

          <li>

          </li>

          <li>

          </li>

          <li>

          </li>

          <li>

          </li>

          <li>

          </li>

          <li>

          </li>

          <li>

          </li>

          <button type='submit' className='cont-button'>Tiếp tục</button>

        </form>
      </div>
    </div>
  )
}

export default VerificationForm
