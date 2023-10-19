import CourseTemplate from '../../templates/guest-course-template/course-template'
import GuestFooter from '../../organisms/guest-footer/guest-footer'
import GuestHeaderCourse from '../../organisms/guest-header-course/guest-header-course'
import '../general.scss';
function GuestCoursePage() {
  return (
    <>
    <header>
        <GuestHeaderCourse />
    </header>
    <body>
        <CourseTemplate />
    </body>
    <footer>
        <GuestFooter />
    </footer>
    </>
  )
}

export default GuestCoursePage