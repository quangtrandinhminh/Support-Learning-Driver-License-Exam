import './member-information.scss'
import MemberImg from '../../../../../assets/imgs/member/member_img.png'

function MemberInformationForm() {
    return (
        <div className='member-information-container'>
            <h1 className='member-information-title'>Thông tin cá nhân</h1>
            <div className='member-information-content'>
                <form action="">
                    <div className='member-avatar'>
                        <img src={MemberImg} alt="" />
                    </div>
                    <ul>
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
                        <li>

                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default MemberInformationForm