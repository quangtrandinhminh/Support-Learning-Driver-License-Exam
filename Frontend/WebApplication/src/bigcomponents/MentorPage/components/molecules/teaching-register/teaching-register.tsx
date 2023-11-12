import { Component } from 'react';
import './teaching-register.scss';
import api from '../../../../../config/axios';

interface CheckboxTableState {
  checkboxes: {
    [key: string]: boolean;
  };
}
class MentorTeachingRegister extends Component<{}, CheckboxTableState> {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: {
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
      },
    };
  }

  handleCheckboxChange = (key) => {
    this.setState((prevState) => ({
      checkboxes: {
        ...prevState.checkboxes,
        [key]: !prevState.checkboxes[key],
      },
    }));
  };
  state = {
    checkboxes: {},
  };

  handleSubmit = () => {
    // Prepare data to send to the server
    const selectedDays = Object.keys(this.state.checkboxes).filter(
      (key) => this.state.checkboxes[key]
    );
    const dataToSend = {
      registeredDays: selectedDays,
    };

    // Make an API request to the server
    fetch('https://localhost:7066/swagger/index.html/api/Class/addClassPracticeByMentor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may need to include additional headers based on your API requirements
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        // Check if the response status is OK (status code 2xx)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if the response has a Content-Type of application/json
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error('Response is not in JSON format');
        }
      })
      .then((data) => {
        // Handle the response data here
        console.log('Response from the server:', data);

        // Example: Display a success message to the user
        alert('Lịch đã được đặt thành công!');

        // You can also update the UI or perform other actions based on the response data
        // For example, if your response contains additional information, you can use it as needed.
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors here
      });
  };



  render() {
    return (<>
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
                        className={`custom-checkbox ${this.state.checkboxes[`sang-${day}`] ? "checked" : ""
                          }`}
                        style={{
                          backgroundColor: this.state.checkboxes[`sang-${day}`]
                            ? 'green'
                            : 'white',
                            border: this.state.checkboxes[`chieu-${day}`] 
                            ? '1px solid #ffffff' : '1px solid #ffffff'
                        }}
                        onClick={() => this.handleCheckboxChange(`sang-${day}`)}
                      >
                        <div className="custom-checkbox-inner">
                          {this.state.checkboxes[`sang-${day}`] && (
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
                        className={`custom-checkbox ${this.state.checkboxes[`chieu-${day}`] ? "checked" : ""
                          }`}
                        style={{
                          backgroundColor: this.state.checkboxes[`chieu-${day}`]
                            ? 'green'
                            : 'white',
                            border: this.state.checkboxes[`chieu-${day}`] 
                            ? '1px solid #ffffff' : '1px solid #ffffff'
                        }}
                        onClick={() => this.handleCheckboxChange(`chieu-${day}`)}
                      >
                        <div className="custom-checkbox-inner">
                          {this.state.checkboxes[`chieu-${day}`] && (
                            <span className="checkmark">Đăng kí</span>
                          )}
                        </div>
                      </td>
                    )
                  )}
                </tr>
              </tbody>
            </table>
            <button onClick={this.handleSubmit} className='submit-button' type='submit' form="teaching-register-form">
            Xác nhận
          </button>
          </form>
        </div>
      </div>
    </>
    );
  }
}

export default MentorTeachingRegister;
