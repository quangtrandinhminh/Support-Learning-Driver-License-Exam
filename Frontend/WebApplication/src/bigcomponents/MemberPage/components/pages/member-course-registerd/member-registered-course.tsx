import MemberFooter from '../../organisms/member-footer/member-footer'
import MemberHeader from '../../organisms/member-header/member-header'
import MemberRegisteredCourseTemplate from '../../templates/member-registeredCourse-template/member-registercourse-template'

function MemberRegisteredCoursePage() {
  return (
    <>
      <header>
        <MemberHeader />
      </header>
      <div className='body-container'>
        <MemberRegisteredCourseTemplate />
      </div>
      <footer>
        <MemberFooter />
      </footer>
    </>
  )
}

export default MemberRegisteredCoursePage