import MentorSidebar from '../../atoms/mentor-home-sidebar/sidebar'
import '../../mentor-general.scss'
import TeachingSchedule from '../../molecules/teaching-schedule/teaching-schedule'

function MentorHomePage() {
  return (
    <div className='page-container'>
      <div className='mentor-header'>
        <MentorSidebar />
      </div>
      <div className="mentor-body">
        <TeachingSchedule />
      </div>
    </div>
  )
}

export default MentorHomePage