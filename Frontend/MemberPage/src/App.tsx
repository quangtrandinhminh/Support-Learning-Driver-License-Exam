import './App.scss';
import { Routes, Route } from 'react-router-dom'
import MemberHomePage from './components/pages/member-home/member-home';
import MemberCoursePage from './components/pages/member-course/member-course';
import CourseVerification from './components/pages/course-verification/course-verification';
import MemberRegisteredCourse from './components/pages/member-course-registerd/member-registered-course';
import MemberInformation from './components/pages/member-information/member-information';
import UpdateInformationPage from './components/pages/update-information/update-information';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<MemberHomePage />} />
        <Route path='/khoahoc' element={<MemberCoursePage />} />
        <Route path='/khoahoc/xac-nhan-khoa-hoc' element={<CourseVerification />} />
        <Route path='/khoa-hoc-cua-ban' element={<MemberRegisteredCourse />} />
        <Route path="/thong-tin-ca-nhan" element={<MemberInformation />} />
        <Route path='/thong-tin-ca-nhan/cap-nhat' element={<UpdateInformationPage />} />
      </Routes>
    </div>
  )
}

export default App