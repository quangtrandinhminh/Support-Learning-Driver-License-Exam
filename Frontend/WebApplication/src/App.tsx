import './App.scss'
import { Route, Routes } from 'react-router-dom'
import GuestHomePage from './bigcomponents/GuestPage/components/pages/guest-home/guest-home'
import GuestCoursePage from './bigcomponents/GuestPage/components/pages/guest-course/guest-course'
import LoginPage from './bigcomponents/AuthorizationPage/components/pages/LoginPage'
import { Bounce, Slide, ToastContainer } from 'react-toastify'
import MemberHomePage from './bigcomponents/MemberPage/components/pages/member-home/member-home'
import MemberCoursePage from './bigcomponents/MemberPage/components/pages/member-course/member-course'
import CourseVerificationPage from './bigcomponents/MemberPage/components/pages/course-verification/course-verification'
import MemberInformationPage from './bigcomponents/MemberPage/components/pages/member-information/member-information'
import UpdateInformationPage from './bigcomponents/MemberPage/components/pages/update-information/update-information'
import StaffPage from './bigcomponents/StaffPage/components/pages/home/home-page'
import './bigcomponents/StaffPage/components/staff-general.scss'
import UserListPage from './bigcomponents/StaffPage/components/pages/user-list/user-list'
import 'bootstrap/dist/css/bootstrap.css'
import './bigcomponents/general-template.scss'
import MemberRegisteredCoursePage from './bigcomponents/MemberPage/components/pages/member-course-registerd/member-registered-course'
import RegistrationPage from './bigcomponents/AuthorizationPage/components/pages/RegistrationPage'
import '../../StaffPage/src/components/templates/template.scss'
import 'react-toastify/ReactToastify.css'
import MentorInformationPage from './bigcomponents/MemberPage/components/pages/mentor-information/mentor-information'
import TheorySchedulePage from './bigcomponents/MemberPage/components/pages/theory-schedule/theory-schedule'
import PracticeSchedulePage from './bigcomponents/MemberPage/components/pages/practice-schedule/practice-schedule'
import PracticeRegisterPage from './bigcomponents/MemberPage/components/pages/practice-register-page/practice-register'
import PracticeList from './bigcomponents/MemberPage/components/molecules/practice-list-table/practice-list-table'
import PracticeSpecificPage from './bigcomponents/MemberPage/components/pages/practice-specific-page/practice-specific'
import ExamDocumentPage from './bigcomponents/MemberPage/components/pages/exam-document/exam-document'
import ExamDocumentUpdatePage from './bigcomponents/MemberPage/components/pages/exam-document-update/exam-document-update'

function App() {

  const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;

  //reset to top when page refreshed
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

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
                      <Route path='danh-sach-nguoi-dung' element={<UserListPage />} />
                    </>
                  )}
                  {user.roleId === 3 && (
                    <Route index element={<MemberHomePage />} />
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
