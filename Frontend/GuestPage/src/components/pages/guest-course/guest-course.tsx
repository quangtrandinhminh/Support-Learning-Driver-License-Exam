import GuestHeaderHome from '../../organisms/guest-header-home/guest-header-home'
import CourseTemplate from '../../templates/guest-course-template/course-template'
import GuestFooter from '../../organisms/guest-footer/guest-footer'

function GuestCoursePage() {
    return (
        <>
            <header>
                <GuestHeaderHome />
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