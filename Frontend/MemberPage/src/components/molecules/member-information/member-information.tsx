import './member-information.scss'
import MemberImg from '../../../../../assets/imgs/member/member_img.png'

function MemberInformationForm() {
    return (
        <div className='member-information-container'>
            <h1 className='member-information-title'>Thông tin cá nhân</h1>
            <div className='member-information-content'>
                <div className='member-avatar'>
                    <img src={MemberImg} alt="" />
                </div>
                <form action="">
                    <li>
                        <label htmlFor="name">Họ và tên: </label>
                        <input type="text" name="name" id="" />
                    </li>
                    <li className='line-1'>
                        <div className='dob-container'>
                            <label htmlFor="dob">Ngày sinh: </label>
                            <input type="date" name="" id="" />
                        </div>
                        <div className="gender-container">
                            <div className='gender-male'>
                                <label htmlFor="gender">Nam:</label>
                                <input type="radio" name="gender-male" id="" />
                            </div>
                            <div className='gender-female'>
                                <label htmlFor="gender">Nữ:</label>
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

                    </li>
                    <li>

                    </li>
                    <li>

                    </li>
                    <li>

                    </li>
                    <li>

                    </li>
                </form>
            </div>
        </div>
    )
}

export default MemberInformationForm