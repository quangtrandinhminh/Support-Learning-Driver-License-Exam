import StaffSidebar from '../../organisms/header/header'
import CourseManagementTemplate from '../../templates/course-management/course-management'

function CourseManagementPage() {
    return (
        <div className='page-container'>
            <div className='staff-header'>
                <StaffSidebar />
            </div>
            <div className='staff-body'>
                <CourseManagementTemplate />
            </div>
        </div>
    )
}

export default CourseManagementPage