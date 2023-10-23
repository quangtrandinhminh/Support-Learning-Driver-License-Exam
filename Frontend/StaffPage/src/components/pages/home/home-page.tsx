import HomeTemplate from '../../templates/home/home-template'
import StaffSidebar from '../../organisms/header/header'

function HomePage() {
  return (
    <div className='page-container'>
      <header>
        <StaffSidebar />
      </header>
      <body>
        <HomeTemplate />
      </body>
    </div>
  )
}

export default HomePage