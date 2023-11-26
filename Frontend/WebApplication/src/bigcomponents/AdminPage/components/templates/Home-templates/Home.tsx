import { useEffect, useState } from 'react';
import {
  BsPeopleFill,
  BsFillPersonCheckFill,
  BsFillPersonLinesFill,
} from 'react-icons/bs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

function Home() {
  const [userCounts, setUserCounts] = useState({
    admin: 0,
    staff: 0,
    mentor: 0,
    member: 0,
  });

  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://localhost:7066/api/Users';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Count users by roleId
        const counts = data.reduce((result: { admin: number; staff: number; mentor: number; member: number; }, user: { roleId: any; }) => {
          const roleId = user.roleId;
          if (roleId === 1) {
            result.admin++;
          } else if (roleId === 2) {
            result.staff++;
          } else if (roleId === 3) {
            result.mentor++;
          } else if (roleId === 4) {
            result.member++;
          }
          return result;
        }, { admin: 0, staff: 0, mentor: 0, member: 0 });

        setUserCounts(counts);
      })
      .catch((error) => {
        console.error('Error fetching data from the API:', error);
      });

    const apiUrl2 = 'https://localhost:7066/api/Course/list';
    fetch(apiUrl2)
      .then((response) => response.json())
      .then((courseData) => {
        const formattedData = courseData.map((course: { name: any; numberOfStudents: any; limitStudent: any; }) => ({
          name: course.name,
          numberOfStudents: course.numberOfStudents,
          limitStudent: course.limitStudent,
        }));
        setCourseData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching course data from the API:', error);
      });
  }, []);

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>Bảng điều khiển</h3>
      </div>
      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Học viên</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{userCounts.member}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Giáo viên</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{userCounts.mentor}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Nhân viên</h3>
            <BsFillPersonCheckFill className='card_icon' />
          </div>
          <h1>{userCounts.staff}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Quản trị viên</h3>
            <BsFillPersonLinesFill className='card_icon' />
          </div>
          <h1>{userCounts.admin}</h1>
        </div>
      </div>
      <div className='chart-title'>
        <h3>Bảng thống kê khóa học theo tháng</h3>
      </div>
      <div className='charts'>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart
            width={500}
            height={300}
            data={courseData}
            margin={{
              top: 5,
              right: 50,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Legend />
            <Bar dataKey='numberOfStudents' name='Số học viên' fill='#8884d8' />
            <Bar dataKey='limitStudent' name='Số học viên tối đa' fill='#82ca9d' />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            width={500}
            height={300}
            data={courseData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='numberOfStudents' name='Số học viên' stroke='#8884d8' activeDot={{ r: 8 }} />
            <Line type='monotone' dataKey='limitStudent' name='Số học viên tối đa' stroke='#82ca9d' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
