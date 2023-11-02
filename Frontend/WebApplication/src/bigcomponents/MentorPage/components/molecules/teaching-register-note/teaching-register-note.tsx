import './teaching-register-note.scss'

function TeachingRegisterNote() {
  return (
    <div className="register-note-container">
        <div className="register-note">
            <h1>Chú thích: </h1>
            <p>
                Ca sáng: từ 7h30 đến 11h30
                <br />
                Ca chiều: từ 13h30 đến 17h30
            </p>
            <h1>Lưu ý: </h1>
            <p>
                Giáo viên chọn ít nhất 2 ngày trong tuần để dạy, ngày dạy thực hành 
                không được trùng với ngày có lịch dạy lí thuyết 
                <br />
                Sau khi đăng kí thì lịch dạy
                là cố định. Giáo viên cần sắp xếp thời gian biểu bản thân phù hợp để 
                có thể tham gia dạy các lớp đầy đủ
            </p>
        </div>
    </div>
  )
}

export default TeachingRegisterNote