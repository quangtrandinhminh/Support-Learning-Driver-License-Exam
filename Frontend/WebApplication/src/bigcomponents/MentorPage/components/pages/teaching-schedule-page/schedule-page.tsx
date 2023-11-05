import '../../mentor-general.scss'
import TeachingScheduleNote from '../../molecules/teaching-schedule-note/teaching-schedule-note'
import TeachingSchedule from '../../molecules/teaching-schedule/teaching-schedule'

function MentorSchedulePage() {
  return (
    <>
      <TeachingSchedule />
      <TeachingScheduleNote />
    </>
  )
}

export default MentorSchedulePage