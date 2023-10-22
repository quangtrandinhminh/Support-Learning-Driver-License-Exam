import './consultation.scss'

function Consultation() {
  return (
    <>
      <div className="center-consultation-container" id='center-consultation'>
        <h1>Liên hệ để được tư vấn</h1>
        <ul className='text-box-list'>
          <li>
            <input type='text' className='text-box' placeholder="Họ và tên(*)" />
          </li>
          <li>
            <input type='text' className='text-box' placeholder="Số điện thoại(*)" />
          </li>
          <li>
            <textarea className='text-box-1' placeholder="Lời nhắn (Không bắt buộc)" />
          </li>
        </ul>
        <button>Gửi</button>
      </div>
    </>
  )
}

export default Consultation