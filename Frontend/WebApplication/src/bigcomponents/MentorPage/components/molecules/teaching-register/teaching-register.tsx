import React, { useState } from 'react';
import './teaching-register.scss';
import api from '../../../../../config/axios';

const MentorTeachingRegister = () => {
  const [checkboxes, setCheckboxes] = useState({
    "sang-monday": false,
    "sang-tuesday": false,
    "sang-wednesday": false,
    "sang-thursday": false,
    "sang-friday": false,
    "chieu-monday": false,
    "chieu-tuesday": false,
    "chieu-wednesday": false,
    "chieu-thursday": false,
    "chieu-friday": false,
  });

  const handleCheckboxChange = (key) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [key]: !prevCheckboxes[key],
    }));
  };

  const handleSubmit = () => {
    const selectedDays = Object.keys(checkboxes).filter(
      (key) => checkboxes[key]
    );
    const dataToSend = {
      registeredDays: selectedDays,
    };
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Response is not in JSON format');
        }
      })
      .then((data) => {
        console.log('Response from the server:', data);
        alert('Lịch đã được đặt thành công!');
       })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className="title">
        <h1>Đăng kí lịch dạy thực hành khóa 230B2</h1>
      </div>
      <div className="register-form-container">
        <div className="register-table-container">
          <form action="" id='teaching-register-form'>
            <table className='register-table'>
              <thead className="register-header">
                <tr>
                  <th></th>
                  <th>Thứ hai</th>
                  <th>Thứ ba</th>
                  <th>Thứ tư</th>
                  <th>Thứ năm</th>
                  <th>Thứ sáu</th>
                </tr>
              </thead>
              <tbody className="register-body">
                <tr>
                  <td>Ca sáng</td>
                  {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
                    (day) => (
                      <td
                        key={`sang-${day}`}
                        align="center"
                        className={`custom-checkbox ${checkboxes[`sang-${day}`] ? "checked" : ""
                          }`}
                        style={{
                          backgroundColor: checkboxes[`sang-${day}`]
                            ? 'green'
                            : 'white',
                            border: checkboxes[`chieu-${day}`] 
                            ? '1px solid #ffffff' : '1px solid #ffffff'
                        }}
                        onClick={() => handleCheckboxChange(`sang-${day}`)}
                      >
                        <div className="custom-checkbox-inner">
                          {checkboxes[`sang-${day}`] && (
                            <span className="checkmark">Đăng kí</span>
                          )}
                        </div>
                      </td>
                    )
                  )}
                </tr>
                <tr>
                  <td>Ca chiều</td>
                  {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
                    (day) => (
                      <td
                        key={`chieu-${day}`}
                        align="center"
                        className={`custom-checkbox ${checkboxes[`chieu-${day}`] ? "checked" : ""
                          }`}
                        style={{
                          backgroundColor: checkboxes[`chieu-${day}`]
                            ? 'green'
                            : 'white',
                            border: checkboxes[`chieu-${day}`] 
                            ? '1px solid #ffffff' : '1px solid #ffffff'
                        }}
                        onClick={() => handleCheckboxChange(`chieu-${day}`)}
                      >
                        <div className="custom-checkbox-inner">
                          {checkboxes[`chieu-${day}`] && (
                            <span className="checkmark">Đăng kí</span>
                          )}
                        </div>
                      </td>
                    )
                  )}
                </tr>
              </tbody>
            </table>
            <button onClick={handleSubmit} className='submit-button' type='submit' form="teaching-register-form">
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MentorTeachingRegister;
