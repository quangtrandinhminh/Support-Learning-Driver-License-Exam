import MemberFooter from '../../organisms/member-footer/member-footer'
import MemberHeader from '../../organisms/member-header/member-header'
import MemberRegisteredCourseTemplate from '../../templates/member-registeredCourse-template/member-registercourse-template'

function MemberRegisteredCourse() {
  return (
    <>
      <header>
        <MemberHeader />
      </header>

      <body>
        <MemberRegisteredCourseTemplate />
      </body>

      <footer>
        <MemberFooter />
      </footer>
    </>
  )
}

export default MemberRegisteredCourse