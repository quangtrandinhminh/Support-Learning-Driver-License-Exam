import { useEffect, useState } from 'react'
import './verification-form.scss'
// import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import api from '../../../../../config/axios';

function VerificationForm() {
  const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
  const userId = user.userID;
  const [member, setMember] = useState();
  const { courseName } = useParams();
  const courseID = localStorage.getItem('courseID') ? JSON.parse(localStorage.getItem('courseID')) : null;
  const [error, setError] = useState('');

  const [inputData, setInputData] = useState({
    dob: '',
    gender: '',
    nationality: '',
    nation: '',
    temporaryAddress: '',
    residenceAddress: '',
    identityCardNumber: '',
    cardProvidedDate: '',
    cardProvidedLocation: '',
    isPaid: false,
    courseId: courseID,
    userId: userId,
    fullName: '',
    phone: '',
    email: '',
  });

  const navigate = useNavigate();
  const requiredFields = ['fullName', 'dob', 'phone', 'email', 'nationality', 'temporaryAddress', 'residenceAddress', 'identityCardNumber', 'cardProvidedDate', 'cardProvidedLocation', 'nation'];
  const namePattern = /^[\p{L} ]{5,32}$/u,
    nationalityPattern = /^[\p{L} ]{2,32}$/u,
    nation = /^[\p{L} ]{2,32}$/u;
  const phonePattern = /^0\d{9}$/,
    cccdPattern = /^0\d{11}$/;

  //function 
  const createMember = async () => {
  setError('');
    try {
      const dobDate = new Date(inputData.dob);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - dobDate.getFullYear();
      const missingFields = requiredFields.filter(field => !inputData[field]);

      if (missingFields.length > 0) {
        setError(`Vui lòng điền đầy đủ thông tin!`);
        return;
      }

      if (!namePattern.test(inputData.fullName)) {
        setError("Họ và tên không hợp lệ!");
        return;
      } else if (age < 18) {
        setError("Bạn chưa đủ 18 tuổi!");
        return;
      } else if (!phonePattern.test(inputData.phone)) {
        setError("Số điện thoại không hợp lệ!");
        return;
      } else if (!nationalityPattern.test(inputData.nationality)) {
        setError("Quốc tịch không hợp lệ!");
        return;
      } else if (!nation.test(inputData.nation)) {
        setError("Dân tộc không hợp lệ!");
        return;
      } else if (inputData.residenceAddress === '' || inputData.residenceAddress === null) {
        setError("Địa chỉ không hợp lệ!");
        return;
      } else if (!cccdPattern.test(inputData.identityCardNumber)) {
        setError("Số CMND/CCCD không hợp lệ!");
        return;
      } else if (inputData.cardProvidedLocation === '' || inputData.cardProvidedLocation === null) {
        setError("Địa chỉ cung cấp CMND/CCCD không hợp lệ!");
        return;
      }

      const response = await api.post('/Member/add', inputData);
      setMember(response.data);
      sessionStorage.setItem('loginedMember', JSON.stringify(response.data));
      toast.success(`Bạn đã đăng ký khoá học ${courseName} thành công`);
      localStorage.removeItem('courseID');
      // navigate('/khoa-hoc-cua-ban');
      window.scroll({
        top: 0,
        behavior: 'instant'
      });

    } catch (error) {
      console.log(error.response);
      setError(error.response.data.error);
    }
  }

  //form event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.scroll({
      top: 0,
      behavior: 'instant'
    });
    createMember();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/Member?userID=${userId}`);
        console.log(response.data);
        sessionStorage.setItem('loginedMember', JSON.stringify(response.data));
      } catch (error) {
        // Handle any errors that occur during the API request
      }
    }
    fetchData();
  }, [member, userId]);

  //useEffect
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'instant'
    });
  }, [])

  useEffect(() => {
    if (user) {
      setInputData(prevInputData => ({
        ...prevInputData,
        fullName: user.fullName,
        phone: user.phone,
        email: user.email
      }))
    }
  }, [])

  return (
    <>
      {
        error != null ? (
          <div className='verification-form-container'>
            <h3 className='form-title'>Các thông tin sau được dùng để hoàn tất hồ sơ thi. Học viên vui lòng điền đầy đủ và chính xác!</h3>
            <h4>{error}</h4>
            <div className="form-container">
              <div className="form-content">
                <form className='verification-form' onSubmit={handleSubmit}>
                  <li>
                    <label htmlFor="name">Họ và tên:</label>
                    <input type="text" name='name' id=''
                      value={inputData.fullName}
                      onChange={e => setInputData({ ...inputData, fullName: e.target.value })} className='name-input'
                    />
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
                        <input
                          type="radio"
                          name="gender"
                          value={'nam'}
                          checked={inputData.gender === 'nam'}
                          onChange={() => setInputData(prevData => ({ ...prevData, gender: 'nam' }))}
                        />
                      </div>
                      <div className='female'>
                        <label htmlFor="gender">Nữ:</label>
                        <input
                          type="radio"
                          name="gender"
                          value={'nữ'}
                          checked={inputData.gender === 'nữ'}
                          onChange={() => setInputData(prevData => ({ ...prevData, gender: 'nữ' }))}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <label htmlFor="phone">Điện thoại di động:</label>
                    <input type="tel" name="phone" className='phone-input'
                      value={inputData.phone}
                      onChange={e => setInputData({ ...inputData, phone: e.target.value })} />
                  </li>
                  <li>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" className='email-input'
                      value={inputData.email}
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
                      onChange={e => setInputData({ ...inputData, temporaryAddress: e.target.value })} />
                  </li>
                  <li>
                    <label htmlFor="cccdCardNo">Số CMND/CCCD:</label>
                    <input type="text" name="cccdNo" className='cccd-input'
                      onChange={e => setInputData({ ...inputData, identityCardNumber: e.target.value })} />
                  </li>
                  <li className='line-3'>
                    <div className='providedCardDate'>
                      <label htmlFor="providedCardDate">Cấp ngày:</label>
                      <input type="date" name="providedCardDate" className='date-input'
                        onChange={e => setInputData({ ...inputData, cardProvidedDate: e.target.value })} />
                    </div>
                    <div className="providedCardLocation">
                      <label htmlFor="providedCardLocation">Tại:</label>
                      <input type="text" name="providedCardLocation"
                        onChange={e => setInputData({ ...inputData, cardProvidedLocation: e.target.value })} />
                    </div>
                  </li>
                  <button type='submit' className='cont-button'>Tiếp tục</button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className='verification-form-container'>
            <h3 className='form-title'>Các thông tin sau được dùng để hoàn tất hồ sơ thi. Học viên vui lòng điền đầy đủ và chính xác!</h3>
            <div className="form-container">
              <div className="form-content">
                <form className='verification-form' onSubmit={handleSubmit}>
                  <li>
                    <label htmlFor="name">Họ và tên:</label>
                    <input type="text" name='name' id=''
                      onChange={e => setInputData({ ...inputData, fullName: e.target.value })} className='name-input' />
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
                    <label htmlFor="phone">Điện thoại di động:</label>
                    <input type="tel" name="phone" className='phone-input'
                      onChange={e => setInputData({ ...inputData, phone: e.target.value })} />
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
                      onChange={e => setInputData({ ...inputData, temporaryAddress: e.target.value })} />
                  </li>
                  <li>
                    <label htmlFor="cccdCardNo">Số CMND/CCCD:</label>
                    <input type="text" name="cccdNo" className='cccd-input'
                      onChange={e => setInputData({ ...inputData, identityCardNumber: e.target.value })} />
                  </li>
                  <li className='line-3'>
                    <div className='providedCardDate'>
                      <label htmlFor="providedCardDate">Cấp ngày:</label>
                      <input type="date" name="providedCardDate" className='date-input'
                        onChange={e => setInputData({ ...inputData, cardProvidedDate: e.target.value })} />
                    </div>
                    <div className="providedCardLocation">
                      <label htmlFor="providedCardLocation">Tại:</label>
                      <input type="text" name="providedCardLocation"
                        onChange={e => setInputData({ ...inputData, cardProvidedLocation: e.target.value })} />
                    </div>
                  </li>
                  <button type='submit' className='cont-button'>Tiếp tục</button>
                </form>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default VerificationForm
