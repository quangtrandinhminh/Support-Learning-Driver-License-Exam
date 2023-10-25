import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import CourseTemplate from '../../templates/member-course-template/course-template'

function MemberCoursePage() {
  return (
    <>
      <header>
        <MemberHeader />
      </header>
      <body>
        <CourseTemplate />
      </body>
      <footer>
        <MemberFooter />
      </footer>
    </>
  )
}

export default MemberCoursePage
