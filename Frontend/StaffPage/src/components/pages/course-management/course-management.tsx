import StaffHeader from '../../organisms/header/header'
import CourseManagementTemplate from '../../templates/course-management/course-management'

function CourseManagementPage() {
    return (
        <>
            <header>
                <StaffHeader />
            </header>
            <body>
                <CourseManagementTemplate />
            </body>
        </>
    )
}

export default CourseManagementPage