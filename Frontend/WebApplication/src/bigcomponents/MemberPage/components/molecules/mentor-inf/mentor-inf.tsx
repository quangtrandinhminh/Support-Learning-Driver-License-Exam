import './mentor-inf.scss'
import MemberImg from '../../../../../assets/imgs/member/member_img.png'

function MentorInformation() {
    return (
        <div className="mentor-info-conatiner">
            <h1 className='main-title'>Thông tin giảng viên</h1>
            <div className='info-content'>
                <div className='mentor-img' >
                    <img src={MemberImg} alt="" />
                </div>
                <div className='mentor-info'>
                    <table>
                        <li>
                            <label htmlFor="name">Họ và tên: </label>
                            <span>Nguyễn Văn A</span>
                        </li>
                        <li>
                            <label htmlFor="gender">Giới tính: </label>
                            <span>Nam</span>
                        </li>
                        <li>
                            <label htmlFor="phone">Điện thoại di động: </label>
                            <span>012344556</span>
                        </li>
                        <li>
                            <label htmlFor="email">Email: </label>
                            <span>nguyenvana@gmail.com</span>
                        </li>
                        <li>
                            <label htmlFor="mentorID">Mã số giảng viên: </label>
                            <span>MT001</span>
                        </li>
                        <li>
                            <label htmlFor="courseRes">Khoá học phụ trách: </label>
                            <span>202B2</span>
                        </li>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default MentorInformation