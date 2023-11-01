import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import './general.scss'
import ScrollToTop from './config/scrollToTop'

// Staff import
import MentorMamagementPage from './bigcomponents/StaffPage/components/pages/mentor-management/mentor-management'
import './bigcomponents/StaffPage/components/templates/template.scss'
import UserManagementPage from './bigcomponents/StaffPage/components/pages/user-management/user-management'
import CourseManagementPage from './bigcomponents/StaffPage/components/pages/course-management/course-management'
import MemberManagementPage from './bigcomponents/StaffPage/components/pages/member-management/member-management'
import './bigcomponents/StaffPage/components/staff-general.scss'
import CreateCoursePage from './bigcomponents/StaffPage/components/pages/create-course/create-course'
import NewsManagementPage from './bigcomponents/StaffPage/components/pages/news-management/news-management'
import CreateNewsPage from './bigcomponents/StaffPage/components/pages/create-news/create-news'
import HomePage from './bigcomponents/StaffPage/components/pages/home/home-page'
import StaffLayout from './bigcomponents/StaffPage/components/layout'
import ReportPage from './bigcomponents/StaffPage/components/pages/report/report'
import UpdateCoursePage from './bigcomponents/StaffPage/components/pages/update-course/update-course'
import UpdateNewsPage from './bigcomponents/StaffPage/components/pages/update-news/update-news'

// Guest import 
import GuestHomePage from './bigcomponents/GuestPage/components/pages/guest-home/guest-home'
import GuestCoursePage from './bigcomponents/GuestPage/components/pages/guest-course/guest-course'

// Member import 
import MentorInformationPage from './bigcomponents/MemberPage/components/pages/mentor-information/mentor-information'
import MemberHomePage from './bigcomponents/MemberPage/components/pages/member-home/member-home'
import MemberCoursePage from './bigcomponents/MemberPage/components/pages/member-course/member-course'
import CourseVerificationPage from './bigcomponents/MemberPage/components/pages/course-verification/course-verification'
import MemberInformationPage from './bigcomponents/MemberPage/components/pages/member-information/member-information'
import UpdateInformationPage from './bigcomponents/MemberPage/components/pages/update-information/update-information'
import MemberRegisteredCoursePage from './bigcomponents/MemberPage/components/pages/member-course-registerd/member-registered-course'
import TheorySchedulePage from './bigcomponents/MemberPage/components/pages/theory-schedule/theory-schedule'
import PracticeSchedulePage from './bigcomponents/MemberPage/components/pages/practice-schedule/practice-schedule'
import PracticeRegisterPage from './bigcomponents/MemberPage/components/pages/practice-register-page/practice-register'
import ExamDocumentPage from './bigcomponents/MemberPage/components/pages/exam-document/exam-document'
import ExamDocumentUpdatePage from './bigcomponents/MemberPage/components/pages/exam-document-update/exam-document-update'
import TheoryTestPage from './bigcomponents/MemberPage/components/pages/theory-test/theory-test'
import PracticeRegisterTemplate from './bigcomponents/MemberPage/components/templates/practice-register-template/practice-list'
import PracticeSpecificPage from './bigcomponents/MemberPage/components/pages/practice-specific-page/practice-specific'

// Authorization page
import LoginPage from './bigcomponents/AuthorizationPage/components/pages/LoginPage/LoginPage'
import RegistrationPage from './bigcomponents/AuthorizationPage/components/pages/RegistrationPage/RegistrationPage'
import ForgetPasswordPage from './bigcomponents/AuthorizationPage/components/pages/ForgetpasswordPage/ForgetPasswordPage'

// Mentor page
import MentorHomePage from './bigcomponents/MentorPage/components/pages/mentor-home-page/mentor-home-page'
import MentorSchedulePage from './bigcomponents/MentorPage/components/pages/teaching-schedule-page/schedule-page'
import MentorLayout from './bigcomponents/MentorPage/layout'
import MentorRegisterSchedule from './bigcomponents/MentorPage/components/pages/mentor-register-schedule-page/mentor-register-schedule-page'
import StudentsListPage from './bigcomponents/MentorPage/components/pages/students-list-page/student-list-page'
import MentorClassInformationPage from './bigcomponents/MentorPage/components/pages/mentor-class-information-page/mentor-class-information-page'

function App() {

  const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
  const member = sessionStorage.getItem('loginedMember') ? JSON.parse(sessionStorage.getItem('loginedMember')) : null;

  console.log(user);
  console.log(member);

  return (
    <>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
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
                <>
                  <Route index element={<GuestHomePage />} />
                  <Route path='dang-nhap' element={<LoginPage />} />
                  <Route path='dang-ky' element={<RegistrationPage />} />
                  <Route path='quen-mat-khau' element={<ForgetPasswordPage />} />
                  <Route path='khoahoc/:month/:year' element={<GuestCoursePage />} />
                </>
              ) : (
                <>
                  <Route path='dang-nhap' element={<LoginPage />} />
                  {user.roleId === 1 && (
                    <Route index element={<MemberHomePage />} />
                  )}
                  {user.roleId === 2 && (
                    <>
                      <Route element={<StaffLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path='quan-ly-nguoi-dung' element={<UserManagementPage />} />
                        <Route path='quan-ly-khoa-hoc'>
                          <Route index element={<CourseManagementPage />} />
                          <Route path='tao-khoa-hoc' element={<CreateCoursePage />} />
                          <Route path='cap-nhat-khoa-hoc/:courseId' element={<UpdateCoursePage />} />
                        </Route>
                        <Route path='quan-ly-hoc-vien' element={<MemberManagementPage />} />
                        <Route path='quan-ly-giao-vien' element={<MentorMamagementPage />} />
                        <Route path='quan-ly-tin-tuc'>
                          <Route index element={<NewsManagementPage />} />
                          <Route path='tao-tin-tuc' element={<CreateNewsPage />} />
                          <Route path='cap-nhat-tin-tuc/:newsId' element={<UpdateNewsPage />} />
                        </Route>
                        <Route path='bao-cao' element={<ReportPage />} />
                      </Route>
                    </>
                  )}
                  {user.roleId === 3 && (
                    <>
                      <Route element={<MentorLayout />}>
                        <Route index element={<MentorHomePage />} />
                        <Route path='lich-day'>
                          <Route index element={<MentorSchedulePage />} />
                          <Route path='chi-tiet-lich-day' element={<MentorClassInformationPage />} />
                          <Route path='danh-sach-hoc-vien' element={<StudentsListPage />} />
                        </Route>
                        <Route path='dang-ki-lich-day' element={<MentorRegisterSchedule />} />
                        <Route path='tai-lieu-day-hoc' element={<MentorSchedulePage />} />
                      </Route>
                    </>
                  )}
                  {user.roleId === 4 && (
                    <>
                      <Route index element={<MemberHomePage />} />
                      <Route path='khoahoc/:month/:year' element={<MemberCoursePage />} />
                      <Route path='khoahoc/xac-nhan-khoa-hoc/:courseName' element={<CourseVerificationPage />} />
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
                        <Route path='khoa-hoc/:{courseId}' element={<PracticeSpecificPage />} />
                      </Route>
                      <Route path='ho-so-thi'>
                        <Route index element={<ExamDocumentPage />} />
                        <Route path='cap-nhat' element={<ExamDocumentUpdatePage />} />
                      </Route>
                      <Route path='thi-thu' element={<TheoryTestPage />} />
                    </>
                  )}
                </>
              )
            }
          </Route>
        </Routes>
      }
    </>
  )
}

export default App
