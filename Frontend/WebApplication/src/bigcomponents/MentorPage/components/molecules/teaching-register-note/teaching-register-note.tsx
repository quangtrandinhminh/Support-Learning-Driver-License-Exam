import './teaching-register-note.scss'

function TeachingRegisterNote() {
  return (
    <div className="register-note-container">
        <div className="register-note">
            <h3>Chú thích:</h3>
            <p>
                Ca sáng: từ 7h30 đến 11h30
                <br />
                Ca chiều: từ 13h30 đến 17h30
                <br />
                Ca tối: từ 18h đến 21h
            </p>
            <h3>Lưu ý: </h3>
            <p>
                Giáo viên cần sắp xếp thời gian biểu bản thân phù hợp để có thể tham gia dạy các lớp đầy đủ
                <br />
                Ca tối là ca dạy bắt buộc. Giáo viên chỉ cần đăng kí ca sáng hoặc tối
            </p>
        </div>
    </div>
  )
}

export default TeachingRegisterNote