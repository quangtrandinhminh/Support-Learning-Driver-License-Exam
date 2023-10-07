import './App.scss';
import { useLocation, Routes, Route } from 'react-router-dom'
import MemerberHeader from './components/organisms/member-header/member-header';
import MemberHomePage from './components/pages/member-home/member-home';
import MemberFooter from './components/organisms/member-footer/member-footer';

function App() {
  const location = useLocation();

  const showHeader = () => {
    return location.pathname.startsWith('/');
  }

  const showFooter = () => {
    return location.pathname.startsWith('/');
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

        <footer>
          {showFooter() && <MemberFooter />}
        </footer>
      </body>

    </>
  )
}

export default App