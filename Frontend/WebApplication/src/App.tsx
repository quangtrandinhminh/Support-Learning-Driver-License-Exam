import './App.scss'
import { Route, Routes } from 'react-router-dom'
import GuestHomePage from './bigcomponents/GuestPage/components/pages/guest-home/guest-home'
import GuestCoursePage from './bigcomponents/GuestPage/components/pages/guest-course/guest-course'
import LoginPage from './bigcomponents/AuthorizationPage/components/pages/LoginPage'
import { ToastContainer } from 'react-toastify'
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

function App() {

  const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;

  //reset to top when page refreshed
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  return (
    <>
      <ToastContainer
        autoClose={1300}
        pauseOnHover={false}
        position='bottom-center'
        className='toast-container' />

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
                  <Route path='khoahoc' element={<GuestCoursePage />} />
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
                      <Route path='khoa-hoc-cua-ban' element={<MemberRegisteredCoursePage />} />
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
