import { BrowserRouter as Routes, Route} from 'react-router-dom';

import './App.scss'
import GuestHomePage from './components/pages/guest-home/guest-home'
import GuestCoursePage from './components/pages/guest-course/guest-course'

function App() {

  return (
    <>
    <GuestHomePage />
    {/* <GuestCoursePage /> */}
    </>
  )
}

export default App
