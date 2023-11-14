import React, { useState } from 'react';
import './teaching-register.scss';
import api from '../../../../../config/axios';
import { useParams } from 'react-router-dom';

interface CheckboxTableState {
  checkboxes: {
    [key: string]: boolean;
  };
}

const MentorTeachingRegister: React.FC = () => {
  const { courseId } = useParams();
  const [checkboxes, setCheckboxes] = useState<CheckboxTableState['checkboxes']>({
    "sang-2": false,
    "sang-3": false,
    "sang-4": false,
    "sang-5": false,
    "sang-6": false,
    "chieu-2": false,
    "chieu-3": false,
    "chieu-4": false,
    "chieu-5": false,
    "chieu-6": false,
  });

  const handleCheckboxChange = (key: string) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [key]: !prevCheckboxes[key],
    }));
  };

  const getDayOfWeekNumber = (dayOfWeek: string) => {
    const daysOfWeek = ["2", "3", "4", "5", "6"];
    return daysOfWeek.indexOf(dayOfWeek.toLowerCase()) + 2; // Monday starts from 2
  };

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleSubmit = async () => {
    // Prepare data to send to the server
    const selectedDays = Object.keys(checkboxes).filter(
      (key) => checkboxes[key]
    );

    const listObjects = selectedDays.map((selectedDay) => {
      const [shift, dayOfWeek] = selectedDay.split('-');
      return {
        mentorId: 1, // Replace with the actual mentor ID
        courseId: courseId, // Replace with the actual course ID
        dayOfWeek: getDayOfWeekNumber(dayOfWeek), // Convert day of the week to number
        shift: capitalizeFirstLetter(shift), // Capitalize the first letter of the shift
        status: true, // You can set the status based on your requirements
      };
    });

    // Convert listObjects to the desired format
    const formattedListObjects = listObjects.map(({ mentorId, courseId, dayOfWeek, shift, status }) => ({
      mentorId,
      courseId,
      dayOfWeek,
      shift,
      status,
    }));

    // Log the formattedListObjects to the console
    console.log('Formatted List of Objects:', formattedListObjects);

    try {
      // Make an API request to the server using Axios
      const response = await api.post(
        'Class/addClassPracticeByMentor',
        formattedListObjects,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(formattedListObjects)

      // Check if the response status is OK (status code 2xx)
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle the response data here
      console.log('Response from the server:', response.data);

      // Example: Display a success message to the user
      alert('Lịch đã được đặt thành công!');
      window.history.back();
      // You can also update the UI or perform other actions based on the response data
      // For example, if your response contains additional information, you can use it as needed.
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here
    }
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
                  {[2, 3, 4, 5, 6].map(
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
                  {[2, 3, 4, 5, 6].map(
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
            <button onClick={handleSubmit} className='submit-button' type='button'>
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MentorTeachingRegister;
