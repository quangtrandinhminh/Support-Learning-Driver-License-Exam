import './App.scss'
import { Route, Routes, json } from 'react-router-dom'
import GuestHomePage from './bigcomponents/GuestPage/components/pages/guest-home/guest-home'
import GuestCoursePage from './bigcomponents/GuestPage/components/pages/guest-course/guest-course'
import LoginPage from './bigcomponents/AuthorizationPage/components/pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import MemberHomePage from './bigcomponents/MemberPage/components/pages/member-home/member-home'
import MemberCoursePage from './bigcomponents/MemberPage/components/pages/member-course/member-course'
import CourseVerificationPage from './bigcomponents/MemberPage/components/pages/course-verification/course-verification'
import MemberInformationPage from './bigcomponents/MemberPage/components/pages/member-information/member-information'
import UpdateInformationPage from './bigcomponents/MemberPage/components/pages/update-information/update-information'

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
                  <Route path='login' element={<LoginPage />} />
                  <Route path='khoahoc' element={<GuestCoursePage />} />
                </>
              ) : (
                console.log(user),
                <Route path='/'>
                  <Route index element={<MemberHomePage />} />
                  <Route path='khoahoc/:month' element={<MemberCoursePage />} />
                  <Route path='khoahoc/xac-nhan-khoa-hoc' element={<CourseVerificationPage />} />
                  <Route path='thong-tin-ca-nhan/:username'>
                    <Route index element={<MemberInformationPage />} />
                  </Route>
                  <Route path='thong-tin-ca-nhan/cap-nhat' element={<UpdateInformationPage />} />
                </Route>
              )
            }
          </Route>
        </Routes>

      }

    </>
  )
}

export default App
