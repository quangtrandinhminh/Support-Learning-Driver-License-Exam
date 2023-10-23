import './member-information.scss'
import MemberImg from '../../../../../../assets/imgs/member/member_img.png'
import { useNavigate } from 'react-router-dom'

function MemberInformationForm() {
    function handleScroll() {
        window.scrollTo(0, 0);
    }

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/thong-tin-ca-nhan/cap-nhat')
    }

    return (
        <div className='member-information-container'>
            <h1 className='member-information-title'>Thông tin cá nhân</h1>
            <div className='member-information-content'>
                <div className='member-avatar'>
                    <img src={MemberImg} alt="hinh-anh-giang-vien" />
                </div>
                <form onSubmit={handleSubmit}>
                    <li>
                        <label htmlFor="name">Họ và tên: </label>
                        <span>Nguyễn Thanh Phong</span>
                    </li>
                    <li className='line-1'>
                        <div className='dob-container'>
                            <label htmlFor="dob">Ngày sinh: </label>
                            <span>21/09/2003</span>
                        </div>
                        <div className="gender-container">
                            <label htmlFor="gender">Giới tính: </label>
                            <span>Nam</span>
                        </div>
                    </li>
                    <li className='line-2'>
                        <div className='nationality-container'>
                            <label htmlFor="nationality">Quốc tịch: </label>
                            <span>Việt Nam</span>
                        </div>
                        <div className="nation-container">
                            <label htmlFor="nation">Dân tộc: </label>
                            <span>Kinh</span>
                        </div>
                    </li>
                    <li>
                        <label htmlFor="phoneNo">Điện thoại di động: </label>
                        <span>0938555758</span>
                    </li>
                    <li>
                        <label htmlFor="email">Email: </label>
                        <span>nthanhphong941@gmail.com</span>
                    </li>
                    <li>
                        <label htmlFor="residenceAddress"><strong><i>Địa chỉ thường trú: </i></strong></label>
                        <span >136/7 Lê Thánh Tôn</span>
                    </li>
                    <li>
                        <label htmlFor="cccdNo"><strong><i>Số CCCD/CMND: </i></strong></label>
                        <span>0792xxxxxxxx</span>
                    </li>
                    <li>
                        <label htmlFor="studentID"><strong><i>Mã số học viên: </i></strong></label>
                        <span></span>
                    </li>
                    <li>
                        <label htmlFor="courseID"><strong><i>Khoá học: </i></strong></label>
                        <span></span>
                    </li>
                    <button className='update-btn' type='submit' onClick={handleScroll}>Cập nhật</button>
                </form>
            </div>
        </div>
    )
}

export default MemberInformationForm