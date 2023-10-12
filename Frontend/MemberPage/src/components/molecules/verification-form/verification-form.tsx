import './verification-form.scss'

function VerificationForm() {
  return (
    <div className='verification-form-container'>
      <h3 className='form-title'>Các thông tin sau được dùng để hoàn tất hồ sơ thi. Học viên vui lòng điền đầy đủ và chính xác!</h3>
      <div className="form-container">
        <form className='verification-form' action="">
          <p>Họ và Tên: </p><input type="text" name="" id="" />
          <br />
          <p>Ngày tháng năm sinh: </p><input type="text" name="" id="" />
          <div className="gender-container">
            <p className='gender'>Nam: </p><input type="checkbox" name="" id="" /><p className='gender'>Nữ: </p><input type="checkbox" name="" id="" />
          </div>
          <br />
          <p>Quốc tịch: </p><input type="text" name="" id="" /><p>Dân tộc: </p><input type="text" name="" id="" />
          <br />
          <p>Nơi đăng ký hộ khẩu thường trú: </p><input type="text" name="" id="" />
          <br />
          <p>Nơi cư trú: </p><input type="text" name="" id="" />
          <br />
          <p>Số CMND/CCCD: </p><input type="text" name="" id="" />
          <br />
          <p>Cấp ngày: </p><input type="date" name="" id="" /><p className='cccd-location'>Tại: </p><input type="text" name="" id="" />
          <br />
          <p>Điện thoại di động: </p><input type="tel" />
          <br />
          <p>Email: </p><input type="email" name="" id="" />
          <button type="submit">Tiếp tục</button>
        </form>
      </div>
    </div>
  )
}

export default VerificationForm
