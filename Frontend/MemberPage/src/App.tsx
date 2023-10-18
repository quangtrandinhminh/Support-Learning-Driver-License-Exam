import './App.scss';
import { Routes, Route } from 'react-router-dom'
import MemberHomePage from './components/pages/member-home/member-home';
import MemberCoursePage from './components/pages/member-course/member-course';
import UpdateInformationPage from './components/pages/update-information/update-information';
import TheorySchedulePage from './components/pages/theory-schedule/theory-schedule';
import MemberInformationPage from './components/pages/member-information/member-information';
import CourseVerificationPage from './components/pages/course-verification/course-verification';
import MemberRegisteredCoursePage from './components/pages/member-course-registerd/member-registered-course';
import PracticeSchedulePage from './components/pages/practice-schedule/practice-schedule';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<MemberHomePage />} />
        <Route path='/khoahoc' element={<MemberCoursePage />} />
        <Route path='/khoahoc/xac-nhan-khoa-hoc' element={<CourseVerificationPage />} />
        <Route path='/khoa-hoc-cua-ban' element={<MemberRegisteredCoursePage />} />
        <Route path="/thong-tin-ca-nhan" element={<MemberInformationPage />} />
        <Route path='/thong-tin-ca-nhan/cap-nhat' element={<UpdateInformationPage />} />
        <Route path='/lich-hoc/lich-hoc-ly-thuyet' element={<TheorySchedulePage />} />
        <Route path='/lich-hoc/lich-hoc-thuc-hanh' element={<PracticeSchedulePage />} />
      </Routes>
    </div>
  )
}

export default App