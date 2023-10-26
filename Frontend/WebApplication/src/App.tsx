import './App.scss'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.css'
import './general.scss'

// Staff import
import './bigcomponents/StaffPage/components/templates/template.scss'
import StaffPage from './bigcomponents/StaffPage/components/pages/home/home-page'
import UserManagementPage from './bigcomponents/StaffPage/components/pages/user-management/user-management'
import CourseManagementPage from './bigcomponents/StaffPage/components/pages/course-management/course-management'
import MemberManagementPage from './bigcomponents/StaffPage/components/pages/member-management/member-management'
import MentorMamagementPage from './bigcomponents/StaffPage/components/pages/mentor-management/mentor-management'
import './bigcomponents/StaffPage/components/staff-general.scss'

// Guest import 
import GuestHomePage from './bigcomponents/GuestPage/components/pages/guest-home/guest-home'
import GuestCoursePage from './bigcomponents/GuestPage/components/pages/guest-course/guest-course'

// Member import 
import MemberHomePage from './bigcomponents/MemberPage/components/pages/member-home/member-home'
import MemberCoursePage from './bigcomponents/MemberPage/components/pages/member-course/member-course'
import CourseVerificationPage from './bigcomponents/MemberPage/components/pages/course-verification/course-verification'
import MemberInformationPage from './bigcomponents/MemberPage/components/pages/member-information/member-information'
import UpdateInformationPage from './bigcomponents/MemberPage/components/pages/update-information/update-information'
import MemberRegisteredCoursePage from './bigcomponents/MemberPage/components/pages/member-course-registerd/member-registered-course'
import MentorInformationPage from './bigcomponents/MemberPage/components/pages/mentor-information/mentor-information'
import TheorySchedulePage from './bigcomponents/MemberPage/components/pages/theory-schedule/theory-schedule'
import PracticeSchedulePage from './bigcomponents/MemberPage/components/pages/practice-schedule/practice-schedule'
import PracticeRegisterPage from './bigcomponents/MemberPage/components/pages/practice-register-page/practice-register'
import ExamDocumentPage from './bigcomponents/MemberPage/components/pages/exam-document/exam-document'
import ExamDocumentUpdatePage from './bigcomponents/MemberPage/components/pages/exam-document-update/exam-document-update'

// Authorization page
import LoginPage from './bigcomponents/AuthorizationPage/components/pages/LoginPage'
import RegistrationPage from './bigcomponents/AuthorizationPage/components/pages/RegistrationPage'

//Mentor page
import MentorHomePage from './bigcomponents/MentorPage/components/pages/mentor-home-page/mentor-home-page'



function App() {

  const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;

  //reset to top when page refreshed
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
  }, [])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        className='toast-content'
        transition={Bounce} />

      {
        <Routes>
          <Route path='/'>
            {
              user === null ? (
                console.log(user),
                <>
                  <Route index element={<GuestHomePage />} />
                  <Route path='dang-nhap' element={<LoginPage />} />
                  <Route path='dang-ky' element={<RegistrationPage />} />
                  <Route path='khoahoc/:month' element={<GuestCoursePage />} />
                </>
              ) : (
                <>
                  <Route path='dang-nhap' element={<LoginPage />} />
                  {user.roleId === 1 && (
                    <Route index element={<MemberHomePage />} />
                  )}
                  {user.roleId === 2 && (
                    <>
                      <Route index element={<StaffPage />} />
                      <Route path='quan-ly-nguoi-dung' element={<UserManagementPage />} />
                      <Route path='quan-ly-khoa-hoc' element={<CourseManagementPage />} />
                      <Route path='quan-ly-hoc-vien' element={<MemberManagementPage />} />
                      <Route path='quan-ly-giao-vien' element={<MentorMamagementPage />} />
                    </>
                  )}
                  {user.roleId === 3 && (
                    <Route index element={<MentorHomePage />} />
                    //temp page
                  )}
                  {user.roleId === 4 && (
                    <>
                      <Route index element={<MemberHomePage />} />
                      <Route path='khoahoc/:month' element={<MemberCoursePage />} />
                      <Route path='khoahoc/xac-nhan-khoa-hoc' element={<CourseVerificationPage />} />
                      <Route path='thong-tin-ca-nhan/:username' element={<MemberInformationPage />} />
                      <Route path='thong-tin-ca-nhan/cap-nhat' element={<UpdateInformationPage />} />
                      <Route path='/khoa-hoc-cua-ban'>
                        <Route index element={<MemberRegisteredCoursePage />} />
                        <Route path='thong-tin-giao-vien' element={<MentorInformationPage />} />
                        <Route path='lich-hoc-ly-thuyet' element={<TheorySchedulePage />} />
                        <Route path='lich-hoc-thuc-hanh' element={<PracticeSchedulePage />} />
                      </Route>
                      <Route path='danh-sach-khoa-hoc'>
                        <Route index element={<PracticeRegisterPage />} />
                        <Route path='khoa-hoc/:{courseId}' />
                      </Route>
                      <Route path='ho-so-thi'>
                        <Route index element={<ExamDocumentPage />} />
                        <Route path='cap-nhat' element={<ExamDocumentUpdatePage />} />
                      </Route>
                    </>
                  )}
                </>
              )
            }
          </Route>
        </Routes >

      }

    </>
  )
}

export default App
