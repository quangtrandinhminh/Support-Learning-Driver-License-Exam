import HomeTemplate from '../../templates/home/home-template'
import StaffHeader from '../../organisms/header/header'

function HomePage() {
  return (
    <>
      <header>
        <StaffHeader />
      </header>
      <body>
        <HomeTemplate />
      </body>
    </>
  )
}

export default HomePage