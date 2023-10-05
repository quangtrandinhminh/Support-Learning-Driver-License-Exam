import './App.scss'
import { useLocation } from 'react-router-dom'
import MemerberHeader from './components/organisms/member-header/member-header';

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
    </>
  )
}

export default App
