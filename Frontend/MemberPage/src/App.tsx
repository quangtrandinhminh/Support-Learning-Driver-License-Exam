import './App.scss';
import { Routes, Route } from 'react-router-dom'
import MemberHomePage from './components/pages/member-home/member-home';
import MemberCoursePage from './components/pages/member-course/member-course';
import CourseVerification from './components/pages/course-verification/course-verification';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<MemberHomePage />} />
        <Route path='/khoahoc' element={<MemberCoursePage />} />
        <Route path='/khoahoc/xac-nhan-khoa-hoc' element={<CourseVerification />} />
      </Routes>
    </div>
  )
}

export default App