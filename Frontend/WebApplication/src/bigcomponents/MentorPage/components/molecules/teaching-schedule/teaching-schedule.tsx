import './teaching-schedule.scss'

function TeachingSchedule() {
    return (
        <div className="teaching-schedule-container">
            <div className="schedule">
                <thead>
                    <tr>
                        <th rowSpan={2}>
                            <span className="year-title">
                                <strong>Năm</strong>
                            </span>
                            <select name="ctl00$mainContent$drpYear" id="ctl00_mainContent_drpYear">
                                <option selected={true} value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                            <br />
                            Tuần
                            <select name="ctl00$mainContent$drpSelectWeek" id="ctl00_mainContent_drpSelectWeek">
                                <option value="1">02/01 To 08/01</option>
                                <option value="2">09/01 To 15/01</option>
                                <option value="3">16/01 To 22/01</option>
                                <option value="4">23/01 To 29/01</option>
                                <option value="5">30/01 To 05/02</option>
                                <option value="6">06/02 To 12/02</option>
                                <option value="7">13/02 To 19/02</option>
                                <option value="8">20/02 To 26/02</option>
                                <option value="9">27/02 To 05/03</option>
                                <option value="10">06/03 To 12/03</option>
                                <option value="11">13/03 To 19/03</option>
                                <option value="12">20/03 To 26/03</option>
                                <option value="13">27/03 To 02/04</option>
                                <option value="14">03/04 To 09/04</option>
                                <option value="15">10/04 To 16/04</option>
                                <option value="16">17/04 To 23/04</option>
                                <option value="17">24/04 To 30/04</option>
                                <option value="18">01/05 To 07/05</option>
                                <option value="19">08/05 To 14/05</option>
                                <option value="20">15/05 To 21/05</option>
                                <option value="21">22/05 To 28/05</option>
                                <option value="22">29/05 To 04/06</option>
                                <option value="23">05/06 To 11/06</option>
                                <option value="24">12/06 To 18/06</option>
                                <option value="25">19/06 To 25/06</option>
                                <option value="26">26/06 To 02/07</option>
                                <option value="27">03/07 To 09/07</option>
                                <option value="28">10/07 To 16/07</option>
                                <option value="29">17/07 To 23/07</option>
                                <option value="30">24/07 To 30/07</option>
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
                                <option selected={true} value="43">23/10 To 29/10</option>
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
                    </tr>
                </thead>
            </div>
        </div>
    )
}

export default TeachingSchedule