import React, { useEffect, useState } from 'react';
import './teaching-register.scss';
import api from '../../../../../config/axios';
import { useParams } from 'react-router-dom';

interface CheckboxTableState {
  checkboxes: {
    [key: string]: boolean;
  };
}

const MentorTeachingRegister: React.FC = () => {
  const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
  const [mentor, setMentor] = useState(null);
  const { courseId } = useParams();
  const [checkboxes, setCheckboxes] = useState<CheckboxTableState['checkboxes']>({
    "sáng-2": false,
    "sáng-3": false,
    "sáng-4": false,
    "sáng-5": false,
    "sáng-6": false,
    "chiều-2": false,
    "chiều-3": false,
    "chiều-4": false,
    "chiều-5": false,
    "chiều-6": false,
  });

  const [hoveredCheckbox, setHoveredCheckbox] = useState<string | null>(null);

  const handleCheckboxChange = (key: string) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [key]: !prevCheckboxes[key],
    }));
  };

  const getMentorByUID = async () => {
    try {
      const response = await api.get('Mentor/user/' + user.userID);
      setMentor(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleMouseEnter = (key: string) => {
    setHoveredCheckbox(key);
  };

  const handleMouseLeave = () => {
    setHoveredCheckbox(null);
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
      if (mentor) {
        return {
          mentorId: mentor.mentorId, // Replace with the actual mentor ID
          courseId: courseId, // Replace with the actual course ID
          dayOfWeek: getDayOfWeekNumber(dayOfWeek), // Convert day of the week to number
          shift: capitalizeFirstLetter(shift), // Capitalize the first letter of the shift
          status: true, // You can set the status based on your requirements
        };
      }
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

      // Check if the response status is OK (status code 2xx)
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        // Example: Display a success message to the user

        console.log(response.status);
        alert('Lịch đã được đặt thành công!');
        window.history.back();
      }

      // Handle the response data here
      console.log('Response from the server:', response.data);

      // For example, if your response contains additional information, you can use it as needed.
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here
    }
  };

  useEffect(() => {
    getMentorByUID();
  }, [])

  return (
    <>
      <div className="title">
        <h1>Đăng kí lịch dạy thực hành khóa {courseId}</h1>
      </div>
      <div className="register-form-container">
        <div className="register-table-container">
          <form action="" id='teaching-register-form'>
            <table className='register-table'>
              <thead className="register-header">
                <tr>
                  <th></th>
                  <th className='tw-text-center'>Thứ hai</th>
                  <th className='tw-text-center'>Thứ ba</th>
                  <th className='tw-text-center'>Thứ tư</th>
                  <th className='tw-text-center'>Thứ năm</th>
                  <th className='tw-text-center'>Thứ sáu</th>
                </tr>
              </thead>
              <tbody className="register-body">
                <tr>
                  <td>Ca sáng</td>
                  {[2, 3, 4, 5, 6].map(
                    (day) => (
                      <td
                        key={`sáng-${day}`}
                        align="center"
                        className={`custom-checkbox ${checkboxes[`sáng-${day}`] ? "checked" : ""}`}
                        style={{
                          backgroundColor: checkboxes[`sáng-${day}`] || hoveredCheckbox === `sáng-${day}`
                            ? "#cfcfcf"
                            : "white",
                          border: checkboxes[`sáng-${day}`]
                            ? "1px solid #ffffff"
                            : "1px solid #ffffff",
                          transition: checkboxes ? "all 0.18s linear" : "0s",
                          cursor: "pointer",
                          color: "white",
                        }}
                        onClick={() => handleCheckboxChange(`sáng-${day}`)}
                        onMouseEnter={() => handleMouseEnter(`sáng-${day}`)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="custom-checkbox-inner">
                          {checkboxes[`sáng-${day}`] && (
                            <span className="checkmark">✅</span>
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
                        key={`chiều-${day}`}
                        align="center"
                        className={`custom-checkbox ${checkboxes[`chiều-${day}`] ? "checked" : ""
                          }`}
                        style={{
                          backgroundColor: checkboxes[`chiều-${day}`] || hoveredCheckbox === `chiều-${day}`
                            ? '#cfcfcf'
                            : 'white',
                          border: checkboxes[`chiều-${day}`]
                            ? '1px solid #ffffff' : '1px solid #ffffff',
                          transition: checkboxes ? 'all 0.18s linear' : '0s',
                          cursor: 'pointer',
                          color: 'white',
                        }}
                        onClick={() => handleCheckboxChange(`chiều-${day}`)}
                        onMouseEnter={() => handleMouseEnter(`chiều-${day}`)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="custom-checkbox-inner">
                          {checkboxes[`chiều-${day}`] && (
                            <span className="checkmark">✅</span>
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