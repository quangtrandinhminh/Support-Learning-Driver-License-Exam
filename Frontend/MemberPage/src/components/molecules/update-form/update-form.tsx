import MemberImg from '../../../../../assets/imgs/member/member_img.png'
import { useNavigate } from 'react-router-dom'
import './update-information.scss'

function UpdateInformationForm() {

    const navigate = useNavigate();

    function handleScroll() {
        window.scrollTo(0, 0);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleScroll();
        navigate('/thong-tin-ca-nhan');
    }

    return (
        <div className='update-information-container'>
            <h1 className='update-information-title'>Cập nhật thông tin</h1>
            <div className='update-information-content'>
                <div className='member-avatar'>
                    <img src={MemberImg} alt="" />
                </div>
                <form onSubmit={handleSubmit}>
                    <li>
                        <label htmlFor="name">Họ và tên: </label>
                        <input type="text" name="name" id="" />
                    </li>
                    <li className='line-1'>
                        <div className='dob-container'>
                            <label htmlFor="dob">Ngày sinh: </label>
                            <input type="date" name="dob" id="" />
                        </div>
                        <div className="gender-container">
                            <div className='male'>
                                <label htmlFor="gender-male">Nam: </label>
                                <input type="radio" name="gender-male" id="" />
                            </div>
                            <div className='female'>
                                <label htmlFor="gender-female">Nữ: </label>
                                <input type="radio" name="gender-female" id="" />
                            </div>
                        </div>
                    </li>
                    <li className='line-2'>
                        <div className='nationality-container'>
                            <label htmlFor="nationality">Quốc tịch: </label>
                            <input type="text" name="nationality" id="" />
                        </div>
                        <div className="nation-container">
                            <label htmlFor="nation">Dân tộc: </label>
                            <input type="text" name="nation" id="" />
                        </div>
                    </li>
                    <li>
                        <label htmlFor="phoneNo">Điện thoại di động: </label>
                        <input type="tel" name="phoneNo" id="" />
                    </li>
                    <li>
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="" />
                    </li>
                    <li>
                        <label htmlFor="residenceAddress"><strong><i>Địa chỉ thường trú: </i></strong></label>
                        <input type="text" name="residenceAddress" id="" disabled />
                    </li>
                    <li>
                        <label htmlFor="cccdNo"><strong><i>Số CCCD/CMND: </i></strong></label>
                        <input type="text" name="cccdNo" id="" disabled />
                    </li>
                    <li>
                        <label htmlFor="studentID"><strong><i>Mã số học viên: </i></strong></label>
                        <input type="text" name="studentID" id="" disabled />
                    </li>
                    <li>
                        <label htmlFor="courseID"><strong><i>Khoá học: </i></strong></label>
                        <input type="text" name="courseID" id="" disabled />
                    </li>
                    <button type='submit' className='confirm-btn'>Xác nhận</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateInformationForm