import './App.scss'
import GuestCoursePage from './components/pages/guest-course/guest-course'
import GuestHomePage from './components/pages/guest-home/guest-home'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<GuestHomePage />} />
        <Route path='/khoahoc' element={<GuestCoursePage />} />
      </Routes>
    </>
  )
}

export default App
