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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for classId:', classId, 'date:', selectedDate);
        if (classId) {
          const response = await api.get(`/Lesson/attendance/${classId}/${selectedDate.toISOString()}`);
          setStudents(response.data);
          console.log('Data', response.data);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
  
    fetchData();
  }, [classId, selectedDate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const attendanceData = students.map((student) => ({
        lessonId: student.lessonId,
        hours: student.hours,
        kilometers: student.kilometers,
        attendance: student.attendance,
      }));

      // Use classId and date in the API endpoint
      await api.patch(`/Lesson/attendance/${classId}/${selectedDate.toISOString()}`, attendanceData);
      console.log('Attendance data sent successfully');

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
