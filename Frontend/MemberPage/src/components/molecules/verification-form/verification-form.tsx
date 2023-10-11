import './verification-form.scss'

function VerificationForm() {
  return (
    <div className='verification-form-container'>
      <h3 className='form-title'>Các thông tin sau được dùng để hoàn tất hồ sơ thi. Học viên vui lòng điền đầy đủ và chính xác!</h3>
      <div className="form-container">
        <form className='verification-form' action="">
          Họ và Tên: <input type="text" name="" id="" />
          <br />
          Ngày tháng năm sinh: <input type="text" name="" id="" />
          <div className='gender'>
            Nam: <input type="checkbox" name="" id="" /> Nữ: <input type="checkbox" name="" id="" />
          </div>
          <br />
          Quốc tịch: <input type="text" name="" id="" /> Dân tộc: <input type="text" name="" id="" />
          <br />
          Nơi đăng ký hộ khẩu thường trú: <input type="text" name="" id="" />
          <br />
          Nơi cư trú: <input type="text" name="" id="" />
          <br />
          Số CMND/CCCD: <input type="text" name="" id="" />
          <br />
          Cấp ngày: <input type="date" name="" id="" /> Tại: <input type="text" name="" id="" />
          <br />
          Điện thoại di động: <input type="tel" />
          <br />
          Email: <input type="email" name="" id="" />
          <button type="submit">Tiếp tục</button>

        </form>
      </div>
    </div>
  )
}

export default VerificationForm
