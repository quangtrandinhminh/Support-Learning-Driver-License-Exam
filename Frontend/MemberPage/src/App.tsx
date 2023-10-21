import './App.scss';
import { Routes, Route } from 'react-router-dom'
import MemberHomePage from './components/pages/member-home/member-home';
import MemberCoursePage from './components/pages/member-course/member-course';
import UpdateInformationPage from './components/pages/update-information/update-information';
import TheorySchedulePage from './components/pages/theory-schedule/theory-schedule';
import MemberInformationPage from './components/pages/member-information/member-information';
import CourseVerificationPage from './components/pages/course-verification/course-verification';
import MemberRegisteredCoursePage from './components/pages/member-course-registerd/member-registered-course';
import MentorInformationPage from './components/pages/mentor-information/mentor-information';
import PracticeSpecificPage from './components/pages/practice-specific-page/practice-specific';
import PracticeSchedulePage from './components/pages/practice-schedule/practice-schedule';
import PracticeRegisterPage from './components/pages/practice-register-page/practice-register';
import 'react-toastify/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <ToastContainer
        pauseOnHover={false}
        position='top-right'
        limit={3}
        autoClose={2000}
        className='toast-notify'
        transition={Bounce}
        newestOnTop />
      <Routes>
        <Route path='/' element={<MemberHomePage />} />
        <Route path='/khoahoc/xac-nhan-khoa-hoc' element={<CourseVerificationPage />} />
        <Route path="/thong-tin-ca-nhan" element={<MemberInformationPage />} />
        <Route path='/thong-tin-ca-nhan/cap-nhat' element={<UpdateInformationPage />} />
        <Route path='/khoahoc' element={<MemberCoursePage />} />
        <Route path='khoa-hoc-cua-ban'>
          <Route index element={<MemberRegisteredCoursePage />} />
          <Route path='lich-hoc-ly-thuyet' element={<TheorySchedulePage />} />
          <Route path='lich-hoc-thuc-hanh' element={<PracticeSchedulePage />} />
          <Route path='thong-tin-giao-vien' element={<MentorInformationPage />} />
        </Route>
        <Route path='danh-sach-khoa-hoc'>
          <Route index element={<PracticeRegisterPage />} />
          <Route path='khoa-hoc/:id-khoa-hoc' element={<PracticeSpecificPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App