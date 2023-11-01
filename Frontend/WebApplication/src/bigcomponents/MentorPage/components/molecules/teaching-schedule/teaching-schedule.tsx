import './teaching-schedule.scss';

function TeachingSchedule() {
    return (
        <div className="teaching-schedule-container">
            <div>
                <h1>Lịch dạy</h1>
            </div>
            <div className="teaching-schedule">
                <form action="">
                    <table className="schedule-table">
                        <thead className="schedule-header-container">
                            <tr>
                                <th rowSpan={2} className='mini-title'>
                                    <span className="mini-title">
                                        <strong>Năm</strong>
                                    </span>
                                    <select>
                                        <option selected={true} value="2023">
                                            2023
                                        </option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                    </select>
                                    <br />
                                    <span className="mini-title">
                                        <strong>Tuần</strong>
                                    </span>
                                    <br />
                                    <select>
                                        <option value="1">02/01 To 07/01</option>
                                        <option value="2">09/01 To 14/01</option>
                                        <option value="3">16/01 To 21/01</option>
                                        <option value="4">23/01 To 28/01</option>
                                        <option value="5">30/01 To 04/02</option>
                                        <option value="6">06/02 To 11/02</option>
                                        <option value="7">13/02 To 18/02</option>
                                        <option value="8">20/02 To 25/02</option>
                                        <option value="9">27/02 To 04/03</option>
                                        <option value="10">06/03 To 11/03</option>
                                        <option value="11">13/03 To 18/03</option>
                                        <option value="12">20/03 To 27/03</option>
                                        <option value="13">27/03 To 03/04</option>
                                        <option value="14">03/04 To 08/04</option>
                                        <option value="15">10/04 To 15/04</option>
                                        <option value="16">17/04 To 22/04</option>
                                        <option value="17">24/04 To 29/04</option>
                                        <option value="18">01/05 To 06/05</option>
                                        <option value="19">08/05 To 13/05</option>
                                        <option value="20">15/05 To 20/05</option>
                                        <option value="21">22/05 To 27/05</option>
                                        <option value="22">29/05 To 03/06</option>
                                        <option value="23">05/06 To 10/06</option>
                                        <option value="24">12/06 To 17/06</option>
                                        <option value="25">19/06 To 24/06</option>
                                        <option value="26">26/06 To 01/07</option>
                                        <option value="27">03/07 To 08/07</option>
                                        <option value="28">10/07 To 15/07</option>
                                        <option value="29">17/07 To 22/07</option>
                                        <option value="30">24/07 To 29/07</option>
                                        <option value="31">31/07 To 06/08</option>
                                        <option value="32">07/08 To 13/08</option>
                                        <option value="33">14/08 To 20/08</option>
                                        <option value="34">21/08 To 27/08</option>
                                        <option value="35">28/08 To 03/09</option>
                                        <option value="36">04/09 To 10/09</option>
                                        <option value="37">11/09 To 17/09</option>
                                        <option value="38">18/09 To 24/09</option>
                                        <option value="39">25/09 To 01/10</option>
                                        <option value="40">02/10 To 08/10</option>
                                        <option value="41">09/10 To 15/10</option>
                                        <option value="42">16/10 To 22/10</option>
                                        <option selected={true} value="43">23/10 To 28/10</option>
                                        <option value="44">30/10 To 05/11</option>
                                        <option value="45">06/11 To 12/11</option>
                                        <option value="46">13/11 To 19/11</option>
                                        <option value="47">20/11 To 26/11</option>
                                        <option value="48">27/11 To 03/12</option>
                                        <option value="49">04/12 To 10/12</option>
                                        <option value="50">11/12 To 17/12</option>
                                        <option value="51">18/12 To 24/12</option>
                                        <option value="52">25/12 To 31/12</option>
                                    </select>
                                </th>
                                <th align="center">Thứ hai</th>
                                <th align="center">Thứ ba</th>
                                <th align="center">Thứ tư</th>
                                <th align="center">Thứ năm</th>
                                <th align="center">Thứ sáu</th>
                            </tr>
                            <tr>
                                <th align="center">23/10</th>
                                <th align="center">24/10</th>
                                <th align="center">25/10</th>
                                <th align="center">26/10</th>
                                <th align="center">27/10</th>
                            </tr>
                        </thead>
                        <tbody className='schedule-body-container'>
                            <tr>
                                <td>Ca sáng</td>
                                <td>
                                    <p>
                                        <a href="">Lý thuyết</a>
                                        <br />
                                        Buổi thứ 1
                                        <br />
                                        <a href="">Lớp: XXB2</a>
                                        <br />
                                        Trạng thái: Đã dạy
                                    </p>
                                </td>
                                <td>-</td>
                                <td>
                                    <p>
                                        <a href="">Thực hành</a>
                                        <br />
                                        Buổi thứ 2
                                        <br />
                                        <a href="">Lớp: XXB2</a>
                                        <br />
                                        Trạng thái: Đã dạy
                                    </p>
                                </td>
                                <td>-</td>
                                <td>
                                    <p>
                                        <a href="">Thực hành</a>
                                        <br />
                                        Buổi thứ 3
                                        <br />
                                        <a href="">Lớp: XXB2</a>
                                        <br />
                                        Trạng thái: Đã dạy
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>Ca chiều</td>
                                <td>-</td>
                                <td>
                                    <p>
                                        <a href="">Thực hành</a>
                                        <br />
                                        Buổi thứ 1
                                        <br />
                                        <a href="">Lớp: XXB2</a>
                                        <br />
                                        Trạng thái: Đã dạy
                                    </p>
                                </td>
                                <td>-</td>
                                <td>
                                    <p>
                                        <a href="">Lý thuyết</a>
                                        <br />
                                        Buổi thứ 2
                                        <br />
                                        <a href="">Lớp: XXB2</a>
                                        <br />
                                        Trạng thái: Đã dạy
                                    </p>
                                </td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div className="teaching-status">
                <h2>Trạng thái</h2>
                <h3>Đã dạy: NguyenVanAA đã dạy lớp học này</h3>
                <h3>Chưa dạy: NguyenVanAA chưa dạy lớp học này</h3>
            </div>
        </div>
    );
}

export default TeachingSchedule;
