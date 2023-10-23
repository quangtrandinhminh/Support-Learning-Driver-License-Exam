import './App.scss'
import GuestCoursePage from './components/pages/guest-course/guest-course'
import GuestHomePage from './components/pages/guest-home/guest-home'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../../AuthorizationPage/src/components/pages/LoginPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<GuestHomePage />} />
        <Route path='/khoahoc' element={<GuestCoursePage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
