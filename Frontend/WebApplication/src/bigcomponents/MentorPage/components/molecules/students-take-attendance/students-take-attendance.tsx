import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './students-take-attendance.scss';
import api from '../../../../../config/axios';

interface Student {
  classStudentId: string;
  lessonId: string;
  studentName: string;
  hours: number;
  kilometers: number;
  attendance: boolean;
}

function StudentsAttendances() {
  const [students, setStudents] = useState<Student[]>([]);
  const navigate = useNavigate();
  const { classId } = useParams();

  // Retrieve the date from session storage
  const storedDate = sessionStorage.getItem('selectedDate');
const selectedDate = storedDate ? new Date(storedDate) : new Date();

// Format the date in the expected format for your API (YYYY-MM-DD)
const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log('Fetching data for classId:', classId, 'date:', selectedDate);
      if (classId) {
        // Use the formatted date in the API call
        const response = await api.get(`/Lesson/attendance/${classId}/${formattedDate}`);
        setStudents(response.data);
        console.log('Data', response.data);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  fetchData();
}, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const attendanceData = students.map((student) => ({
        lessonId: student.lessonId,
        hours: student.hours,
        kilometers: student.kilometers,
        attendance: student.attendance,
      }));

      if (classId && formattedDate) {
        await api.patch(`/Lesson/attendance/${classId}/${formattedDate}`, attendanceData);
        console.log('Attendance data sent successfully');
      } else {
        console.error('ClassId or date is missing from session storage');
      }

      navigate('/lich-day');
    } catch (error) {
      console.error('Error sending attendance data:', error);
    }
  };

  const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
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
