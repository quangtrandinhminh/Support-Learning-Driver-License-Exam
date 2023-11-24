import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './students-take-attendance.scss';
import api from '../../../../../config/axios';

function StudentsAttendances() {
  const [students, setStudents] = useState([]);
  const [classId, setClassId] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (classId && date) {
          // Use classId and date in the API endpoint
          const response = await api.get(`/Lesson/attendance/${classId}/${date}`);
          setStudents(response.data);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, [classId, date]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const attendanceData = students.map((student) => ({
        lessonId: student.lessonId,
        hours: student.hours,
        kilometers: student.kilometers,
        attendance: student.attendance,
      }));

      // Use classId and date in the API endpoint
      await api.patch(`/Lesson/attendance/${classId}/${date}`, attendanceData);
      console.log('Attendance data sent successfully');

      navigate('/lich-day');
    } catch (error) {
      console.error('Error sending attendance data:', error);
    }
  };

  const handleAttendanceChange = (studentId, isPresent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.classStudentId === studentId ? { ...student, attendance: isPresent } : student
      )
    );
  };

  return (
    <>
      <div className="student-attendance-title-container">
        <h1>Danh sách học viên lớp {classId}</h1>
      </div>
      <div className="students-attendance-container">
        <form onSubmit={handleSubmit} id="take-attendance-form">
          <table className="attendance-table">
            <thead className='attendance-table-header'>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Điểm danh</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody className='attendance-table-body'>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.studentName}</td>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name={`attendance-${index}`}
                        value="absent"
                        checked={!student.attendance}
                        onChange={() => handleAttendanceChange(student.classStudentId, false)}
                      />
                      Vắng mặt
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`attendance-${index}`}
                        value="present"
                        checked={student.attendance}
                        onChange={() => handleAttendanceChange(student.classStudentId, true)}
                      />
                      Có mặt
                    </label>
                  </td>
                  <td>Không có</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="submit-button" type="submit" form="take-attendance-form">
            Xác nhận
          </button>
        </form>
      </div>
    </>
  );
}

export default StudentsAttendances;
