import './App.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css';
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/home/home-page';
import 'bootstrap/dist/css/bootstrap.css'
import UserListPage from './components/pages/user-list/user-list';
import './components/general.scss'
import CourseManagementPage from './components/pages/course-management/course-management';
import MemberManagementPage from './components/pages/member-management/member-management';
import MentorMamagementPage from './components/pages/mentor-management/mentor-management';
import ReportPage from './components/pages/report/report';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage />} />
          <Route path='danh-sach-nguoi-dung' element={<UserListPage />} />
          <Route path='quan-ly-khoa-hoc' element={<CourseManagementPage />} />
          <Route path='quan-ly-hoc-vien' element={<MemberManagementPage />} />
          <Route path='quan-ly-giao-vien' element={<MentorMamagementPage />} />
          <Route path='bao-cao' element={<ReportPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
