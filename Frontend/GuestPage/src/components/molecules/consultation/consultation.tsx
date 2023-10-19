import './consultation.scss'
import Img from '/res/imgs/location/Screenshot 2023-10-17 004713.png'

function Consultation() {
  return (
    <>
      <div className="center-consultation-container">
        <ul className='text-box-list'>
          <li>
            <textarea className='text-box' placeholder="Họ và tên(*)" />
          </li>
          <li>
            <textarea className='text-box' placeholder="Số điện thoại(*)" />
          </li>
          <li>
            <textarea className='text-box' placeholder="Lời nhắn (Không bắt buộc)" />
          </li>
        </ul>
        <img src={Img} alt="location-img" />
        <button>Gửi</button>
      </div>
    </>
  )
}

export default Consultation