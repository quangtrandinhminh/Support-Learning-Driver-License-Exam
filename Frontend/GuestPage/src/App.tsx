import './App.scss'
import GuestCoursePage from './components/pages/guest-course/guest-course'
import GuestHomePage from './components/pages/guest-home/guest-home'
import 'react-toastify/ReactToastify.css'
import MemberPage from '../../../Frontend/MemberPage/src/App';
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom'
import LoginPage from '../../AuthorizationPage/src/App'

function App() {

  return (
    <>
      <ToastContainer
        pauseOnHover={false}
        autoClose={2000}
        newestOnTop={true}
      />
      <Routes>
        <Route path='/' element={<GuestHomePage />} />
        <Route path='/khoahoc' element={<GuestCoursePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/member' element={<MemberPage />} />
      </Routes>
    </>
  )
}

export default App
