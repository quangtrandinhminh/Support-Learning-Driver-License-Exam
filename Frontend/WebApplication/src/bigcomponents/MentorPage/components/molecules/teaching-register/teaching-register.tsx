import { Component } from 'react';
import './teaching-register.scss';
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
    const dataToSend = {
      checkboxes: this.state.checkboxes,
    };

    // Make an API request to the server
    fetch('your-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from the server:', data);
        // Handle the response data here
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors here
      });
  };
  
  render() {
    return (<>
      <div className="title">
        <h1>Đăng kí lịch dạy</h1>
      </div>
      <div className="register-form-container">
        <div className="register-table-container">
          <form action="" id='teaching-register-form'>
            <table>
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
                        }}
                        onClick={() => this.handleCheckboxChange(`sang-${day}`)}
                      >
                        <div className="custom-checkbox-inner">
                          {this.state.checkboxes[`sang-${day}`] && (
                            <span className="checkmark">Đã đăng kí</span>
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
                        }}
                        onClick={() => this.handleCheckboxChange(`chieu-${day}`)}
                      >
                        <div className="custom-checkbox-inner">
                          {this.state.checkboxes[`chieu-${day}`] && (
                            <span className="checkmark">Đã đăng kí</span>
                          )}
                        </div>
                      </td>
                    )
                  )}
                </tr>
              </tbody>
            </table>
          </form>
          <button onClick={this.handleSubmit}>Đặt lịch</button>
        </div>
      </div>
    </>
    );
  }
}

export default MentorTeachingRegister;
