import CourseTemplate from '../../templates/guest-course-template/course-template'
import GuestFooter from '../../organisms/guest-footer/guest-footer'
import GuestHeaderCourse from '../../organisms/guest-header-course/guest-header-course'

function GuestCoursePage() {
  return (
    <>
      <header>
        <GuestHeaderCourse />
      </header>
      <div className='body-container'>
        <CourseTemplate />
      </div>
      <footer>
        <GuestFooter />
      </footer>
    </>
  )
}

export default GuestCoursePage