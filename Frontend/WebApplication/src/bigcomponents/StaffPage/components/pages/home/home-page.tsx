import StaffSidebar from '../../organisms/header/header'
import '../../staff-general.scss'

function StaffPage() {
  return (
    <div className='page-container'>
      <div className='staff-header'>
        <StaffSidebar />
      </div>
    </div>
  )
}

export default StaffPage