import { useState } from 'react'
import './verification-form.scss'
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

function VerificationForm() {
  const [inputData, setInputData] = useState({
    name: '',
    dob: '',
    gender: 'nam',
    nationality: '',
    nation: '',
    residenceAddress: '',
    tempoAddress: '',
    cccdNo: '',
    providedCardDate: '',
    providedCadLocation: '',
    phoneNo: '',
    email: '',
  });

  const navigation = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // axios.post('http://localhost:3000/users', inputData)
    //   .then(res => {
    //     console.log(res);
    //     alert('Success, view db.json file to see information');
    //     window.scrollTo(0, 0);
    toast.success("Bạn đã đăng ký khoá học {tên khoá học} thành công"); 
    navigation('/khoa-hoc-cua-ban');
    //   })
  }

  return (
    <div className='verification-form-container'>
      <h3 className='form-title'>Các thông tin sau được dùng để hoàn tất hồ sơ thi. Học viên vui lòng điền đầy đủ và chính xác!</h3>
      <div className="form-container">
        <div className="form-content">
          <form className='verification-form' action='post' onSubmit={handleSubmit}>
            <li>
              <label htmlFor="name">Họ và tên:</label>
              <input type="text" name='name' id=''
                onChange={e => setInputData({ ...inputData, name: e.target.value })} className='name-input' />
            </li>
            <li className='line-1'>
              <div className='dob-container'>
                <label htmlFor="dob">Ngày sinh:</label>
                <input type="date" name="dob" className='date-input'
                  onChange={e => setInputData({ ...inputData, dob: e.target.value })} />
              </div>
              <div className='gender-container'>
                <div className='male'>
                  <label htmlFor="gender">Nam:</label>
                  <input type="radio" name="gender" value={'nam'} checked className='gender-input'
                    onChange={e => setInputData({ ...inputData, gender: e.target.value })} />
                </div>
                <div className='female'>
                  <label htmlFor="gender">Nữ:</label>
                  <input type="radio" name="gender" value={'nữ'} className='gender-input'
                    onChange={e => setInputData({ ...inputData, gender: e.target.value })} />
                </div>
              </div>
            </li>
            <li>
              <label htmlFor="phoneNo">Điện thoại di động:</label>
              <input type="tel" name="phoneNo" className='phone-input'
                onChange={e => setInputData({ ...inputData, phoneNo: e.target.value })} />
            </li>
            <li>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" className='email-input'
                onChange={e => setInputData({ ...inputData, email: e.target.value })} />
            </li>
            <li className='line-2'>
              <div className='nationality-container'>
                <label htmlFor="nationality">Quốc tịch:</label>
                <input type="text" name="nationality"
                  onChange={e => setInputData({ ...inputData, nationality: e.target.value })} />
              </div>
              <div className='nation-container'>
                <label htmlFor="nation">Dân tộc:</label>
                <input type="text" name="nation"
                  onChange={e => setInputData({ ...inputData, nation: e.target.value })} />
              </div>
            </li>
            <li>
              <label htmlFor="residenceAddress">Nơi đăng ký hộ khẩu thường trú:</label>
              <input type="text" name="residenceAddress" className='residence-input'
                onChange={e => setInputData({ ...inputData, residenceAddress: e.target.value })} />
            </li>
            <li>
              <label htmlFor="tempoAddress">Nơi cư trú:</label>
              <input type="text" name="tempoAddress" className='tempo-input'
                onChange={e => setInputData({ ...inputData, tempoAddress: e.target.value })} />
            </li>
            <li>
              <label htmlFor="cccdCardNo">Số CMND/CCCD:</label>
              <input type="text" name="cccdNo" className='cccd-input'
                onChange={e => setInputData({ ...inputData, cccdNo: e.target.value })} />
            </li>
            <li className='line-3'>
              <div className='providedCardDate'>
                <label htmlFor="providedCardDate">Cấp ngày:</label>
                <input type="date" name="providedCardDate" className='date-input'
                  onChange={e => setInputData({ ...inputData, providedCardDate: e.target.value })} />
              </div>
              <div className="providedCardLocation">
                <label htmlFor="providedCardLocation">Tại:</label>
                <input type="text" name="providedCardLocation"
                  onChange={e => setInputData({ ...inputData, providedCadLocation: e.target.value })} />
              </div>
            </li>
            <button type='submit' className='cont-button'>Tiếp tục</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VerificationForm
