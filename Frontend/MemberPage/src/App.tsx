import './App.scss';
import { useLocation, Routes, Route } from 'react-router-dom'
import MemerberHeader from './components/organisms/member-header/member-header';
import MemberHomePage from './components/pages/member-home/member-home';

function App() {
  const location = useLocation();
  const showHeader = () => {
    return location.pathname.startsWith('/')
  }

  return (
    <>
      <header>
        {showHeader() && <MemerberHeader />}
      </header>

      <body>
        <Routes>
          <Route path='/' element={<MemberHomePage />} />
        </Routes>
      </body>
    </>
  )
}

export default App
