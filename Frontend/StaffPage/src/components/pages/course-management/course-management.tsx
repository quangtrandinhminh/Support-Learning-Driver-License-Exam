import StaffSidebar from '../../organisms/header/header'
import CourseManagementTemplate from '../../templates/course-management/course-management'

function CourseManagementPage() {
    return (
        <div className='page-container'>
            <header>
                <StaffSidebar />
            </header>
            <body>
                <CourseManagementTemplate />
            </body>
        </div>
    )
}

export default CourseManagementPage