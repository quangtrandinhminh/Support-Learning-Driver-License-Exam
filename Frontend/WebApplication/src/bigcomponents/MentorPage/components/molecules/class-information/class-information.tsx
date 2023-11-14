import './class-information.scss'

function MentorClassInformation() {
  return (
    <>
      <div className="class-information-title-container">
        <h1>Chi tiết lớp học XXB2 khóa XXB2</h1>
      </div>
      <div className="class-information-container">
        <p>
          Thời gian: Thứ hai, ngày 13 tháng 11 năm 2023
          <br />
          Buổi thứ: 1
          <br />
          Phân loại: Thực hành
          <br />
          Nội dung: Thực tập sa hình
          <br />
          Lớp phụ trách: 236B2
          <br />
          Trạng thái: Đã hoàn thành
          <br />
          <a href="lich-day/chi-tiet-lich-day">Xem đánh giá</a>
        </p>
      </div>
    </>
  )
}

export default MentorClassInformation