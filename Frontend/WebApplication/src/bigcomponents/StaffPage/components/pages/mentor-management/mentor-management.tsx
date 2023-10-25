import StaffSidebar from '../../organisms/header/header'
import MentorManagementTemplate from '../../templates/mentor-management/mentor-management'

function MentorMamagementPage() {
    return (
        <div className='page-container'>
            <div className='staff-header'>
                <StaffSidebar />
            </div>
            <div className='staff-body'>
                <MentorManagementTemplate />
            </div>
        </div>
    )
}

export default MentorMamagementPage