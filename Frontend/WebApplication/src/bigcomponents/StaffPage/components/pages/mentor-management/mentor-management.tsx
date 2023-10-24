import StaffSidebar from '../../organisms/header/header'
import MentorManagementTemplate from '../../templates/mentor-management/mentor-management'

function MentorMamagementPage() {
    return (
        <div className='page-container'>
            <header>
                <StaffSidebar />
            </header>
            <body>
                <MentorManagementTemplate />
            </body>
        </div>
    )
}

export default MentorMamagementPage