import './App.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css';
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/home/home-page';
import 'bootstrap/dist/css/bootstrap.css'
import './components/general.scss'
import UserListPage from './components/pages/user-list/user-list';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage />} />
          <Route path='danh-sach-nguoi-dung' element={<UserListPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
