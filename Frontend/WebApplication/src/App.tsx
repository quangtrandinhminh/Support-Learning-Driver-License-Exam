import './App.scss'
import { Route, Routes } from 'react-router-dom'
import GuestHomePage from './bigcomponents/GuestPage/components/pages/guest-home/guest-home'
import GuestCoursePage from './bigcomponents/GuestPage/components/pages/guest-course/guest-course'
import LoginPage from './bigcomponents/AuthorizationPage/components/pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import MemberHomePage from './bigcomponents/MemberPage/components/pages/member-home/member-home'
import MemberCoursePage from './bigcomponents/MemberPage/components/pages/member-course/member-course'
import { useEffect } from 'react'
import CourseVerificationPage from './bigcomponents/MemberPage/components/pages/course-verification/course-verification'

function App() {

  const user = sessionStorage.getItem('loginedUser');
  console.log(user)

  return (
    <>
      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        position='bottom-center'
        className='toast-container' />

      {
        <Routes>
          <Route path='/'>
            {
              user === null ? (
                <>
                  <Route index element={<GuestHomePage />} />
                  <Route path='login' element={<LoginPage />} />
                  <Route path='khoahoc' element={<GuestCoursePage />} />
                </>
              ) : (
                <Route path='/'>
                  <Route index element={<MemberHomePage />} />
                  <Route path=''/>
                  <Route path='khoahoc/:month' element={<MemberCoursePage />} />
                  <Route path='khoahoc/xac-nhan-khoa-hoc' element={<CourseVerificationPage />} />
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
